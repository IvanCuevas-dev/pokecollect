<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pokemon extends Model
{
    protected $fillable = [
        'id',
        'name',
        'type_1',
        'type_2',
        'hp',
        'attack',
        'defense',
        'speed',
        'height',
        'weight',
        'base_experience',
        'sprite_url',
        'description',
        'move_1',
        'move_2',
        'rarity',
    ];

    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = false;
}
