import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
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
            {/** Modal carta completa */}
            {selectedPokemon &&
                createPortal(
                    <div
                        className="fixed inset-0 bg-black/90 z-60 flex items-center justify-center"
                        onClick={() => setSelectedPokemon(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl font-bold cursor-pointer transition"
                            onClick={() => setSelectedPokemon(null)}
                        >
                            ✕
                        </button>
                        <div
                            className="card-reveal scale-[0.78] md:scale-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <PokemonCard pokemon={selectedPokemon} />
                        </div>
                    </div>,
                    document.body,
                )}

            {/** Título página */}
            <div className="flex flex-col mt-20">
                <h1 className="text-center text-6xl font-semibold">
                    Colección <span className="text-cyan-300 italic">Pokémon</span>
                </h1>
            </div>

            {/** Cargando */}
            {allPokemon.length === 0 && (
                <div className="flex justify-center items-center mt-40">
                    <p className="text-white/80 text-lg tracking-widest animate-pulse">Cargando colección...</p>
                </div>
            )}

            {/** Grid pokemons */}
            <div className="flex flex-wrap justify-center gap-10 p-6 md:p-16">
                {allPokemon.map((pokemon, index) => {
                    let owned = userCollection.find((u) => u.id === pokemon.id)
                    let delay = `${Math.min(index * 60, 900)}ms`

                    if (owned) {
                        return (
                            <div
                                key={pokemon.id}
                                className="relative page-enter cursor-pointer"
                                style={{ animationDelay: delay }}
                                onClick={() => setSelectedPokemon(pokemon)}
                            >
                                <PokemonCard
                                    pokemon={pokemon}
                                    compact
                                    quantity={owned.quantity}
                                />
                            </div>
                        )
                    } else {
                        return (
                            <div
                                key={pokemon.id}
                                className="page-enter"
                                style={{ animationDelay: delay }}
                            >
                                <div className="grayscale opacity-30 pointer-events-none">
                                    <PokemonCard
                                        pokemon={pokemon}
                                        compact
                                    />
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </>
    )
}

export default Collection
