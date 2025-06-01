<?php

use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/home');

Route::get('/home', [HomeController::class, 'index'])
    ->name('home');

Route::get('/checkout', [CheckoutController::class, 'index'])
    ->name('checkout');

Route::prefix('orders')->group(function () {
    Route::post('/', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/{order}', [OrderController::class, 'getOrder']);
});

Route::get('thank-you',[HomeController::class, 'thankYou'])
    ->name('thank-you');

