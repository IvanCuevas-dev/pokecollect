<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPokemon extends Model
{
    protected $table = 'user_pokemon';

    protected $fillable = [
        'user_id',
        'pokemon_id',
        'quantity'
    ];
}
