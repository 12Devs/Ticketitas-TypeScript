import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBarGeral from './components/NavBarGeral';
import React from 'react';
import Home from './pages/Home';
import QuemSomos from './pages/QuemSomos';
import CadastrarCliente from './pages/CadastrarCliente';
import EditarCliente from './pages/EditarCliente';
import CadastrarPromoter from './pages/CadastrarPromoter';
import EditarPromoter from './pages/EditarPromoter';
import CadastrarAdmin from './pages/CadastrarAdmin';
import EditarAdmin from './pages/EditarAdmin';
import RecuperarSenha from './pages/RecuperarSenha';
import PrimeiraSenha from './pages/PrimeiraSenha';
import Footer from './components/Footer';
import Evento from './pages/Evento';
import LoginAdm from './pages/LoginAdm';
import Perfil from './pages/Perfil';


export default function AppRouter() {
    return (
        <main>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='about' element={<QuemSomos />} />
                    <Route path='evento' element={<Evento />} />
                    <Route path='cadastrarCliente' element={<CadastrarCliente />} />
                    <Route path='editarCliente' element={<EditarCliente/>}/>
                    <Route path='cadastrarPromoter' element={<CadastrarPromoter />} />
                    <Route path='editarPromoter' element={<EditarPromoter/>}/>
                    <Route path='cadastrarAdmin' element={<CadastrarAdmin />} />
                    <Route path='editarAdmin' element={<EditarAdmin/>}/>
                    <Route path='recuperarSenha' element={<RecuperarSenha />} />
                    <Route path='PrimeiraSenha' element={<PrimeiraSenha />} />
                    <Route path='evento' element={<Evento />} />
                    <Route path='loginAdm' element={<LoginAdm/>}/>
                    <Route path='perfil' element={<Perfil/>}/>
                </Routes>
                <Footer />
            </Router>
        </main>
    );
}