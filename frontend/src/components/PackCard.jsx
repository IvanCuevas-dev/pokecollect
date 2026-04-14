import { useState } from 'react'

//prettier-ignore
let styles = {
    blue: {
        gradient:      'from-blue-900/80 via-blue-800/60 to-blue-950/90',
        border:        'border-blue-500/40',
        hoverBorder:   'hover:border-blue-300/70',
        glow:          'hover:shadow-blue-500/40',
        text:          'text-blue-300',
        subtext:       'text-blue-400/70',
        shine:         'pack-shine-blue',
        btn:           'bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/40 hover:border-blue-300/80 hover:shadow-blue-400/30 text-blue-300',
        badge:         'from-blue-500 to-blue-700',
        sprite:        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png',
    },
    purple: {
        gradient:      'from-purple-900/80 via-purple-800/60 to-violet-950/90',
        border:        'border-purple-500/40',
        hoverBorder:   'hover:border-purple-300/70',
        glow:          'hover:shadow-purple-500/40',
        text:          'text-purple-300',
        subtext:       'text-purple-400/70',
        shine:         'pack-shine-purple',
        btn:           'bg-purple-500/20 border-purple-500/50 hover:bg-purple-500/40 hover:border-purple-300/80 hover:shadow-purple-400/30 text-purple-300',
        badge:         'from-purple-500 to-violet-700',
        sprite:        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
    },
    yellow: {
        gradient:      'from-yellow-900/80 via-amber-800/60 to-yellow-950/90',
        border:        'border-yellow-500/40',
        hoverBorder:   'hover:border-yellow-300/70',
        glow:          'hover:shadow-yellow-500/40',
        text:          'text-yellow-300',
        subtext:       'text-yellow-400/70',
        shine:         'pack-shine-yellow',
        btn:           'bg-yellow-500/20 border-yellow-500/50 hover:bg-yellow-500/40 hover:border-yellow-300/80 hover:shadow-yellow-400/30 text-yellow-300',
        badge:         'from-yellow-400 to-amber-600',
        sprite:        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png',
    },
}

function PackCard({ type, name, description, price, cards, color, onBuy }) {
    let [rotate, setRotate] = useState({ x: 0, y: 0 })
    let [isLeaving, setIsLeaving] = useState(false)

    let style = styles[color]

    function handleMouseMove(e) {
        setIsLeaving(false)
        let rect = e.currentTarget.getBoundingClientRect()
        let x = e.clientX - rect.left
        let y = e.clientY - rect.top
        let centerX = rect.width / 2
        let centerY = rect.height / 2
        let rotateX = (y - centerY) / 10
        let rotateY = (centerX - x) / 10
        setRotate({ x: rotateX, y: rotateY })
    }

    function handleMouseLeave() {
        setIsLeaving(true)
        setRotate({ x: 0, y: 0 })
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: isLeaving ? 'transform 0.5s ease' : 'none',
                willChange: 'transform',
            }}
            className={`relative w-72 h-96 rounded-2xl bg-linear-to-br ${style.gradient} border ${style.border} ${style.hoverBorder} shadow-xl shadow-black ${style.glow} hover:shadow-2xl transition-[border,box-shadow] duration-300 overflow-hidden transform-gpu`}
        >
            {/* Brillo animado */}
            <div className={`${style.shine}`} />

            {/* Textura */}
            <div className="card-grain" />

            {/* Reflejo superior */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/5 to-transparent pointer-events-none" />

            {/* Contenido */}
            <div className="relative z-10 flex flex-col justify-between h-full p-6 text-white text-center">
                <div className="flex flex-col items-center gap-3">
                    <img
                        src={style.sprite}
                        className="w-24 h-24 object-contain drop-shadow-lg"
                    />

                    <h2 className={`font-black text-2xl tracking-widest uppercase ${style.text} drop-shadow-lg`}>
                        {name}
                    </h2>
                    <p className={`text-xs uppercase tracking-widest ${style.subtext}`}>{description}</p>

                    <div className="mt-1 flex flex-col items-center gap-1">
                        <span
                            className={`bg-linear-to-r ${style.badge} text-white text-sm font-black px-4 py-1 rounded-full shadow-md tracking-widest`}
                        >
                            {price} PokéCoins
                        </span>
                        <span className="text-white/40 text-xs tracking-widest uppercase">{cards} cartas</span>
                    </div>
                </div>

                <button
                    className={`py-2.5 rounded-lg border ${style.btn} hover:shadow-lg text-sm font-bold uppercase tracking-widest transition duration-300 cursor-pointer backdrop-blur-sm`}
                    onClick={() => onBuy(type)}
                >
                    Comprar
                </button>
            </div>
        </div>
    )
}

export default PackCard
