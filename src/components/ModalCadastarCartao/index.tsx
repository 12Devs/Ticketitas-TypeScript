import React, { useState } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import InputTexto from "../InputTexto";
import { api } from "../../services/api";

export default function ModalCadastrarCartao(){
    const [show, setShow] = useState(false);
    const [cvv, setCvv] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [monthExpirationDate, setMonthExpirationDate] = useState('');
    const [yearExpirationDate, setYearExpirationDate] = useState('');
    const [holder, setHolder] = useState('');


    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };
    const cadastrarCartao = (event: any) => {
        event.preventDefault();
        var data: any = {
            cvv,
            cardNumber,
            monthExpirationDate,
            yearExpirationDate,
        }
        api.post("user/client/card",data);
    }
    return(
        <>
        <Col md = {3}>
                    <Button style={{ margin: '5vh 5vw 5vh 5vw' }} onClick={handleShow}>
                        Cadastrar novo Cartão
                    </Button>
        </Col>
        <Modal show={show} onHide={handleClose}>
                <Modal.Body className=" modal-content">
                    <Row className='d-flex justify-content-center' >
                       <h1  style={{fontSize:20}}>Cadastrar Cartão</h1>
                    </Row>

                    <Form onSubmit={cadastrarCartao}>
                        <Row className='justify-content-center'>
                            <InputTexto defaultValue={''} required={true} label={"Número do cartão"} placeholder={"XXXX XXXX XXXX XXXX"} controlId={"Número do cartão"} data={cardNumber} setData={setCardNumber} type='text' />
                            <InputTexto defaultValue={''} required={true} label={"Nome"} placeholder={""} controlId={"Nome"} data={holder} setData={setHolder} type="text" />
                            <InputTexto defaultValue={''} required={true} label={"CVV"} placeholder={""} controlId={"cvv"} data={cvv} setData={setCvv} type="text" />
                            <InputTexto defaultValue={''} required={true} label={"Mês de vencimento"} placeholder={""} controlId={"mes"} data={monthExpirationDate} setData={setMonthExpirationDate} type="text" />
                            <InputTexto defaultValue={''} required={true} label={"Ano de vencimento"} placeholder={""} controlId={"ano"} data={yearExpirationDate} setData={setYearExpirationDate} type="text" />
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