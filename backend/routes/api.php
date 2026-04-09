<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokemonController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CoinsController;
use App\Http\Controllers\CollectionController;
use Illuminate\Http\Request;
use App\Http\Controllers\ShopController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    });
    Route::post('/buy', [ShopController::class, 'buy']);
    Route::post('/buyCoins', [CoinsController::class, 'buyCoins']);
    Route::get('/pokemon', [PokemonController::class, 'allPokemon']);
    Route::get('/collection', [CollectionController::class, 'userCollection']);
});
