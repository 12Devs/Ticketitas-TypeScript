import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBarGeral from './components/NavBarGeral';
import React from 'react';
import Home from './pages/Home';
import QuemSomos from './pages/QuemSomos';
import CadastrarCliente from './pages/CadastrarCliente';
import CadastrarPromoter from './pages/CadastrarPromoter';
import CadastrarAdmin from './pages/CadastrarAdmin';
import RecuperarSenha from './pages/RecuperarSenha';
import PrimeiraSenha from './pages/PrimeiraSenha';
import Footer from './components/Footer';
import Evento from './pages/Evento';



export default function AppRouter() {
    return (
        <main>
            <Router>
                <NavBarGeral />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='about' element={<QuemSomos/>}/>
                    <Route path='evento' element={<Evento/>}/>
                    <Route path='cadastrarCliente' element={<CadastrarCliente/>}/>
                    <Route path='cadastrarPromoter' element={<CadastrarPromoter/>}/>
                    <Route path='cadastrarAdmin' element={<CadastrarAdmin/>}/>
                    <Route path='recuperarSenha' element={<RecuperarSenha/>}/>
                    <Route path='PrimeiraSenha' element={<PrimeiraSenha/>}/>
                </Routes>
                <Footer/>
            </Router>
        </main>
    );
}