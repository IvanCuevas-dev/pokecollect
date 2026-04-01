import { Link, useLocation } from 'react-router-dom'


function Navbar() {

    let location = useLocation();
    let token = localStorage.getItem("token");

    function logout() {
        localStorage.removeItem("token")
    }

    if (token) {
        return (
            <header>
                <nav className="backdrop-blur-md bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
                    <span className="font-bold text-xl tracking-widest">PokéCollect</span>

                    <div className="flex gap-6 text-sm">
                        <Link to="/shop" className="hover:text-cyan-400 transition">
                            Tienda
                        </Link>
                        <Link to="/collection" className="hover:text-purple-400 transition">
                            Colección
                        </Link>
                        <Link to="/deck" className="hover:text-yellow-400 transition">
                            Mazo
                        </Link>
                        <Link to="/social" className="hover:text-emerald-400 transition">
                            Social
                        </Link>
                        <Link to="/login" onClick={logout} className="hover:text-red-400">
                            Logout
                        </Link>
                    </div>
                </nav>
            </header>
        )
    } else {
        return (
            <header>
                <nav className="bg-gray-800 p-4 flex items-center justify-between">
                    <span className="text-yellow-400 font-bold text-xl">PokéCollect</span>

                    <div className="flex gap-6 text-white">
                        <Link to="/login" className="hover:text-yellow-400">
                            Login
                        </Link>
                        <Link to="/register" className="hover:text-yellow-400">
                            Registro
                        </Link>
                    </div>
                </nav>
            </header>
        )
    }


}

export default Navbar