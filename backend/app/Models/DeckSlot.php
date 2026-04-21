<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeckSlot extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'deck_id',
        'slot_number',
        'pokemon_id'
    ];
}
