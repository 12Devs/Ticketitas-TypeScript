import { useNavigate } from "react-router-dom";
import NavBarGeral from "../../components/NavBarGeral";
import { Button } from "react-bootstrap";
import Forbidden403 from "../Forbidden403";

export default function CompraFinalizada() {
    const navigate = useNavigate();

    if (localStorage.getItem("userType") == "cliente") {
        return (
            <>
                <NavBarGeral />
                <div style={{ minHeight: '75vh' }}>
                    <img
                        src="img/logo.svg"
                        className="mt-5 mb-5" />
                    <h1 className="mb-5">Compra finalizada!</h1>
                    <h2>Acesse o seu email para ver o seu ingresso.</h2>
                    <Button onClick={() => navigate("/")} style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Primario Texto-Branco'>
                        Voltar a homepage
                    </Button>
                </div>
            </>
        );
    } else {
        return <Forbidden403/>
    }

}