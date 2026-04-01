import Navbar from "./Navbar"

function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-[#0f0f1a] text-white">
            <Navbar />
            <main className="flex-1 flex flex-col bg-[#0B0F1A]">
                {children}
            </main>
        </div>
    )
}

export default Layout