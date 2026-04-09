import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Topbar({ mobileMenuOpen, setMobileMenuOpen, buyCoinsOpen, setBuyCoinsOpen }) {
    let token = localStorage.getItem('token')
    let { user } = useContext(AuthContext)

    function logout() {
        localStorage.removeItem('token')
    }

    return (
        <header className="flex shrink-0 h-16 items-center justify-between py-4 px-10 z-50 bg-black/70 bg-linear-to-t from-blue-500/20 to-purple-500/20 border-b border-white/10 shadow-lg shadow-purple-500/20">
            <h1
                className="font-bold text-2xl md:text-4xl tracking-widest select-none"
                style={{
                    background: 'linear-gradient(90deg, #a78bfa, #60a5fa, #f472b6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                PokéCollect
            </h1>

            <div className="flex items-center gap-2 md:gap-6 text-sm">
                {token ? (
                    <>
                        <div
                            onClick={() => setBuyCoinsOpen(true)}
                            className="flex gap-2 items-center cursor-pointer"
                        >
                            {user && (
                                <span className="text-yellow-400 font-bold text-lg text-center">{user.coins}</span>
                            )}
                            <img
                                src="/icons/monedas.png"
                                alt="Monedas"
                                className="h-6 w-6"
                            />
                        </div>

                        <Link
                            to="/login"
                            onClick={logout}
                            className="hidden md:flex gap-2 items-center text-white hover:text-red-400 transition"
                        >
                            Logout
                            <img
                                src="/icons/logout.png"
                                alt="Logout icono"
                                className="w-6 h-6 mr-2 shrink-0"
                            />
                        </Link>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="flex md:hidden flex-col gap-1 cursor-pointer p-1"
                        >
                            <span className="w-5 h-0.5 bg-white/70 block"></span>
                            <span className="w-5 h-0.5 bg-white/70 block"></span>
                            <span className="w-5 h-0.5 bg-white/70 block"></span>
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="text-white hover:text-cyan-400 transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="text-white hover:text-cyan-400 transition"
                        >
                            Registro
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Topbar
