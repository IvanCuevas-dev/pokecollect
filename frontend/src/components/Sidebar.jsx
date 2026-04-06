import { Link, useLocation } from "react-router-dom"

let links = [
    { to: "/shop", label: "Tienda", icon: "/icons/tienda.png", activeBg: "bg-cyan-500/20 border-r-2 border-cyan-400", color: "hover:text-cyan-400", active: "text-cyan-400" },
    { to: "/collection", label: "Colección", icon: "/icons/coleccion.png", activeBg: "bg-red-500/20 border-r-2 border-red-400", color: "hover:text-red-400", active: "text-red-400" },
    { to: "/deck", label: "Mazo", icon: "/icons/mazo.png", activeBg: "bg-orange-500/20 border-r-2 border-orange-400", color: "hover:text-orange-400", active: "text-orange-400" },
    { to: "/social", label: "Social", icon: "/icons/social.png", activeBg: "bg-pink-500/20 border-r-2 border-pink-400", color: "hover:text-pink-400", active: "text-pink-400" },
];

function Sidebar({ sidebarOpen, setSidebarOpen, mobileMenuOpen, setMobileMenuOpen }) {

    let location = useLocation();

    function logout() {
        localStorage.removeItem("token");
        setMobileMenuOpen(false);
    }

    return (
        <>
            {/* Capa que cubre fondo al abrir mobileMenu */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden "
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`sticky left-0 top-16 h-screen z-50 bg-black/70 bg-linear-to-r from-blue-500/20 to-purple-500/20 border-r border-white/20 transition-all duration-300 shadow-2xl rounded-r-xl
                ${mobileMenuOpen ? "translate-x-0 w-56 pt-4" : "-translate-x-full md:translate-x-0"}
                ${sidebarOpen ? "md:w-56 " : "md:w-20"}
            `}>

                {/* Botón abrir/cerrar sidebar */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="hidden md:flex flex-col gap-1 cursor-pointer p-4 self-end">
                    <span className="w-5 h-0.5 bg-white/80 block"></span>
                    <span className="w-5 h-0.5 bg-white/80 block"></span>
                    <span className="w-5 h-0.5 bg-white/80 block"></span>
                </button>

                {/* Links */}
                <nav className="flex flex-col gap-1 px-3 py-1">
                    {links.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`
                                flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm
                                ${location.pathname === link.to
                                    ? `${link.activeBg} ${link.active}`
                                    : "text-white hover:bg-white/5"}
                                ${link.color}
                            `}>
                            <img src={link.icon} alt={link.label} className="w-6 h-6 mr-2 shrink-0" />
                            {sidebarOpen && <span>{link.label}</span>}
                        </Link>
                    ))}

                    <Link
                        to="/login"
                        onClick={logout}
                        className="md:hidden flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm text-white/60 hover:text-red-400 mt-4 border-t border-white/10 pt-4">
                        <span>Logout</span>
                    </Link>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar