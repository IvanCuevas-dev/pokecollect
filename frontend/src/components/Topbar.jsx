import { Link } from "react-router-dom"

function Topbar({ mobileMenuOpen, setMobileMenuOpen }) {

    let token = localStorage.getItem("token");

    function logout() {
        localStorage.removeItem("token");
    }

    return (
        <header className="backdrop-blur-md bg-white/5 border-b border-white/10 p-4 flex items-center justify-between z-50">
            <span className="font-bold text-xl tracking-widest">PokéCollect</span>
            <div className="flex items-center gap-4 text-sm">
                {token ? (
                    <>
                        <Link to="/login" onClick={logout} className="hidden md:block hover:text-red-400 transition">
                            Logout
                        </Link>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="flex md:hidden flex-col gap-1 cursor-pointer p-1">
                            <span className="w-5 h-0.5 bg-white/70 block"></span>
                            <span className="w-5 h-0.5 bg-white/70 block"></span>
                            <span className="w-5 h-0.5 bg-white/70 block"></span>
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-yellow-400 transition">Login</Link>
                        <Link to="/register" className="hover:text-yellow-400 transition">Registro</Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Topbar