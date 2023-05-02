import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBarGeral from './components/NavBarGeral';
import React from 'react';
import Home from './pages/Home';
import QuemSomos from './pages/QuemSomos';


export default function AppRouter() {
    return (
        <main>
            <Router>
                <NavBarGeral />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='about' element={<QuemSomos/>}/>
                </Routes>
            </Router>
        </main>
    );
}