import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBarGeral from './components/NavBarGeral';
import React from 'react';
import Home from './pages/Home';
import QuemSomos from './pages/QuemSomos';
import CadastrarCliente from './pages/CadastrarCliente';
import CadastrarPromoter from './pages/CadastrarPromoter';
import CadastrarAdmin from './pages/CadastrarAdmin';
import RecuperarSenha from './pages/RecuperarSenha';



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
                    <Route path='cadastrarAdmin' element={<CadastrarAdmin/>}/>
                    <Route path='recuperarSenha' element={<RecuperarSenha/>}/>
                </Routes>
                
            </Router>
        </main>
    );
}