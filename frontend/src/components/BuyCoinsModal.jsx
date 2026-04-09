import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import api from '../api'

let packages = [
    {
        amount: 100,
        label: '100 PokéCoins',
        price: '0,99€',
        gradient: 'from-green-900/80 via-green-800/60 to-green-950/90',
        border: 'border-green-500/40 hover:border-green-300/70',
        text: 'text-green-300',
        badge: 'from-green-500 to-green-700',
        btn: 'bg-green-500/20 border-green-500/50 hover:bg-green-500/40 hover:border-green-300/80 hover:shadow-green-400/30',
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    },
    {
        amount: 500,
        label: '500 PokéCoins',
        price: '3,99€',
        gradient: 'from-blue-900/80 via-blue-800/60 to-blue-950/90',
        border: 'border-blue-500/40 hover:border-blue-300/70',
        text: 'text-blue-300',
        badge: 'from-blue-500 to-blue-700',
        btn: 'bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/40 hover:border-blue-300/80 hover:shadow-blue-400/30',
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
    },
    {
        amount: 1000,
        label: '1000 PokéCoins',
        price: '6,99€',
        gradient: 'from-purple-900/80 via-purple-800/60 to-violet-950/90',
        border: 'border-purple-500/40 hover:border-purple-300/70',
        text: 'text-purple-300',
        badge: 'from-purple-500 to-violet-700',
        btn: 'bg-purple-500/20 border-purple-500/50 hover:bg-purple-500/40 hover:border-purple-300/80 hover:shadow-purple-400/30',
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png',
    },
    {
        amount: 5000,
        label: '5000 PokéCoins',
        price: '24,99€',
        gradient: 'from-yellow-900/80 via-amber-800/60 to-yellow-950/90',
        border: 'border-yellow-500/40 hover:border-yellow-300/70',
        text: 'text-yellow-300',
        badge: 'from-yellow-400 to-amber-600',
        btn: 'bg-yellow-500/20 border-yellow-500/50 hover:bg-yellow-500/40 hover:border-yellow-300/80 hover:shadow-yellow-400/30',
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
    },
]

function BuyCoinsModal({ buyCoinsOpen, setBuyCoinsOpen }) {
    let { user, setUser } = useContext(AuthContext)
    let [error, setError] = useState('')

    async function handleBuy(pkg) {
        try {
            let data = await api('/buyCoins', 'POST', { amount: pkg.amount })
            setUser({ ...user, coins: data.coins })
            setBuyCoinsOpen(false)
        } catch (error) {
            setError('Error al comprar PokéCoins, inténtalo de nuevo')
        }
    }

    return (
        <>
            {buyCoinsOpen && (
                <div
                    className="fixed inset-0 bg-black/90 z-40"
                    onClick={() => setBuyCoinsOpen(false)}
                />
            )}

            {buyCoinsOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                    <div className="buyCoinsModal pointer-events-auto w-full max-w-5xl lg:max-w-6xl border border-white/10 rounded-2xl shadow-2xl shadow-purple-500/20 p-6 lg:p-10 flex flex-col gap-6 lg:gap-8">
                        {/* Cabecera */}
                        <div className="flex items-center justify-center">
                            <div>
                                <h2
                                    className="text-4xl font-black tracking-widest uppercase text-center"
                                    style={{
                                        background: 'linear-gradient(90deg, #a78bfa, #60a5fa, #f472b6)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Recargar PokéCoins
                                </h2>
                                <p className="text-white/60 text-xs tracking-widest mt-1 text-center">
                                    Elige un paquete para continuar
                                </p>
                            </div>
                            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                        </div>

                        {/* Paquetes */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {packages.map((pkg) => (
                                <div
                                    key={pkg.amount}
                                    className={`relative flex flex-col items-center gap-3 lg:gap-5 rounded-xl bg-linear-to-br ${pkg.gradient} border ${pkg.border} p-4 lg:p-6 transition-all duration-300 hover:shadow-xl overflow-hidden`}
                                >
                                    <img
                                        src={pkg.sprite}
                                        alt={pkg.label}
                                        className="w-16 h-16 lg:w-32 lg:h-32 object-contain drop-shadow-lg relative z-10"
                                    />

                                    <div className="flex flex-col items-center gap-1 relative z-10">
                                        <span
                                            className={`bg-linear-to-r ${pkg.badge} text-white text-xs font-black px-3 py-0.5 rounded-full tracking-widest`}
                                        >
                                            {pkg.amount} coins
                                        </span>
                                        <span className={`text-xs font-bold tracking-widest ${pkg.text}`}>
                                            {pkg.price}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => handleBuy(pkg)}
                                        className={`w-full py-2 rounded-lg border ${pkg.btn} hover:shadow-lg text-xs font-bold uppercase tracking-widest transition duration-300 cursor-pointer backdrop-blur-sm relative z-10`}
                                    >
                                        Comprar
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Cerrar */}
                        <div className="flex justify-center">
                            <button
                                onClick={() => setBuyCoinsOpen(false)}
                                className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white hover:text-white text-sm font-bold uppercase tracking-widest transition duration-300 cursor-pointer"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default BuyCoinsModal
