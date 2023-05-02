import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBarGeral from './components/NavBarGeral';
import React from 'react';
import Home from './pages/Home';
import QuemSomos from './pages/QuemSomos';
import CadastrarCliente from './pages/CadastrarCliente';


export default function AppRouter() {
    return (
        <main>
            <Router>
                <NavBarGeral />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='about' element={<QuemSomos/>}/>
                    <Route path='cadastrarSe' element={<CadastrarCliente/>}/>
                </Routes>
            </Router>
        </main>
    );
}