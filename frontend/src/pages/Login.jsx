import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import api from "../api"


function Login() {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");
    let { setUser } = useContext(AuthContext);
    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            let data = await api("/login", "POST", { email, password });
            localStorage.setItem("token", data.token);
            setUser({
                name: data.user.name,
                coins: data.user.coins,
                avatar: localStorage.getItem("avatar") || "avatar1"
            });
            navigate("/shop");
        } catch (error) {
            setError("Email o contraseña incorrectos");
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8">

                <h1 className="text-2xl font-bold tracking-wide text-center mb-8">
                    Iniciar sesión
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/60 transition"
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/60 transition"
                    />

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        className="mt-2 py-3 rounded-lg bg-linear-to-t from-blue-500/20 to-purple-500/20 border border-purple-500/40 hover:bg-purple-500/40 text-cyan-300 text-sm transition cursor-pointer">
                        Entrar
                    </button>

                </form>

                <p className="text-center text-white/50 text-sm mt-6">
                    ¿No tienes cuenta?{" "}
                    <a href="/register" className="text-cyan-400 hover:text-purple-300 transition">
                        Regístrate
                    </a>
                </p>

            </div>
        </div>
    )
}

export default Login