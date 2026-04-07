import { createContext, useState, useEffect } from "react"
import api from "../api"


//Comparte name, coins y avatar con todos los componentes
let AuthContext = createContext();

function AuthProvider({ children }) {

    let [user, setUser] = useState(null);

    useEffect(() => {
        let token = localStorage.getItem("token");

        if (token) {
            api("/user", "GET").then(data => {
                setUser({
                    name: data.name,
                    coins: data.coins,
                    avatar: localStorage.getItem("avatar") || "avatar1"
                });
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };