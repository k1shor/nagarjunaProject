import React from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Homepage from './pages/Homepage'
import CartPage from './pages/CartPage'

const MyRoutes = () => {
    return (
        <HashRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path='cart' element={<CartPage />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default MyRoutes