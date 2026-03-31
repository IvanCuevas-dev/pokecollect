import { useState } from "react"
import api from "../api"
import PackCard from "../components/PackCard"


function Shop() {

    let [cardReceived, setCardReceived] = useState([]);
    let [cardShown, setCardShown] = useState(0);
    let [modal, setModal] = useState(false);
    let [error, setError] = useState("");

    //Comprar sobre
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
        <div className="grid md:grid-cols-3 gap-10 justify-items-center mt-20">
            <PackCard
                type="basic"
                name="Básico"
                description="Ideal para empezar"
                price={50}
                cards={5}
                color="bg-blue-400"
                onBuy={buyPack}
            />

            <PackCard
                type="standard"
                name="Estándar"
                description="Más cartas, más posibilidades."
                price={100}
                cards={10}
                color="bg-purple-400"
                onBuy={buyPack}
            />

            <PackCard
                type="premium"
                name="Premium"
                description="¡La mejor forma de completar tu Pokédex!"
                price={200}
                cards={20}
                color="bg-yellow-400"
                onBuy={buyPack}
            />
        </div>

    )
}

export default Shop