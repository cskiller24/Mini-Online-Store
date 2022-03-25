<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => ['guest']], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::group(['middleware' => ['user']], function () {
        Route::controller(CartController::class)->group(function () {
            Route::get('/carts', 'index');
            Route::put('/cart/add', 'addCart');
            Route::put('/cart/decrease', 'decreaseCart');
        });
        Route::controller(TransactionsController::class)->group(function () {
            Route::get('/transaction', 'show');
            Route::post('/transaction/create', 'store');
        });
    });
    Route::group(['middleware' => ['admin']], function () {
        Route::controller(ProductController::class)->group(function () {
            Route::get('/products', 'index');
            Route::post('/product/create', 'store');
            Route::get('/product/{id}', 'show');
            Route::post('/product/update/{id}', 'update');
            Route::delete('/product/delete/{id}', 'destroy');
            Route::put('/product/restock/{id}', 'restock');
        });
        Route::get('/transactions', [TransactionsController::class, 'index']);
    });
    Route::put('/transaction/update', [TransactionsController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
