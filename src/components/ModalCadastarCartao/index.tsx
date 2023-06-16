import React, { useEffect, useState } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import InputTexto from "../InputTexto";
import { api } from "../../services/api";

export default function ModalCadastrarCartao(){
    const [show, setShow] = useState(false);
    const [cvv, setCvv] = useState('');
    const [cpf, setCpf] = useState('undefined');
    const [cardNumber, setCardNumber] = useState('');
    const [monthExpirationDate, setMonthExpirationDate] = useState('');
    const [yearExpirationDate, setYearExpirationDate] = useState('');
    const [holder, setHolder] = useState('');
    const refresh = () => window.location.reload();

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };

    useEffect(() => {
       
        const cpfLocalStorage = localStorage.getItem('CPF');
        if (cpfLocalStorage != null) {
            setCpf(cpfLocalStorage);
        }
    }, [])
    
    
    const cadastrarCartao = (event: any) => {
        event.preventDefault();
        var data: any = {
            cvv,
            cardNumber,
            monthExpirationDate,
            yearExpirationDate,
            holder,
            cpf
        }
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        api.post("user/client/card", data, config).then((response) => {
            console.log(response)
        });
      
    }
    return(
        <>
        <Col md = {3} >
                    <Button style={{ margin: '5vh 5vw 5vh 5vw' }} onClick={handleShow}>
                        Cadastrar novo Cartão
                    </Button>
        </Col>
        <Modal show={show} onHide={handleClose}>
                <Modal.Body className=" modal-content">
                    <Row className='justify-content-center' >
                       <h1  style={{fontSize:20,width:"auto",marginBottom:10}}>Cadastrar Cartão</h1>
                    </Row>

                    <Form onSubmit={cadastrarCartao}>
                        <Row className='justify-content-center'>
                            <InputTexto defaultValue={''} required={true} label={"Número do cartão"} placeholder={"XXXXXXXXXXXXXXXX"} controlId={"Número do cartão"} data={cardNumber} setData={setCardNumber} type='number' />
                            <InputTexto defaultValue={''} required={true} label={"Nome"} placeholder={""} controlId={"Nome"} data={holder} setData={setHolder} type="text" />
                            <InputTexto defaultValue={''} required={true} label={"CVV"} placeholder={"Ex: 000 "} controlId={"cvv"} data={cvv} setData={setCvv} type="number" />
                            <InputTexto defaultValue={''} required={true} label={"Mês de vencimento"} placeholder={"Ex: 08"} controlId={"mes"} data={monthExpirationDate} setData={setMonthExpirationDate} type="number" />
                            <InputTexto defaultValue={''} required={true} label={"Ano de vencimento"} placeholder={"Ex: 2030"} controlId={"ano"} data={yearExpirationDate} setData={setYearExpirationDate} type="number" />
                        </Row>
                        <Row className='justify-content-center'>
                        <Button className='Botão-Primario Texto-Branco' type='submit'>
                            Enviar
                        </Button>
                    </Row>
                    </Form>    
                </Modal.Body>
        </Modal>
        </>
    );
}