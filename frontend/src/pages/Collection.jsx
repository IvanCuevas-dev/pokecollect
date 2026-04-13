import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import api from '../api'
import PokemonCard from '../components/PokemonCard'

// prettier-ignore
let typeConfig = {
    Fuego:      { badge: 'bg-linear-to-r from-orange-400 to-red-500' },
    Agua:       { badge: 'bg-linear-to-r from-blue-400 to-cyan-500' },
    Planta:     { badge: 'bg-linear-to-r from-green-500 to-emerald-600' },
    Eléctrico:  { badge: 'bg-linear-to-r from-yellow-400 to-amber-500' },
    Psíquico:   { badge: 'bg-linear-to-r from-pink-400 to-fuchsia-500' },
    Hielo:      { badge: 'bg-linear-to-r from-cyan-400 to-sky-500' },
    Dragón:     { badge: 'bg-linear-to-r from-indigo-500 to-purple-600' },
    Siniestro:  { badge: 'bg-linear-to-r from-gray-600 to-slate-700' },
    Hada:       { badge: 'bg-linear-to-r from-pink-300 to-rose-400' },
    Normal:     { badge: 'bg-linear-to-r from-gray-300 to-stone-400' },
    Lucha:      { badge: 'bg-linear-to-r from-red-500 to-orange-600' },
    Veneno:     { badge: 'bg-linear-to-r from-purple-500 to-violet-600' },
    Tierra:     { badge: 'bg-linear-to-r from-amber-500 to-yellow-600' },
    Volador:    { badge: 'bg-linear-to-r from-sky-400 to-indigo-500' },
    Bicho:      { badge: 'bg-linear-to-r from-lime-500 to-green-600' },
    Roca:       { badge: 'bg-linear-to-r from-stone-400 to-amber-600' },
    Fantasma:   { badge: 'bg-linear-to-r from-purple-700 to-indigo-800' },
    Acero:      { badge: 'bg-linear-to-r from-slate-400 to-gray-500' },
}

function Collection() {
    let [allPokemon, setAllPokemon] = useState([])
    let [userCollection, setUserCollection] = useState([])
    let [search, setSearch] = useState('')
    let [selectedType, setSelectedType] = useState('Todos')
    let [sortBy, setSortBy] = useState('id')
    let [sortOrder, setSortOrder] = useState('asc')
    let [onlyOwned, setOnlyOwned] = useState(false)
    let [selectedPokemon, setSelectedPokemon] = useState(null)

    //Lógica filtrado
    let availableTypes = [
        'Todos',
        ...Object.keys(typeConfig).filter((type) => allPokemon.some((p) => p.type_1 === type || p.type_2 === type)),
    ]

    let filteredPokemon = allPokemon
        .filter(
            (pokemon) =>
                pokemon.name.toLowerCase().includes(search.toLowerCase()) || String(pokemon.id).includes(search),
        )
        .filter((pokemon) => {
            if (selectedType === 'Todos') return true
            return pokemon.type_1 === selectedType || pokemon.type_2 === selectedType
        })
        .filter((pokemon) => {
            if (onlyOwned) {
                return userCollection.find((u) => u.id === pokemon.id)
            } else {
                return true
            }
        })
        .sort((a, b) => {
            if (sortBy === 'id') {
                if (sortOrder === 'asc') {
                    return a.id - b.id
                } else {
                    return b.id - a.id
                }
            }
            if (sortBy === 'name') {
                if (sortOrder === 'asc') {
                    return a.name.localeCompare(b.name)
                } else {
                    return b.name.localeCompare(a.name)
                }
            }
            if (sortBy === 'quantity') {
                let pokemonA = userCollection.find((u) => u.id === a.id)
                let pokemonB = userCollection.find((u) => u.id === b.id)

                let qA = 0
                let qB = 0

                if (pokemonA) {
                    qA = pokemonA.quantity
                }
                if (pokemonB) {
                    qB = pokemonB.quantity
                }

                if (sortOrder === 'asc') {
                    return qA - qB
                } else {
                    return qB - qA
                }
            }
        })

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
                <div className="flex flex-col items-center mx-auto px-8 py-5 rounded-lg bg-white/5 border border-cyan-400/30 shadow-md shadow-cyan-500 w-60 m-5">
                    <p className="text-xl font-bold mb-3">
                        <span className="text-cyan-300 text-3xl animate-pulse">{userCollection.length}</span>
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

            {/** Filtros */}
            {allPokemon.length > 0 && (
                <div className="flex flex-col gap-4 mx-5 px-8 py-5 rounded-lg bg-white/5 border border-cyan-400/30 shadow-md shadow-cyan-500">
                    {/** Fila superior: buscadores */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        {/** Filtro input nombre o ID */}
                        <div className="relative">
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 w-4 h-4 pointer-events-none"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                            </svg>
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Buscar por nombre o ID"
                                className="rounded-md border border-cyan-400/30 bg-white/15 pl-9 pr-3 h-10 w-60 outline-none focus:border-cyan-400"
                            />
                        </div>

                        {/** Filtro Select ID/Nombre/Cantidad */}
                        <select
                            onChange={(e) => {
                                setSortBy(e.target.value)
                                if (e.target.value === 'quantity') setSortOrder('desc')
                            }}
                            value={sortBy}
                            className="rounded-md border border-cyan-400/30 bg-white/15 px-3 h-10 outline-none focus:border-cyan-400"
                        >
                            <option className="bg-black/70" value="id">Ordenar por ID</option>
                            <option className="bg-black/70" value="name">Ordenar por Nombre</option>
                            <option className="bg-black/70" value="quantity">Ordenar por Cantidad</option>
                        </select>

                        {/** Filtro Ascendente/Descendente + En propiedad */}
                        <div className="flex gap-4">
                            <div
                                className="flex items-center justify-center w-10 h-10 cursor-pointer rounded-md border border-cyan-400/30 bg-white/15"
                                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            >
                                <svg
                                    className={`w-4 h-4 text-purple-500 scale-150 transition-transform duration-300 ${sortOrder === 'asc' ? 'rotate-180' : 'rotate-0'}`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M4 6h16M4 12h10M4 18h4" strokeLinecap="round" />
                                    <path d="M17 15l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <button
                                onClick={() => setOnlyOwned(!onlyOwned)}
                                className={`rounded-md cursor-pointer border px-3 h-10 transition ${
                                    onlyOwned
                                        ? 'border-purple-400 bg-purple-400/20 text-purple-300'
                                        : 'border-cyan-400/30 bg-white/15 text-white'
                                }`}
                            >
                                En propiedad
                            </button>
                        </div>
                    </div>

                    {/** Fila inferior: filtro por tipo */}
                    <div className="flex items-center gap-2 overflow-x-auto max-h-16 py-2 px-1">
                        {availableTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white cursor-pointer transition border-2 ${
                                    selectedType === type
                                        ? 'border-white/60 scale-110 shadow-lg'
                                        : 'border-transparent opacity-60 hover:opacity-100'
                                } ${type === 'Todos' ? 'bg-linear-to-r from-cyan-400 to-indigo-400' : typeConfig[type].badge}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/** Cargando */}
            {allPokemon.length === 0 && (
                <div className="flex justify-center items-center mt-40">
                    <p className="text-white text-lg tracking-widest animate-pulse">Cargando colección...</p>
                </div>
            )}

            {/** Grid pokemons */}
            <div className="flex flex-wrap justify-center gap-10 m-5">
                {filteredPokemon.map((pokemon, index) => {
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
