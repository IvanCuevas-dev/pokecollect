<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\DeckSlot;
use App\Models\Deck;

class DeckController extends Controller
{
    //Devuelve el mazo activo del usuario
    public function getDeck()
    {
        $user = Auth::user();

        $deck = DB::table('decks')
            ->where('user_id', $user->id)
            ->where('shared', false)
            ->first();

        if (!$deck) {
            return response()->json([null, null, null, null, null, null]);
        }

        $slotPokemon = DB::table('deck_slots')
            ->join('pokemon', 'deck_slots.pokemon_id', '=', 'pokemon.id')
            ->where('deck_id', $deck->id)
            ->get();

        $slots = [null, null, null, null, null, null];

        foreach ($slotPokemon as $item) {
            $slots[$item->slot_number] = $item;
        }
        return response()->json($slots);
    }

    //Guarda el estado actual del mazo
    public function saveDeck(Request $request)
    {
        $user = Auth::user();

        $slots = $request->input('slots');

        $deck = Deck::updateOrCreate(
            ["user_id" => $user->id, "shared" => false],
            []
        );

        DeckSlot::where('deck_id', $deck->id)
            ->delete();

        foreach ($slots as $item) {
            if ($item === null) continue;

            DeckSlot::create([
                'deck_id' => $deck->id,
                'slot_number' => $item['slot_number'],
                'pokemon_id' => $item['pokemon_id']
            ]);
        }
        return response()->json(['message' => 'Mazo guardado correctamente']);
    }

    //Valida el mazo a compartir
    public function shareDeck(Request $request)
    {
        $user = Auth::user();
        $deckName = $request->input('name');

        $deck = Deck::where('user_id', $user->id)
            ->where('shared', false)
            ->first();

        if (!$deck) {
            return response()->json(['message' => 'No se puede compartir un mazo que no existe']);
        }

        $deckSlots = DeckSlot::where('deck_id', $deck->id)
            ->count();

        if ($deckSlots < 6) {
            return response()->json(['message' => 'El mazo debe tener 6 cartas']);
        }

        $deck->name = $deckName;
        $deck->shared = true;
        $deck->save();

        return response()->json(['message' => 'Mazo compartido correctamente']);
    }
}
