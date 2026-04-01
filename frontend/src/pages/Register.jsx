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
        <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8">

                <h1 className="text-2xl font-bold tracking-wide text-center mb-8">
                    Registro
                </h1>

                <form onSubmit={enviarRegistro} className="flex flex-col gap-4">

                    <div>
                        <input
                            type="text"
                            placeholder="Nombre de usuario"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/60 transition"
                        />
                        {error.name && <p className="text-red-400 text-xs mt-1">{error.name[0]}</p>}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/60 transition"
                        />
                        {error.email && <p className="text-red-400 text-xs mt-1">{error.email[0]}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/60 transition"
                        />
                        {error.password && <p className="text-red-400 text-xs mt-1">{error.password[0]}</p>}
                    </div>

                    {error.general && <p className="text-red-400 text-sm text-center">{error.general[0]}</p>}

                    <button
                        type="submit"
                        className="mt-2 py-3 rounded-lg bg-purple-500/20 border border-purple-500/40 hover:bg-purple-500/40 text-purple-300 text-sm transition cursor-pointer">
                        Registrar
                    </button>

                </form>

                <p className="text-center text-white/40 text-sm mt-6">
                    ¿Ya tienes cuenta?{" "}
                    <a href="/login" className="text-purple-400 hover:text-purple-300 transition">
                        Inicia sesión
                    </a>
                </p>

            </div>
        </div>
    )
}

export default Register