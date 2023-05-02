import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBarGeral from './components/NavBarGeral';
import React from 'react';



export default function AppRouter() {
    return (
        <main>
            <Router>
                <NavBarGeral/>
                
                <Routes>
                </Routes>
            </Router>
        </main>
    );
}