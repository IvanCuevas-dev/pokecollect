import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

let links = [
    {
        to: '/shop',
        label: 'Tienda',
        icon: '/icons/tienda.png',
        activeBg: 'bg-cyan-500/20 border-r-2 border-cyan-400',
        color: 'hover:text-cyan-400',
        active: 'text-cyan-400',
    },
    {
        to: '/collection',
        label: 'Colección',
        icon: '/icons/coleccion.png',
        activeBg: 'bg-red-500/20 border-r-2 border-red-400',
        color: 'hover:text-red-400',
        active: 'text-red-400',
    },
    {
        to: '/deck',
        label: 'Mazo',
        icon: '/icons/mazo.png',
        activeBg: 'bg-orange-500/20 border-r-2 border-orange-400',
        color: 'hover:text-orange-400',
        active: 'text-orange-400',
    },
    {
        to: '/social',
        label: 'Social',
        icon: '/icons/social.png',
        activeBg: 'bg-pink-500/20 border-r-2 border-pink-400',
        color: 'hover:text-pink-400',
        active: 'text-pink-400',
    },
]

function Sidebar({ sidebarOpen, setSidebarOpen, mobileMenuOpen, setMobileMenuOpen, buyCoinsOpen, setBuyCoinsOpen }) {
    let location = useLocation()
    let { user } = useContext(AuthContext)

    function logout() {
        localStorage.removeItem('token')
        setMobileMenuOpen(false)
    }

    return (
        <>
            {/* Capa que cubre fondo al abrir mobileMenu */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 md:hidden "
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:sticky left-0 z-40 top-16 h-[calc(100vh-4rem)] bg-black/70 bg-linear-to-r from-blue-500/20 to-purple-500/20 border-r border-white/20 transition-all duration-300 shadow-2xl rounded-r-xl flex flex-col
                ${mobileMenuOpen ? 'translate-x-0 w-56 pt-4' : '-translate-x-full md:translate-x-0'}
                ${sidebarOpen ? 'md:w-56 ' : 'md:w-20'}
            `}
            >
                {/* Botón abrir/cerrar sidebar */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="hidden md:flex flex-col gap-1 cursor-pointer p-4 ml-auto"
                >
                    <span className="w-5 h-0.5 bg-white/80 block"></span>
                    <span className="w-5 h-0.5 bg-white/80 block"></span>
                    <span className="w-5 h-0.5 bg-white/80 block"></span>
                </button>

                {/* Usario */}
                {user && (
                    <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 mb-2">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-sm shrink-0">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        {sidebarOpen && (
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-white capitalize">{user.name}</span>
                                <span className="text-xs text-white/60">Aprendiz</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Links */}
                <nav className="flex flex-col gap-1 px-3 py-1 flex-1">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm
                                ${location.pathname === link.to ? `${link.activeBg} ${link.active}` : 'text-white hover:bg-white/5'}
                                ${link.color}
                            `}
                        >
                            <img
                                src={link.icon}
                                alt={link.label}
                                className="w-6 h-6 mr-2 shrink-0"
                            />
                            {sidebarOpen && <span>{link.label}</span>}
                        </Link>
                    ))}
                </nav>

                {/* Acciones inferiores */}
                <div className="flex flex-col px-3 pb-4 border-t border-white/10 pt-3 gap-1">
                    <div
                        onClick={() => setBuyCoinsOpen(true)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm cursor-pointer text-white hover:text-yellow-400 hover:bg-white/5"
                    >
                        <img
                            src="/icons/monedas.png"
                            alt="Comprar pokecoins"
                            className="w-6 h-6 mr-2 shrink-0"
                        />
                        {sidebarOpen && <span className="shrink-0">Comprar PokéCoins</span>}
                    </div>

                    <Link
                        to="/login"
                        onClick={logout}
                        className="md:hidden flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm text-white hover:text-red-400"
                    >
                        <img
                            src="/icons/logout.png"
                            alt="Logout icono"
                            className="w-6 h-6 mr-2 shrink-0"
                        />
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
