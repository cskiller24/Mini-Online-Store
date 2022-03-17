<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
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

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::group(['middleware' => ['user']], function () {
        Route::get('/', [UserController::class, 'store']);
    });
    Route::group(['middleware' => ['admin']], function () {
        Route::controller(ProductController::class)->group(function () {
            Route::get('/products', 'index');
            Route::post('/product/create', 'store');
            Route::get('/product/{id}', 'show');
            Route::post('/product/update/{id}', 'update');
            Route::delete('/product/delete/{id}', 'destroy');
            Route::post('/product/restock/{id}', 'restock');
        });
        Route::put('/product/{id}/restock', [ProductController::class, 'restock']);
    });
    Route::post('/logout', [AuthController::class, 'logout']);
});
