import { Link, useLocation } from "react-router-dom"

let links = [
    { to: "/shop", label: "Tienda", icon: "🛍", color: "hover:text-cyan-400", active: "text-cyan-400" },
    { to: "/collection", label: "Colección", icon: "📖", color: "hover:text-purple-400", active: "text-purple-400" },
    { to: "/deck", label: "Mazo", icon: "⚔️", color: "hover:text-yellow-400", active: "text-yellow-400" },
    { to: "/social", label: "Social", icon: "👥", color: "hover:text-emerald-400", active: "text-emerald-400" },
]

function Sidebar({ sidebarOpen, setSidebarOpen, mobileMenuOpen, setMobileMenuOpen }) {

    let location = useLocation();

    function logout() {
        localStorage.removeItem("token");
        setMobileMenuOpen(false);
    }

    return (
        <>
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <aside className={`fixed md:relative top-0 left-0 h-full md:h-auto z-50 md:z-auto flex flex-col bg-white/5 border-r border-white/10 backdrop-blur-md transition-all duration-300
                ${mobileMenuOpen ? "translate-x-0 w-56 pt-13" : "-translate-x-full md:translate-x-0"}
                ${sidebarOpen ? "md:w-56" : "md:w-16"}
            `}>

                {/** Botón sidebar desktop **/}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="hidden md:flex flex-col gap-1 cursor-pointer p-4 self-end">
                    <span className="w-5 h-0.5 bg-white/70 block"></span>
                    <span className="w-5 h-0.5 bg-white/70 block"></span>
                    <span className="w-5 h-0.5 bg-white/70 block"></span>
                </button>

                <nav className="flex flex-col gap-2 px-3 py-1">
                    {links.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm
                                ${location.pathname === link.to ? link.active : "text-white"}
                                ${link.color}
                            `}>
                            <span>{link.icon}</span>
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