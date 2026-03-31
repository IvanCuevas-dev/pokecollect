<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserPokemon;
use Illuminate\Support\Facades\DB;
use App\Models\Pokemon;


class ShopController extends Controller
{

    //Comprar sobres
    function buy(Request $request)
    {
        $packs = [
            'basic' => ['price' => 50, 'cards' => 5],
            'standard' => ['price' => 100, 'cards' => 10],
            'premium' => ['price' => 200, 'cards' => 15]
        ];

        $packType = $packs[$request->pack];
        $price = $packType["price"];
        $numCards = $packType["cards"];
        $cards = [];

        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($user->coins >= $price) {
            $user->coins -= $price;
            $user->save();

            for ($i = 1; $i <= $numCards; $i++) {
                $pokemonId = rand(1, 151);

                UserPokemon::updateOrCreate(
                    ["user_id" => $user->id, "pokemon_id" => $pokemonId],
                    ["quantity" => DB::raw("quantity + 1")]
                );

                $pokemon = Pokemon::find($pokemonId);
                $cards[] = $pokemon;
            }

            return response()->json([
                'cards' => $cards,
                'coins' => $user->coins
            ]);
        } else {
            return response()->json([
                'message' => 'Saldo insuficiente'
            ], 422);
        }
    }
}
