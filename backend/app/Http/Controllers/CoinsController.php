<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CoinsController extends Controller
{

    function buyCoins(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $user->coins += $request->amount;
        $user->save();

        return response()->json([
            'coins' => $user->coins
        ]);
    }
}
