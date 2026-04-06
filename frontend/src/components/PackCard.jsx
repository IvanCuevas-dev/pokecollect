import { useState } from "react"

let styles = {
    blue: { gradient: "bg-gradient-to-br from-blue-400/40 via-blue-500/20 to-blue-900/40", border: "border-blue-500/40", hover: "hover:border-blue-400/80", shadow: "hover:shadow-blue-500/20", text: "text-blue-400", btn: "bg-blue-500/20 border-blue-500/40 hover:bg-blue-500/40 text-blue-300" },
    purple: { gradient: "bg-gradient-to-br from-purple-400/40 via-purple-500/20 to-purple-900/40", border: "border-purple-500/40", hover: "hover:border-purple-400/80", shadow: "hover:shadow-purple-500/20", text: "text-purple-400", btn: "bg-purple-500/20 border-purple-500/40 hover:bg-purple-500/40 text-purple-300" },
    yellow: { gradient: "bg-gradient-to-br from-yellow-400/40 via-yellow-500/20 to-yellow-900/40", border: "border-yellow-500/40", hover: "hover:border-yellow-400/80", shadow: "hover:shadow-yellow-500/20", text: "text-yellow-400", btn: "bg-yellow-500/20 border-yellow-500/40 hover:bg-yellow-500/40 text-yellow-300" },
}

function PackCard({ type, name, description, price, cards, color, onBuy }) {

    let [rotate, setRotate] = useState({ x: 0, y: 0 });
    let [isLeaving, setIsLeaving] = useState(false);

    let style = styles[color];

    function handleMouseMove(e) {
        setIsLeaving(false);
        let rect = e.currentTarget.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        let centerX = rect.width / 2;
        let centerY = rect.height / 2;
        let rotateX = (y - centerY) / 10;
        let rotateY = (centerX - x) / 10;
        setRotate({ x: rotateX, y: rotateY });
    }

    function handleMouseLeave() {
        setIsLeaving(true);
        setRotate({ x: 0, y: 0 });
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: isLeaving ? 'transform 0.5s ease' : 'none'
            }}
            className={`relative w-72 h-96 rounded-2xl md:backdrop-blur-md ${style.gradient} border ${style.border} ${style.hover} shadow-lg ${style.shadow} hover:shadow-2xl transition-[border,box-shadow] duration-300`}>

            <div className="flex flex-col justify-between h-full p-6 text-white text-center">
                <div>
                    <h2 className={`font-bold text-2xl tracking-wide mb-2 ${style.text}`}>
                        {name}
                    </h2>
                    <p className="text-sm text-white/60 mb-3">
                        {description}
                    </p>
                    <div className="text-sm text-white/80 space-y-1">
                        <p className="text-xl font-bold">{price} PokeCoins</p>
                        <p>{cards} cartas</p>
                    </div>
                </div>
                <button
                    className={`mt-4 py-2 rounded-lg backdrop-blur-md border ${style.btn} transition cursor-pointer`}
                    onClick={() => onBuy(type)}>
                    Comprar
                </button>
            </div>
        </div>
    )
}

export default PackCard