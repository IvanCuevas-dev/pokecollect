import { useState, useEffect } from 'react'
import api from '../api'
import PokemonCard from '../components/PokemonCard'

function Collection() {
    let [allPokemon, setAllPokemon] = useState([])
    let [userCollection, setUserCollection] = useState([])
    let [search, setSearch] = useState('')
    let [selectedType, setSelectedType] = useState('Todos')
    let [sortBy, setSortBy] = useState('id')
    let [sortOrder, setSortOrder] = useState('asc')
    let [onlyOwned, setOnlyOwned] = useState(false)
    let [selectedPokemon, setSelectedPokemon] = useState(null)

    async function loadCollection() {
        try {
            let pokemon = await api('/pokemon', 'GET')
            let data = await api('/collection', 'GET')

            setAllPokemon(pokemon)
            setUserCollection(data)
        } catch (error) {
            console.log('Error al cargar la colección')
        }
    }

    useEffect(() => {
        loadCollection()
    }, [])

    return (
        <>
            {/** Título página */}
            <div className="flex flex-col mt-20">
                <h1 className="text-center text-6xl font-semibold">
                    Colección <span className="text-cyan-300 italic">Pokémon</span>
                </h1>
            </div>

            {/** Grid pokemons */}
            <div className="grid grid-cols-2 gap-4">
                {allPokemon.map((pokemon) => {
                    let owned = userCollection.find((u) => u.id === pokemon.id)

                    if (owned) {
                        return (
                            <div
                                key={pokemon.id}
                                className="relative"
                            >
                                {owned.quantity > 1 && <span>x{owned.quantity}</span>}
                                <PokemonCard pokemon={pokemon} />
                            </div>
                        )
                    } else {
                        return (
                            <div
                                key={pokemon.id}
                                className="grayscale opacity-30 pointer-events-none"
                            >
                                <PokemonCard pokemon={pokemon} />
                            </div>
                        )
                    }
                })}
            </div>
        </>
    )
}

export default Collection
