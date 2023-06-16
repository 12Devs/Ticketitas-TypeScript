import Form from 'react-bootstrap/Form';
import './InputBuscar.css';
import '../Texto/Texto.css';
import { useNavigate } from 'react-router-dom';

export default function InputBuscar(
    {placeholder, controlId, options, listaId }:
        { placeholder: string, controlId: string, options: any[], listaId: string }) {

    const navigate = useNavigate();
    const refresh = () => window.location.reload();

    function handleNavigate(id: string) {
        console.log("Entrou la ele: ", id);
        if (id.length == 36 && id[8] == "-" && id[13] == "-" && id[18] == "-" && id[23] == "-") {
            navigate(`/evento/${id}`)
            refresh();
        }
    }

    const labelIndentificadora = (op: any) => {
        return `${op.nome}, ${formatData(op.dataEvento)}`;
    }

    function formatData(data: string) {
        var dataHoraOBJ = new Date(data);
        var dataHoraFormatada = (dataHoraOBJ.getUTCDate()) + "/" + (dataHoraOBJ.getMonth() + 1) + "/" + dataHoraOBJ.getFullYear();

        return dataHoraFormatada;
    }

    function renderDatalist() {
        if (options != undefined) {
            return (
                <Form.Group controlId={controlId}>
                    <Form.Control
                        type={"text"}
                        list={listaId}
                        placeholder={placeholder}
                        onChange={(e) => {handleNavigate(e.target.value)}} 
                        className='Input-Primario Texto-Branco'
                        />
        
                    <datalist className='Data-List' id={listaId} >
                        {options.map((option, index) => (
                            <option key={index} value={option.id}>
                                {labelIndentificadora(option)}
                            </option>
                        ))}
        
                    </datalist>
                </Form.Group>
            );
        }
    }

    return (
    <>
        {renderDatalist()}
    </>
    );
}


