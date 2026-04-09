import { useState } from 'react'

//prettier-ignore
let typeConfig = {
    Fuego:      { gradient: 'from-orange-200 via-red-100 to-orange-300',    badge: 'bg-linear-to-r from-orange-400 to-red-500',          text: 'text-orange-900' },
    Agua:       { gradient: 'from-blue-200 via-cyan-100 to-blue-300',       badge: 'bg-linear-to-r from-blue-400 to-cyan-500',           text: 'text-blue-900' },
    Planta:     { gradient: 'from-green-200 via-emerald-100 to-lime-200',   badge: 'bg-linear-to-r from-green-500 to-emerald-600',       text: 'text-green-900' },
    Eléctrico:  { gradient: 'from-yellow-100 via-amber-100 to-yellow-200',  badge: 'bg-linear-to-r from-yellow-400 to-amber-500',        text: 'text-yellow-900' },
    Psíquico:   { gradient: 'from-pink-200 via-fuchsia-100 to-rose-200',    badge: 'bg-linear-to-r from-pink-400 to-fuchsia-500',        text: 'text-pink-900' },
    Hielo:      { gradient: 'from-cyan-100 via-sky-50 to-blue-100',         badge: 'bg-linear-to-r from-cyan-400 to-sky-500',            text: 'text-cyan-900' },
    Dragón:     { gradient: 'from-indigo-200 via-purple-100 to-indigo-300', badge: 'bg-linear-to-r from-indigo-500 to-purple-600',       text: 'text-indigo-900' },
    Siniestro:  { gradient: 'from-gray-300 via-slate-200 to-gray-400',      badge: 'bg-linear-to-r from-gray-600 to-slate-700',          text: 'text-gray-900' },
    Hada:       { gradient: 'from-pink-100 via-rose-50 to-pink-200',        badge: 'bg-linear-to-r from-pink-300 to-rose-400',           text: 'text-pink-800' },
    Normal:     { gradient: 'from-gray-100 via-stone-100 to-gray-200',      badge: 'bg-linear-to-r from-gray-300 to-stone-400',          text: 'text-gray-700' },
    Lucha:      { gradient: 'from-red-200 via-orange-100 to-red-300',       badge: 'bg-linear-to-r from-red-500 to-orange-600',          text: 'text-red-900' },
    Veneno:     { gradient: 'from-purple-200 via-violet-100 to-purple-300', badge: 'bg-linear-to-r from-purple-500 to-violet-600',       text: 'text-purple-900' },
    Tierra:     { gradient: 'from-amber-200 via-yellow-100 to-amber-300',   badge: 'bg-linear-to-r from-amber-500 to-yellow-600',        text: 'text-amber-900' },
    Volador:    { gradient: 'from-sky-100 via-indigo-50 to-sky-200',        badge: 'bg-linear-to-r from-sky-400 to-indigo-500',          text: 'text-sky-900' },
    Bicho:      { gradient: 'from-lime-200 via-green-100 to-lime-300',      badge: 'bg-linear-to-r from-lime-500 to-green-600',          text: 'text-lime-900' },
    Roca:       { gradient: 'from-stone-200 via-amber-100 to-stone-300',    badge: 'bg-linear-to-r from-stone-400 to-amber-600',         text: 'text-stone-900' },
    Fantasma:   { gradient: 'from-purple-300 via-indigo-200 to-purple-400', badge: 'bg-linear-to-r from-purple-700 to-indigo-800',       text: 'text-purple-900' },
    Acero:      { gradient: 'from-slate-100 via-gray-50 to-slate-200',      badge: 'bg-linear-to-r from-slate-400 to-gray-500',          text: 'text-slate-900' },
};

//prettier-ignore
let rarityConfig = {
    'Común':      { shadow: 'shadow-slate-400',  borderGradient: 'from-slate-400 to-slate-600',                 gradient: 'from-slate-100 via-gray-100 to-slate-200',     text: 'text-slate-500',   shine: ''                },
    'Poco común': { shadow: 'shadow-green-500',  borderGradient: 'from-green-400 to-emerald-600',               gradient: 'from-green-100 via-emerald-50 to-green-200',   text: 'text-emerald-600', shine: 'shine-uncommon'  },
    'Rara':       { shadow: 'shadow-blue-600',   borderGradient: 'from-blue-400 to-indigo-600',                 gradient: 'from-blue-100 via-sky-50 to-indigo-200',       text: 'text-blue-600',    shine: 'shine-rare'      },
    'Épica':      { shadow: 'shadow-purple-400', borderGradient: 'from-purple-500 to-violet-800',               gradient: 'from-purple-100 via-violet-50 to-purple-200',  text: 'text-purple-600',  shine: 'shine-epic'      },
    'Legendaria': { shadow: 'shadow-yellow-400', borderGradient: 'from-yellow-300 via-amber-400 to-yellow-600', gradient: 'from-yellow-100 via-amber-50 to-yellow-200',   text: 'text-amber-500',   shine: 'shine-legendary' },
}

function StatBar({ label, value, badgeClass }) {
    if (value == null) return null
    let pct = Math.min(Math.round((value / 155) * 100), 100)

    return (
        <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-gray-500 w-7 shrink-0">{label}</span>
            <div className="flex-1 bg-black/10 rounded-full h-1.5 overflow-hidden">
                <div className={`h-full rounded-full ${badgeClass}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs font-bold text-gray-600 w-5 text-right shrink-0">{value}</span>
        </div>
    )
}

function PokemonCard({ pokemon }) {
    let primaryType = pokemon.type_1
    let config = typeConfig[primaryType]
    let rarityType = pokemon.rarity
    let configRarity = rarityConfig[rarityType]

    let [rotate, setRotate] = useState({ x: 0, y: 0 })
    let [isLeaving, setIsLeaving] = useState(false)

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
        <>
            <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                    transition: isLeaving ? 'transform 0.5s ease' : 'none',
                    willChange: 'transform',
                }}
                className={`relative bg-linear-to-br ${configRarity.borderGradient} p-1 rounded-2xl shadow-xl ${configRarity.shadow} mx-6 my-2 md:my-6 transform-gpu`}
            >
                {/* Carta */}
                <div
                    className={`relative bg-linear-to-br ${configRarity.gradient} w-80 md:w-110 rounded-xl p-3 md:p-4 flex flex-col gap-1 md:gap-2 font-sans select-none overflow-hidden`}
                >
                    <div className="card-grain" />
                    <div className="card-inner-shadow" />
                    {configRarity.shine && <div className={configRarity.shine} />}

                    {/* ID + RAREZA + HP */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400">#{String(pokemon.id).padStart(3, '0')}</span>
                        <span
                            className={`bg-linear-to-r ${configRarity.borderGradient} text-white text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest shadow-md`}
                        >
                            {pokemon.rarity}
                        </span>
                        <span className={`text-sm font-black ${config.text}`}>
                            <span className="text-xs font-semibold">HP </span>
                            {pokemon.hp}
                        </span>
                    </div>

                    {/* Nombre */}
                    <h2
                        className={`text-center text-3xl md:text-5xl font-black uppercase tracking-widest ${config.text} drop-shadow-lg`}
                    >
                        {pokemon.name}
                    </h2>

                    {/* Imagen */}
                    <div
                        className={`bg-linear-to-br ${config.gradient} mx-auto w-52 h-52 md:w-98 md:h-74 rounded-xl flex items-center justify-center border border-white/40 shadow-inner`}
                    >
                        <img
                            src={pokemon.sprite_url}
                            alt={pokemon.name}
                            className="w-48 h-48 md:w-60 md:h-60 object-contain drop-shadow-lg"
                        />
                    </div>

                    {/* Tipos */}
                    <div className="flex justify-center gap-1.5">
                        <span
                            className={`${config.badge} m-1 md:m-2 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md`}
                        >
                            {pokemon.type_1}
                        </span>
                        {pokemon.type_2 && (
                            <span
                                className={`${typeConfig[pokemon.type_2]?.badge} m-1 md:m-2 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md`}
                            >
                                {pokemon.type_2}
                            </span>
                        )}
                    </div>

                    {/* Altura + peso */}
                    <div className="flex justify-around text-xs text-gray-500 font-semibold border-t border-black/10 pt-1">
                        <span>{pokemon.height} m</span>
                        <span className="border-l border-black/10"></span>
                        <span>{pokemon.weight} kg</span>
                    </div>

                    {/* Descripción */}
                    <p className="text-xs text-gray-600 italic text-center bg-white/40 rounded-lg px-2 py-1.5">
                        {pokemon.description}
                    </p>

                    {/* Stats */}
                    <div className="bg-white/30 rounded-lg px-2 py-1 md:py-1.5 flex flex-col gap-1 md:gap-1.5">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest text-center mb-1 md:mb-2">
                            Estadísticas
                        </span>
                        <StatBar label="ATK" value={pokemon.attack} badgeClass={config.badge} />
                        <StatBar label="DEF" value={pokemon.defense} badgeClass={config.badge} />
                        <StatBar label="VEL" value={pokemon.speed} badgeClass={config.badge} />
                    </div>

                    {/* Movimientos */}
                    {(pokemon.move_1 || pokemon.move_2) && (
                        <div className="bg-white/30 rounded-lg px-2 py-1 md:py-1.5 flex flex-col gap-1">
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest text-center mb-1 md:mb-2">
                                Movimientos
                            </span>
                            <div className="flex justify-center gap-4 flex-wrap">
                                {pokemon.move_1 && (
                                    <span
                                        className={`${config.badge} text-white text-xs font-bold px-3 py-1 rounded-full capitalize shadow-sm`}
                                    >
                                        {pokemon.move_1}
                                    </span>
                                )}
                                {pokemon.move_2 && (
                                    <span
                                        className={`${config.badge} text-white text-xs font-bold px-3 py-1 rounded-full capitalize shadow-sm`}
                                    >
                                        {pokemon.move_2}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default PokemonCard
