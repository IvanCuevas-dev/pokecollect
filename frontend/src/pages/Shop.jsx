import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import api from "../api"
import PackCard from "../components/PackCard"

function Shop() {

    let [cardReceived, setCardReceived] = useState([]);
    let [cardShown, setCardShown] = useState(0);
    let [modal, setModal] = useState(false);
    let [error, setError] = useState("");
    let { user } = useContext(AuthContext);

    async function buyPack(pack) {
        try {
            let data = await api("/buy", "POST", { pack });
            setCardReceived(data.cards);
            setModal(true);
        } catch (error) {
            setError("No tienes suficientes monedas");
        }
    }

    return (
        <>
            <div className="flex flex-col mt-20">
                <h1 className="text-center text-6xl font-semibold">Tienda de <span className="text-cyan-300 italic">Sobres</span></h1>
                <span className="text-center text-white/90 mt-5 px-10">Adquiere sobres y expande tu colección. Cada sobre contiene cartas de distinta rareza listas para tus mazos!</span>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-15 my-15">
                <PackCard
                    type="basic"
                    name="Básico"
                    description="Ideal para empezar"
                    price={50}
                    cards={5}
                    color="blue"
                    onBuy={buyPack}
                />
                <PackCard
                    type="standard"
                    name="Estándar"
                    description="Más cartas, más posibilidades."
                    price={100}
                    cards={10}
                    color="purple"
                    onBuy={buyPack}
                />
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
        </>
    )
}

export default Shop