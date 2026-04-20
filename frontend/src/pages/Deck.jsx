import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import api from '../api'
import PokemonCard from '../components/PokemonCard'

function Deck() {
    let [deckSlots, setDeckSlots] = useState([null, null, null, null, null, null])
    let [userCollection, setUserCollection] = useState([])
    let [search, setSearch] = useState('')
    let [selectedPokemon, setSelectedPokemon] = useState(null)

    //Cargar colección
    async function loadCollection() {
        try {
            let data = await api('/collection', 'GET')

            setUserCollection(data)
        } catch (error) {
            console.log('Error al cargar la colección')
        }
    }

    //Cargar mazo activo
    async function loadDeck() {
        try {
            let data = await api('/deck', 'GET')

            setDeckSlots(data)
        } catch (error) {
            console.log('Error al cargar el mazo activo')
        }
    }

    //Carga colección y mazo cada vez que el usuario entra a la página
    useEffect(() => {
        loadCollection()
        loadDeck()
    }, [])

    //Calcular las cartas disponibles (coleccion - mazo) con filtro de búsqueda
    let availableCards = userCollection
        .map((pokemon) => {
            let copies = deckSlots.filter((slot) => slot?.pokemon_id === pokemon.id).length
            return { ...pokemon, availableQuantity: pokemon.quantity - copies }
        })
        .filter((pokemon) => pokemon.availableQuantity > 0)
        .filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase()) || String(pokemon.id).includes(search)
        )

    //Actualizar mazo cada vez que hay un cambio en los slots
    useEffect(() => {
        async function saveDeck() {
            try {
                await api('/deck', 'POST', { slots: deckSlots })
            } catch (error) {
                console.log('Error al guardar el mazo')
            }
        }

        let hasCards = deckSlots.some((slot) => slot !== null)
        if (hasCards) saveDeck()
    }, [deckSlots])

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

            {/** Título */}
            <div className="flex flex-col mt-20 mb-8">
                <h1 className="text-center text-6xl font-semibold">
                    Crea tus <span className="text-cyan-300 italic">Mazos</span>
                </h1>
            </div>

            {/** Cargando */}
            {userCollection.length === 0 && (
                <div className="flex justify-center items-center mt-40">
                    <p className="text-white text-lg tracking-widest animate-pulse">Cargando mazos...</p>
                </div>
            )}

            {/** Layout principal */}
            {userCollection.length > 0 && (
                <div className="flex flex-col md:flex-row gap-10 px-10 pb-6 mb-8">
                    {/** Mazo — arriba en móvil, derecha en desktop */}
                    <div className="w-full md:w-2/5 md:order-2">
                        <h2 className="text-center text-4xl font-semibold italic text-cyan-300 mb-4">Mi mazo</h2>
                        <div className="h-10 mb-4" />
                        <div className="h-[85vh] md:overflow-y-auto md:pr-2 bg-white/5 border border-white/10 rounded-2xl shadow-2xl shadow-purple-500/20 p-6 flex items-center justify-center">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
                            {deckSlots.map((slot, index) => (
                                <div
                                    key={index}
                                    className="aspect-2/3 flex items-center justify-center rounded-xl border-2 border-dashed border-white/20"
                                >
                                    {slot ? (
                                        <PokemonCard
                                            pokemon={slot}
                                            compact
                                        />
                                    ) : (
                                        <span className="text-white/20 text-4xl">+</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>

                    {/** Inventario */}
                    <div className="w-full md:w-3/5 md:order-1">
                        <h2 className="text-center text-4xl font-semibold italic text-cyan-300 mb-4">Inventario</h2>

                        {/** Buscador */}
                        <div className="flex justify-center mb-4">
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
                                    value={search}
                                    type="text"
                                    placeholder="Buscar por nombre o ID"
                                    className="rounded-md border border-cyan-400/30 bg-white/15 pl-9 pr-3 h-10 w-52 md:w-80 outline-none focus:border-cyan-400"
                                />
                            </div>
                        </div>

                        <div className="md:h-[85vh] md:md:overflow-y-auto md:pr-2 bg-white/5 border border-white/10 rounded-2xl shadow-2xl shadow-purple-500/20 p-6">
                            <div className="flex flex-col items-center md:grid md:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] md:place-items-center gap-8 pt-4 px-4">
                                {availableCards.map((pokemon) => (
                                    <div
                                        key={pokemon.id}
                                        className="page-enter flex justify-center w-full cursor-pointer"
                                        onClick={() => setSelectedPokemon(pokemon)}
                                    >
                                        <PokemonCard
                                            pokemon={pokemon}
                                            compact
                                            quantity={pokemon.availableQuantity}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Deck
