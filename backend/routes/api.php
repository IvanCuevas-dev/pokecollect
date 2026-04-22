<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokemonController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CoinsController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\DeckController;
use App\Http\Controllers\SocialController;


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
    Route::get('/deck', [DeckController::class, 'getDeck']);
    Route::post('/deck', [DeckController::class, 'saveDeck']);
    Route::post('/deck/share', [DeckController::class, 'shareDeck']);
    Route::get('/social', [SocialController::class, 'getDecks']);
    Route::post('/social/vote', [SocialController::class, 'vote']);
});
