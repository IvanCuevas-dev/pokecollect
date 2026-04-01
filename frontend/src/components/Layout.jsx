import Topbar from "./Topbar"
import Sidebar from "./Sidebar"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

function Layout({ children }) {

    let location = useLocation();
    let token = localStorage.getItem("token");
    let [sidebarOpen, setSidebarOpen] = useState(true);
    let [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <div className="flex flex-col min-h-screen bg-[#0f0f1a] text-white">
            <Topbar
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />
            <div className="flex flex-1">
                {token && (
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        mobileMenuOpen={mobileMenuOpen}
                        setMobileMenuOpen={setMobileMenuOpen}
                    />
                )}
                <main className="flex-1 flex flex-col bg-[#0B0F1A]">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout