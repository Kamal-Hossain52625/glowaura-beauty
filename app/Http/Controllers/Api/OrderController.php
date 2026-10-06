<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'nullable|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'district' => 'required|string|max:100',
            'city_area' => 'required|string|max:100',
            'full_address' => 'required|string',
            'delivery_note' => 'nullable|string',
            'payment_method' => 'required|in:cod,bkash,nagad,card',
            'transaction_id' => 'nullable|string|max:100',
            'coupon_code' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($validated, $request) {
            $subtotal = 0;
            $orderItemsData = [];

            foreach ($validated['items'] as $item) {
                $product = Product::lockForUpdate()->findOrFail($item['product_id']);
                
                if ($product->stock_quantity < $item['quantity']) {
                    return response()->json([
                        'error' => "Insufficient stock for product: {$product->name}"
                    ], 422);
                }

                $price = $product->discount_price ?? $product->regular_price;
                $lineTotal = $price * $item['quantity'];
                $subtotal += $lineTotal;

                // Decrement stock
                $product->decrement('stock_quantity', $item['quantity']);

                $orderItemsData[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'price' => $price,
                    'quantity' => $item['quantity'],
                    'total' => $lineTotal,
                ];
            }

            // Bangladesh Delivery Logic (Inside Dhaka 70, Sub-Area 100, Outside Dhaka 130)
            $districtLower = strtolower(trim($validated['district']));
            if ($districtLower === 'dhaka' || $districtLower === 'ঢাকা') {
                $deliveryFee = 70;
            } elseif (in_array($districtLower, ['gazipur', 'narayanganj', 'savar', 'keraniganj'])) {
                $deliveryFee = 100;
            } else {
                $deliveryFee = 130;
            }

            if ($subtotal >= 2500) {
                $deliveryFee = 0;
            }

            // Coupon Logic
            $discount = 0;
            if (!empty($validated['coupon_code'])) {
                $coupon = Coupon::where('code', $validated['coupon_code'])->where('is_active', true)->first();
                if ($coupon && $subtotal >= $coupon->min_order_amount) {
                    $discount = $coupon->discount_type === 'percentage'
                        ? ($subtotal * $coupon->discount_value) / 100
                        : $coupon->discount_value;
                    $coupon->increment('used_count');
                }
            }

            $grandTotal = max(0, $subtotal - $discount + $deliveryFee);

            $order = Order::create([
                'order_number' => 'GLOW-BD-' . strtoupper(Str::random(6)),
                'user_id' => $request->user()?->id,
                'customer_name' => $validated['customer_name'],
                'customer_email' => $validated['customer_email'],
                'customer_phone' => $validated['customer_phone'],
                'district' => $validated['district'],
                'city_area' => $validated['city_area'],
                'full_address' => $validated['full_address'],
                'delivery_note' => $validated['delivery_note'] ?? null,
                'subtotal' => $subtotal,
                'discount' => $discount,
                'delivery_charge' => $deliveryFee,
                'total' => $grandTotal,
                'payment_method' => $validated['payment_method'],
                'payment_status' => $validated['payment_method'] === 'cod' ? 'unpaid' : 'paid',
                'transaction_id' => $validated['transaction_id'] ?? null,
                'status' => 'pending'
            ]);

            foreach ($orderItemsData as $itemData) {
                $order->items()->create($itemData);
            }

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order->load('items')
            ], 201);
        });
    }
}
