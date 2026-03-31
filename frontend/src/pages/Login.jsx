import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"


function Login() {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");

    let navigate = useNavigate();

    //Enviar Formulario
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            let data = await api("/login", "POST", { email, password });
            localStorage.setItem("token", data.token);
            navigate("/shop");
        } catch (error) {
            setError("Email o contraseña incorrectos.");
        }
    };

    return (
        <div>
            <h1>Iniciar sesión</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Entrar</button>

                {error && <p className="text-black">{error}</p>}

            </form>
        </div>
    )
}

export default Login