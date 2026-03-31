import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"



function Register() {

    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState({});

    let navigate = useNavigate();

    async function enviarRegistro(e) {
        e.preventDefault();

        if (!name || !email || !password) {
            setError({ general: ['Rellena todos los campos.'] });
            return;
        }

        try {
            let data = await api("/register", "POST", { name, email, password });
            localStorage.setItem("token", data.token);
            navigate("/shop");
        } catch (err) {
            setError(err.errors || {});
        }
    }

    return (
        <div>
            <h1>Registro</h1>

            <form onSubmit={enviarRegistro}>

                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {error.name && <p>{error.name[0]}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {error.email && <p>{error.email[0]}</p>}

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error.password && <p>{error.password[0]}</p>}

                <button type="submit">Registrar</button>

                {error.general && <p>{error.general[0]}</p>}

            </form>
        </div>
    )
}

export default Register