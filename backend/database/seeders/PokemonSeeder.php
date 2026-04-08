<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class PokemonSeeder extends Seeder
{
    //Traducción de moves a español
    private function translateMove($moveName, &$cache)
    {
        if (isset($cache[$moveName])) {
            return $cache[$moveName];
        }

        $moveData = Http::get("https://pokeapi.co/api/v2/move/{$moveName}")->json();

        $spanish = collect($moveData['names'])
            ->firstWhere('language.name', 'es')['name'] ?? $moveName;

        $cache[$moveName] = $spanish;

        return $spanish;
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $response = Http::get('https://pokeapi.co/api/v2/pokemon?limit=151');

        $data = $response->json();

        //Traducción de tipos a español
        $typeTranslations = [];
        $typesResponse = Http::get('https://pokeapi.co/api/v2/type')->json();

        foreach ($typesResponse['results'] as $type) {
            $typeData = Http::get($type['url'])->json();

            $spanish = collect($typeData['names'])
                ->firstWhere('language.name', 'es')['name'] ?? $typeData['name'];

            $typeTranslations[$typeData['name']] = $spanish;
        }

        $moveTranslations = [];

        foreach ($data['results'] as $pokemon) {
            $pokemonData = Http::get($pokemon['url'])->json();

            $name = $pokemonData['name'];

            $type1 = $typeTranslations[$pokemonData['types'][0]['type']['name']];
            $type2 = isset($pokemonData['types'][1])
                ? $typeTranslations[$pokemonData['types'][1]['type']['name']]
                : null;

            $hp = $pokemonData['stats'][0]['base_stat'];
            $attack = $pokemonData['stats'][1]['base_stat'];
            $defense = $pokemonData['stats'][2]['base_stat'];
            $speed = $pokemonData['stats'][5]['base_stat'];

            $height = round($pokemonData['height'] / 10, 1);
            $weight = round($pokemonData['weight'] / 10, 1);

            $baseExp = $pokemonData['base_experience'];

            $sprite = $pokemonData['sprites']['other']['official-artwork']['front_default'];

            $move1 = isset($pokemonData['moves'][0])
                ? $this->translateMove($pokemonData['moves'][0]['move']['name'], $moveTranslations)
                : null;

            $move2 = isset($pokemonData['moves'][1])
                ? $this->translateMove($pokemonData['moves'][1]['move']['name'], $moveTranslations)
                : null;

            if ($baseExp < 100) {
                $rarity = 'Común';
            } elseif ($baseExp < 150) {
                $rarity = 'Poco común';
            } elseif ($baseExp < 200) {
                $rarity = 'Rara';
            } elseif ($baseExp < 250) {
                $rarity = 'Épica';
            } else {
                $rarity = 'Legendaria';
            }

            $species = Http::get($pokemonData['species']['url'])->json();
            $description = collect($species['flavor_text_entries'])
                ->firstWhere('language.name', 'es')['flavor_text'] ?? '';


            DB::table('pokemon')->updateOrInsert([
                'id' => $pokemonData['id'],
                'name' => $name,
                'type_1' => $type1,
                'type_2' => $type2,
                'hp' => $hp,
                'attack' => $attack,
                'defense' => $defense,
                'speed' => $speed,
                'height' => $height,
                'weight' => $weight,
                'base_experience' => $baseExp,
                'sprite_url' => $sprite,
                'description' => $description,
                'move_1' => $move1,
                'move_2' => $move2,
                'rarity' => $rarity,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
