import NavBarGeral from "../../components/NavBarGeral";
import React from "react";

export default function Forbidden403() {
    return (
        <>
            <NavBarGeral />
            <div style={{minHeight: '75vh'}}>
                <img
                    src="img/block.svg"
                    className="mt-5 mb-5"/>
                <h1 className="mb-5">Erro 403</h1>
                <h2>Acesso não autorizado</h2>
            </div>
        </>
    );
}