import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBarGeral from './components/NavBarGeral';
import React from 'react';
import Home from './pages/Home';
import QuemSomos from './pages/QuemSomos';
import CadastrarCliente from './pages/CadastrarCliente';
import CadastrarPromoter from './pages/CadastrarPromoter';
import Footer from './components/Footer';


export default function AppRouter() {
    return (
        <main>
            <Router>
                <NavBarGeral />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='about' element={<QuemSomos/>}/>
                    <Route path='cadastrarCliente' element={<CadastrarCliente/>}/>
                    <Route path='cadastrarPromoter' element={<CadastrarPromoter/>}/>
                </Routes>
                <Footer>

                </Footer>
            </Router>
        </main>
    );
}