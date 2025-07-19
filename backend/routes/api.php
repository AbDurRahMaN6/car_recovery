<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TowingRequestController;
use App\Http\Controllers\AuthController;



Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:api')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});


Route::get('/requests', [TowingRequestController::class, 'index']);
Route::post('/requests', [TowingRequestController::class, 'store']);
