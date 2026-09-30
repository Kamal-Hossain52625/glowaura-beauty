<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\Admin\AdminDashboardController;
use App\Http\Controllers\Api\Admin\AdminProductController;
use App\Http\Controllers\Api\Admin\AdminOrderController;

/*
|--------------------------------------------------------------------------
| GlowAura Beauty BD - API Routes (Laravel 12)
|--------------------------------------------------------------------------
*/

// Public Catalog Endpoints
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::get('/products/{slug}/related', [ProductController::class, 'related']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}/products', [CategoryController::class, 'products']);
Route::get('/brands', [BrandController::class, 'index']);
Route::post('/coupons/apply', [CouponController::class, 'apply']);
Route::get('/settings', [AdminDashboardController::class, 'publicSettings']);

// Customer Authentication (Sanctum)
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected Customer Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/user', [AuthController::class, 'profile']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Cart API
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    Route::delete('/cart', [CartController::class, 'clear']);

    // Wishlist API
    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::post('/wishlist', [WishlistController::class, 'toggle']);

    // Orders API
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{orderNumber}', [OrderController::class, 'show']);

    // Product Reviews
    Route::post('/reviews', [ReviewController::class, 'store']);
});

// Admin Protected Routes
Route::prefix('admin')->middleware(['auth:sanctum', 'can:admin-access'])->group(function () {
    Route::get('/metrics', [AdminDashboardController::class, 'metrics']);
    Route::apiResource('/products', AdminProductController::class);
    Route::apiResource('/orders', AdminOrderController::class);
    Route::patch('/orders/{id}/status', [AdminOrderController::class, 'updateStatus']);
    Route::apiResource('/categories', CategoryController::class);
    Route::apiResource('/coupons', CouponController::class);
    Route::patch('/reviews/{id}/approve', [ReviewController::class, 'approve']);
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);
});
