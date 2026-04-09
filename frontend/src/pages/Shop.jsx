import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import api from '../api'
import PackCard from '../components/PackCard'
import PokemonCard from '../components/PokemonCard'

function Shop() {
    let [cardReceived, setCardReceived] = useState([])
    let [cardShown, setCardShown] = useState(0)
    let [modal, setModal] = useState(false)
    let [error, setError] = useState('')
    let { user, setUser } = useContext(AuthContext)

    async function buyPack(pack) {
        setError('')
        try {
            let data = await api('/buy', 'POST', { pack })
            setCardReceived(data.cards)
            setModal(true)
            setUser({ ...user, coins: data.coins })
        } catch (error) {
            setError('No tienes suficientes monedas')
        }
    }

    return (
        <>
            {modal && cardReceived.length > 0 && (
                <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center gap-4">
                    <p className="text-white/70 text-sm tracking-widest uppercase">
                        {cardShown + 1} / {cardReceived.length}
                    </p>

                    <div className="relative flex items-center justify-center w-full">
                        <div
                            key={cardShown}
                            className="card-reveal"
                        >
                            <PokemonCard pokemon={cardReceived[cardShown]} />
                        </div>

                        <button
                            onClick={() => {
                                if (cardShown + 1 < cardReceived.length) {
                                    setCardShown(cardShown + 1)
                                } else {
                                    setModal(false)
                                    setCardShown(0)
                                    setCardReceived([])
                                }
                            }}
                            className="hidden lg:block absolute right-25 px-10 py-4 rounded-lg bg-cyan-500/20 border border-cyan-400/50 hover:bg-cyan-500/40
                            hover:border-cyan-300/80 hover:shadow-cyan-500/30 hover:shadow-lg text-cyan-300 text-sm font-bold uppercase tracking-widest transition duration-300 cursor-pointer"
                        >
                            {cardShown + 1 < cardReceived.length ? 'Siguiente →' : 'Cerrar'}
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            if (cardShown + 1 < cardReceived.length) {
                                setCardShown(cardShown + 1)
                            } else {
                                setModal(false)
                                setCardShown(0)
                                setCardReceived([])
                            }
                        }}
                        className="lg:hidden mt-4 px-10 py-4 rounded-lg bg-cyan-500/20 border border-cyan-400/50 hover:bg-cyan-500/40 hover:border-cyan-300/80 hover:shadow-cyan-500/30 hover:shadow-lg text-cyan-300 text-sm font-bold uppercase tracking-widest transition duration-300 cursor-pointer"
                    >
                        {cardShown + 1 < cardReceived.length ? 'Siguiente →' : 'Cerrar'}
                    </button>
                </div>
            )}

            <div className="flex flex-col mt-20">
                <h1 className="text-center text-6xl font-semibold">
                    Tienda de <span className="text-cyan-300 italic">Sobres</span>
                </h1>
                <span className="text-center text-white/90 mt-10 px-10">
                    Adquiere sobres y expande tu colección. Cada sobre contiene cartas de distinta rareza listas para
                    tus mazos!
                </span>
                {error && <p className="text-red-400 text-sm text-center mt-6">{error}</p>}
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-15 my-15 lg:my-20">
                <div className="pack-float">
                    <PackCard
                        type="basic"
                        name="Básico"
                        description="Ideal para empezar"
                        price={50}
                        cards={5}
                        color="blue"
                        onBuy={buyPack}
                    />
                </div>
                <div className="pack-float-delay-1">
                    <PackCard
                        type="standard"
                        name="Estándar"
                        description="Más cartas, más posibilidades."
                        price={100}
                        cards={10}
                        color="purple"
                        onBuy={buyPack}
                    />
                </div>
                <div className="pack-float-delay-2">
                    <PackCard
                        type="premium"
                        name="Premium"
                        description="¡La mejor forma de completar tu Pokédex!"
                        price={200}
                        cards={20}
                        color="yellow"
                        onBuy={buyPack}
                    />
                </div>
            </div>
        </>
    )
}

export default Shop
