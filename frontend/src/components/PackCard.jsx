function PackCard({ type, name, description, price, cards, color, onBuy }) {
    return (
        <div className={`${color} rounded-lg p-6 shadow-md w-[320px]`}>

            <div>
                <h2 className="font-bold text-2xl">{name}</h2>
                <p>{description}</p>
                <p>{price} PokeCoins</p>
                <p>{cards} cartas</p>
            </div>

            <div>
                <button onClick={() => onBuy(type)}>
                    Comprar
                </button>
            </div>
        </div >
    )
}

export default PackCard