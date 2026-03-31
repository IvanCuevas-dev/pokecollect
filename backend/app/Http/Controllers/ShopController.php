<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ShopController extends Controller
{

    //Comprar sobre
    function buy(Request $request)
    {
        $packs = [
            'basic' => ['price' => 50, 'cards' => 5],
            'standard' => ['price' => 100, 'cards' => 10],
            'premium' => ['price' => 200, 'cards' => 15]
        ];

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $packType = $packs[$request->type];
        $price = $packType["price"];
        $numCards = $packType["cards"];

        if ($user->coins >= $price) {
            $user->coins -= $price;
            $user->save();

            for ($i = 1; $i <= $numCards; $i++) {
                $random = rand(1, 151);
            }
        } else {
            return response()->json([
                'message' => 'Saldo insuficiente'
            ], 422);
        }
    }
}
