import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Shop from './pages/Shop'
import Collection from './pages/Collection'
import Deck from './pages/Deck'
import Social from './pages/Social'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'


function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/shop" element={<PrivateRoute><Shop /></PrivateRoute>} />
                    <Route path="/collection" element={<PrivateRoute><Collection /></PrivateRoute>} />
                    <Route path="/deck" element={<PrivateRoute><Deck /></PrivateRoute>} />
                    <Route path="/social" element={<PrivateRoute><Social /></PrivateRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App