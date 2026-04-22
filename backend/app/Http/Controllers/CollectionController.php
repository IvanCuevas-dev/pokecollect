<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CollectionController extends Controller
{
    public function userCollection()
    {
        $user = Auth::user();

        $collection = DB::table('user_pokemon')
            ->join('pokemon', 'user_pokemon.pokemon_id', '=', 'pokemon.id')
            ->where('user_pokemon.user_id', $user->id)
            ->select('pokemon.*', 'user_pokemon.quantity')
            ->get();

        return response()->json($collection);
    }
}
