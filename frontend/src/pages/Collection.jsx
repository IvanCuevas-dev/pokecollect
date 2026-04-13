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

            {/** Progreso */}
            {allPokemon.length > 0 && (
                <div className="flex flex-col items-center mx-auto mt-8 px-8 py-5 rounded-xl bg-white/5 border border-cyan-400/30 shadow-md shadow-cyan-500 w-72 m-10">
                    <p className="text-3xl font-bold mb-3">
                        <span className="text-cyan-300 text-5xl">{userCollection.length}</span>
                        <span className="text-white/30 mx-2">/</span>
                        <span className="text-white/90">{allPokemon.length}</span>
                    </p>

                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-linear-to-r from-cyan-400 to-indigo-400 transition-all duration-700"
                            style={{
                                width: allPokemon.length
                                    ? `${(userCollection.length / allPokemon.length) * 100}%`
                                    : '0%',
                            }}
                        />
                    </div>
                    <p className="text-xs text-white/60 mt-2">
                        {allPokemon.length ? Math.round((userCollection.length / allPokemon.length) * 100) : 0}%
                        completado
                    </p>
                </div>
            )}

            {/** Buscadores */}
            <div></div>

            {/** Cargando */}
            {allPokemon.length === 0 && (
                <div className="flex justify-center items-center mt-40">
                    <p className="text-white/80 text-lg tracking-widest animate-pulse">Cargando colección...</p>
                </div>
            )}

            {/** Grid pokemons */}
            <div className="flex flex-wrap justify-center gap-10">
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
