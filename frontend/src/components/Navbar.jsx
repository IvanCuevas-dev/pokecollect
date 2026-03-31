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
                <nav className="bg-gray-800 p-4 flex items-center justify-between">
                    <span className="text-yellow-400 font-bold text-xl">PokéCollect</span>

                    <div className="flex gap-6 text-white">
                        <Link to="/shop" className="hover:text-yellow-400">
                            Tienda
                        </Link>
                        <Link to="/collection" className="hover:text-yellow-400">
                            Colección
                        </Link>
                        <Link to="/deck" className="hover:text-yellow-400">
                            Mazo
                        </Link>
                        <Link to="/social" className="hover:text-yellow-400">
                            Social
                        </Link>
                        <Link to="/login" onClick={logout} className="hover:text-yellow-400">
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