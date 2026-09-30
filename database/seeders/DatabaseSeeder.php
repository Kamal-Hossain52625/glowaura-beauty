<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Admin;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Coupon;
use App\Models\Order;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Admin
        Admin::create([
            'name' => 'Store Super Admin',
            'email' => 'admin@glowaurabd.com',
            'password' => Hash::make('password123'),
            'role' => 'super_admin'
        ]);

        // 2. Seed Customer
        $user = User::create([
            'name' => 'Maria Afrin',
            'email' => 'mariaafrin1106@gmail.com',
            'phone' => '01645515443',
            'password' => Hash::make('password123'),
            'role' => 'customer',
            'default_district' => 'Dhaka',
            'default_address' => 'House 178/7-5, Ahmed Nagar, Mirpur-1, Dhaka'
        ]);

        // 3. Seed Categories
        $skincare = Category::create(['name' => 'Skincare', 'slug' => 'skincare']);
        $suncare = Category::create(['name' => 'Sun Care', 'slug' => 'sun-care']);
        $makeup = Category::create(['name' => 'Makeup', 'slug' => 'makeup']);
        $lipcare = Category::create(['name' => 'Lip Care', 'slug' => 'lip-care']);
        $facecare = Category::create(['name' => 'Face Care', 'slug' => 'face-care']);
        $haircare = Category::create(['name' => 'Hair Care', 'slug' => 'hair-care']);
        $bodycare = Category::create(['name' => 'Body Care', 'slug' => 'body-care']);
        $fragrance = Category::create(['name' => 'Fragrance', 'slug' => 'fragrance']);

        // 4. Seed Brands
        $cosrx = Brand::create(['name' => 'COSRX', 'slug' => 'cosrx', 'country' => 'South Korea']);
        $boj = Brand::create(['name' => 'Beauty of Joseon', 'slug' => 'beauty-of-joseon', 'country' => 'South Korea']);
        $ord = Brand::create(['name' => 'The Ordinary', 'slug' => 'the-ordinary', 'country' => 'Canada']);
        $cerave = Brand::create(['name' => 'CeraVe', 'slug' => 'cerave', 'country' => 'United States']);
        $laneige = Brand::create(['name' => 'Laneige', 'slug' => 'laneige', 'country' => 'South Korea']);
        $anua = Brand::create(['name' => 'Anua', 'slug' => 'anua', 'country' => 'South Korea']);

        // 5. Seed Core Products
        $p1 = Product::create([
            'name' => 'Advanced Snail 96 Mucin Power Essence',
            'slug' => 'cosrx-advanced-snail-96-mucin-power-essence',
            'sku' => 'CSX-SN-96100',
            'brand_id' => $cosrx->id,
            'category_id' => $skincare->id,
            'regular_price' => 1650,
            'discount_price' => 1390,
            'stock_quantity' => 45,
            'stock_status' => 'in_stock',
            'is_featured' => true,
            'is_bestseller' => true,
            'is_new_arrival' => false,
            'rating' => 4.9,
            'review_count' => 148,
            'short_description' => 'Enriched with 96.3% Snail Secretion Filtrate for deep hydration and barrier repair.',
            'description' => 'Formulated with snail mucin to soothe red, sensitive skin post-breakouts by replenishing moisture.',
            'ingredients' => 'Snail Secretion Filtrate, Betaine, Butylene Glycol, Sodium Hyaluronate, Panthenol, Arginine.',
            'usage_instructions' => 'Apply a small amount to clean face, gently pat using fingertips.',
            'volume_or_size' => '100ml',
            'country_of_origin' => 'South Korea'
        ]);
        $p1->images()->create(['url' => 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80', 'is_primary' => true]);

        $p2 = Product::create([
            'name' => 'Relief Sun : Rice + Probiotics SPF50+ PA++++',
            'slug' => 'beauty-of-joseon-relief-sun-rice-probiotics',
            'sku' => 'BOJ-RS-5050',
            'brand_id' => $boj->id,
            'category_id' => $suncare->id,
            'regular_price' => 1550,
            'discount_price' => 1250,
            'stock_quantity' => 38,
            'stock_status' => 'in_stock',
            'is_featured' => true,
            'is_bestseller' => true,
            'is_new_arrival' => false,
            'rating' => 4.9,
            'review_count' => 210,
            'short_description' => 'Organic, lightweight sunscreen that leaves zero white cast with 30% Rice extract.',
            'description' => 'Gentle organic sunscreen formulated with fermented grain extracts that absorbs without stickiness.',
            'ingredients' => 'Water, Oryza Sativa (Rice) Extract, Niacinamide, Glycerin, Fermented Grain.',
            'usage_instructions' => 'Evenly spread over face and neck 15 minutes before sun exposure.',
            'volume_or_size' => '50ml',
            'country_of_origin' => 'South Korea'
        ]);
        $p2->images()->create(['url' => 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80', 'is_primary' => true]);

        // 6. Seed Coupons
        Coupon::create([
            'code' => 'GLOW10',
            'discount_type' => 'percentage',
            'discount_value' => 10,
            'min_order_amount' => 1500,
            'max_discount' => 500,
            'expiry_date' => '2026-12-31',
            'usage_limit' => 1000,
            'is_active' => true
        ]);
        Coupon::create([
            'code' => 'BEAUTY500',
            'discount_type' => 'fixed',
            'discount_value' => 500,
            'min_order_amount' => 3500,
            'expiry_date' => '2026-12-31',
            'usage_limit' => 500,
            'is_active' => true
        ]);
    }
}
