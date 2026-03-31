<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pokemon;

class PokemonController extends Controller
{
    //Filtrar pokemon por nombre
    public function index(Request $request)
    {
        $query = Pokemon::query();

        if ($request->name) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        return $query->get();
    }
}
