import { useState } from "react"
import api from "../api"
import PackCard from "../components/PackCard"

function Shop() {

    let [cardReceived, setCardReceived] = useState([]);
    let [cardShown, setCardShown] = useState(0);
    let [modal, setModal] = useState(false);
    let [error, setError] = useState("");

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
            <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-15 p-6">
                <h1>Tienda de Sobres</h1>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-15 p-6">
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