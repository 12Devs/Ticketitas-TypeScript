import NavBarGeral from "../../components/NavBarGeral";

export default function NotFound404() {
    return (
        <>
            <NavBarGeral />
            <div style={{minHeight: '75vh'}}>
                <img
                    src="img/warning.svg"
                    className="mt-5 mb-5"/>
                <h1 className="mb-5">Erro 404</h1>
                <h2>Página não econtrada</h2>
            </div>
        </>
    );
}