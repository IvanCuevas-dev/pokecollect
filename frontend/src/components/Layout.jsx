import Topbar from './Topbar'
import Sidebar from './Sidebar'
import BuyCoinsModal from './BuyCoinsModal'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Layout({ children }) {
    let location = useLocation()
    let token = localStorage.getItem('token')
    let [sidebarOpen, setSidebarOpen] = useState(true)
    let [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    let [buyCoinsOpen, setBuyCoinsOpen] = useState(false)

    useEffect(() => {
        setMobileMenuOpen(false)
    }, [location.pathname])

    return (
        <div className="flex flex-col min-h-screen">
            <Topbar
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                buyCoinsOpen={buyCoinsOpen}
                setBuyCoinsOpen={setBuyCoinsOpen}
            />
            <div className="flex flex-1 min-h-screen">
                {token && (
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        mobileMenuOpen={mobileMenuOpen}
                        setMobileMenuOpen={setMobileMenuOpen}
                        buyCoinsOpen={buyCoinsOpen}
                        setBuyCoinsOpen={setBuyCoinsOpen}
                    />
                )}
                <main className="flex-1 flex flex-col">{children}</main>
            </div>
            <BuyCoinsModal
                buyCoinsOpen={buyCoinsOpen}
                setBuyCoinsOpen={setBuyCoinsOpen}
            />
        </div>
    )
}

export default Layout
