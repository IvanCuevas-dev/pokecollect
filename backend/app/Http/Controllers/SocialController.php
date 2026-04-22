<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Deck;
use App\Models\DeckSlot;
use App\Models\Vote;
use Illuminate\Http\Request;

class SocialController extends Controller
{
    //Devuelve los mazos compartidos con todos los datos necesarios
    public function getDecks()
    {
        $user = Auth::user();

        //Obtener el usuario de cada mazo
        $decks = DB::table('decks')
            ->join('users', 'decks.user_id', '=', 'users.id')
            ->where('decks.shared', true)
            ->select('decks.id', 'decks.name', 'decks.user_id', 'users.name as user_name')
            ->orderBy('decks.id', 'desc')
            ->get();

        //Obtener para cada mazo los datos de los pokemon
        $slots = DB::table('deck_slots')
            ->join('pokemon', 'deck_slots.pokemon_id', '=', 'pokemon.id')
            ->select('deck_slots.deck_id', 'deck_slots.slot_number', 'pokemon.*')
            ->get();

        //Obtener likes y dislikes
        $votes = DB::table('votes')
            ->select(
                'deck_id',
                DB::raw('SUM(is_like = 1) as likes'),
                DB::raw('SUM(is_like = 0) as dislikes')
            )
            ->groupBy('deck_id')
            ->get();

        //Votos del usuario
        $userVotes = DB::table('votes')
            ->where('user_id', $user->id)
            ->select('deck_id', 'is_like')
            ->get();


        $result = [];

        foreach ($decks as $deck) {
            //Cartas de este mazo
            $deckCards = $slots->where('deck_id', $deck->id)->values();

            //Votos de este mazo
            $deckVotes = $votes->firstWhere('deck_id', $deck->id);

            //Voto del usuario actual en este mazo
            $userVote = $userVotes->firstWhere('deck_id', $deck->id);

            //Construir el objeto y añadirlo al resultado
            $result[] = [
                'id'        => $deck->id,
                'name'      => $deck->name,
                'user_name' => $deck->user_name,
                'cards'     => $deckCards,
                'likes'     => $deckVotes?->likes ?? 0,
                'dislikes'  => $deckVotes?->dislikes ?? 0,
                'user_vote' => $userVote ? ($userVote->is_like ? 'like' : 'dislike') : null,
                'is_mine'   => $deck->user_id === $user->id,
            ];
        }

        return response()->json($result);
    }

    //Lógica votos
    public function vote(Request $request)
    {
        $user = Auth::user();

        $deckVoted = $request->deck_id;
        $typeVoted = $request->is_like;

        //Busca el mazo votado por el usuario
        $vote = Vote::where('user_id', $user->id)
            ->where('deck_id', $deckVoted)
            ->first();

        if (!$vote) {
            //Crear voto
            Vote::create([
                'user_id' => $user->id,
                'deck_id' => $deckVoted,
                'is_like' => $typeVoted
            ]);
        } else if ($typeVoted != $vote->is_like) {
            //Actualizar voto
            $vote->is_like = $typeVoted;
            $vote->save();
        } else {
            //Eliminar voto (mismo botón pulsado dos veces)
            $vote->delete();
        }

        return response()->json(['message' => 'Voto registrado correctamente']);
    }

    //Elimina un mazo compartido del usuario autenticado
    public function deleteDeck(Request $request, $id)
    {
        $user = Auth::user();

        $deck = Deck::where('id', $id)
            ->where('user_id', $user->id)
            ->where('shared', true)
            ->first();

        if (!$deck) {
            return response()->json(['message' => 'Mazo no encontrado'], 404);
        }

        $deck->shared = false;
        $deck->name = null;
        $deck->save();

        return response()->json(['message' => 'Mazo eliminado correctamente']);
    }
}
