import { useState, useEffect } from 'react'
import api from '../api'
import PokemonCard from '../components/PokemonCard'

function DeckCard({ deck, onVote }) {
    let initials = deck.user_name.slice(0, 1).toUpperCase()
    let [voteError, setVoteError] = useState(null)

    async function handleVote(isLike) {
        try {
            await api('/social/vote', 'POST', { deck_id: deck.id, is_like: isLike })
            setVoteError(null)
            onVote()
        } catch (e) {
            setVoteError(e?.message ?? 'Error al votar')
        }
    }

    return (
        <div className="page-enter flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-xl shadow-black/30 hover:border-white/20 transition duration-300">
            {/** Header */}
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md">
                        {initials}
                    </div>
                    <span className="text-white font-bold text-sm capitalize">{deck.user_name}</span>
                </div>
                <div className="w-full border-t border-white/10" />
                <h2
                    className="text-base font-black uppercase tracking-widest text-center"
                    style={{
                        background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    {deck.name}
                </h2>
            </div>

            {/** Grid 2x3 cartas */}
            <div className="grid grid-cols-3 gap-2">
                {deck.cards.map((card) => (
                    <PokemonCard
                        key={card.slot_number}
                        pokemon={card}
                        mini
                    />
                ))}
            </div>

            {/** Votos */}
            {voteError && <p className="text-red-400 text-xs text-center">{voteError}</p>}
            <div className="flex items-center gap-4 pt-1 border-t border-white/10">
                <button
                    onClick={() => handleVote(1)}
                    disabled={deck.is_mine}
                    className={`flex items-center gap-1.5 text-sm font-bold transition ${deck.is_mine ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'} ${deck.user_vote === 'like' ? 'text-cyan-400' : 'text-white hover:text-cyan-400'}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M2 20h2a2 2 0 002-2v-7a2 2 0 00-2-2H2v11zM20.15 9H15V4a3 3 0 00-3-3l-4 9v11h11.28A2 2 0 0021 19.23l1.43-8A2 2 0 0020.15 9z" />
                    </svg>
                    {deck.likes}
                </button>
                <button
                    onClick={() => handleVote(0)}
                    disabled={deck.is_mine}
                    className={`flex items-center gap-1.5 text-sm font-bold transition ${deck.is_mine ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'} ${deck.user_vote === 'dislike' ? 'text-red-400' : 'text-white hover:text-red-400'}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M22 4H20a2 2 0 00-2 2v7a2 2 0 002 2h2V4zM3.85 15H9v5a3 3 0 003 3l4-9V3H4.72A2 2 0 003 4.77l-1.43 8A2 2 0 003.85 15z" />
                    </svg>
                    {deck.dislikes}
                </button>
            </div>
        </div>
    )
}

function Social() {
    let [allDecks, setAllDecks] = useState([])
    let [filter, setFilter] = useState('all')
    let [search, setSearch] = useState('')
    let [isReady, setIsReady] = useState(false)
    let [error, setError] = useState('')

    async function loadDecks() {
        try {
            let decks = await api('/social', 'GET')
            setAllDecks(decks)
        } catch (err) {
            setError('Error al cargar los mazos')
        } finally {
            setIsReady(true)
        }
    }

    useEffect(() => {
        loadDecks()
    }, [])

    let visibleDecks = allDecks.filter((deck) => {
        let matchesFilter = filter === 'all' || deck.is_mine
        let matchesSearch =
            (deck.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
            (deck.user_name ?? '').toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    return (
        <div className="flex flex-col mt-20 px-6 md:px-10 pb-10">
            {/** Título */}
            <div className="mb-8">
                <h1 className="text-center text-5xl md:text-6xl font-semibold">
                    Mazos de la <span className="text-cyan-300 italic">Comunidad</span>
                </h1>
            </div>

            {/** Filtros + buscador */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-5 h-10 rounded-md text-sm font-bold uppercase tracking-widest border transition duration-300 cursor-pointer ${filter === 'all' ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300' : 'bg-white/15 border-cyan-400/30 text-white hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:text-cyan-300'}`}
                >
                    Todos
                </button>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar mazo o entrenador..."
                    className="w-full sm:w-72 rounded-md border border-cyan-400/30 bg-white/15 px-4 h-10 outline-none focus:border-cyan-400 text-white placeholder:text-white/40 transition"
                />
                <button
                    onClick={() => setFilter('mine')}
                    className={`px-5 h-10 rounded-md text-sm font-bold uppercase tracking-widest border transition duration-300 cursor-pointer ${filter === 'mine' ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300' : 'bg-white/15 border-cyan-400/30 text-white hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:text-cyan-300'}`}
                >
                    Mis mazos
                </button>
            </div>

            {/** Cargando */}
            {!isReady && (
                <div className="flex justify-center items-center mt-40">
                    <p className="text-white text-lg tracking-widest animate-pulse">Cargando mazos...</p>
                </div>
            )}

            {/** Error */}
            {isReady && error && (
                <div className="flex justify-center items-center mt-40">
                    <p className="text-red-400 text-lg tracking-widest">{error}</p>
                </div>
            )}

            {/** Sin resultados */}
            {isReady && !error && visibleDecks.length === 0 && (
                <div className="flex justify-center items-center mt-40">
                    <p className="text-white/40 text-lg tracking-widest">No hay mazos que mostrar</p>
                </div>
            )}

            {/** Grid mazos */}
            {isReady && !error && visibleDecks.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {visibleDecks.map((deck) => (
                        <DeckCard
                            key={deck.id}
                            deck={deck}
                            onVote={loadDecks}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Social
