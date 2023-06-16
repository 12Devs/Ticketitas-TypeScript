import React, { useEffect, useState } from "react";
import InputTexto from "../../components/InputTexto";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import FormLabel from "../../components/FormLabel";
import { api } from "../../services/api";
import { useLocation } from "react-router-dom";
import NavBarGeral from "../../components/NavBarGeral";

export default function EditarEvento() {

    const location = useLocation();
    const props = location.state;


    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataEvento, setDataEvento] = useState('');
    const [status, setStatus] = useState(true);
    const [quantPista, setQuantPista] = useState('');
    const [quantStage, setQuantStage] = useState('');
    const [quantVip, setQuantVip] = useState('');
    const [valorPista, setValorPista] = useState('');
    const [valorStage, setValorStage] = useState('');
    const [valorVip, setValorVip] = useState('');
    const [porcentagemMeia, setPorcentagemMeia] = useState('');
    const [porcentagemGratis, setPorcentagemGratis] = useState('');
    const [hora, setHora] = useState('');

    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');

    useEffect(() => {
        if (cep.length == 8 && !isNaN(parseInt(cep))) {

            api.get(`/endereco/${cep}`).then((endereco) => {
                setCidade(endereco.data.localidade);
                setEstado(endereco.data.uf);
                setBairro(endereco.data.bairro);
                setRua(endereco.data.logradouro);
            });
        }
    }, [cep]);

    useEffect(() => {

        api.get(`/event/${props.idEvento}`).then((response) => {
            console.log(response);
            setNome(response.data.eventInfos.event.nome);
            setDescricao(response.data.eventInfos.event.descricao);
            //setDataHora(response.data.eventInfos.event.dataEvento);
            setCep(response.data.eventInfos.enderecoEvent.cep);
            setRua(response.data.eventInfos.enderecoEvent.rua);
            setBairro(response.data.eventInfos.enderecoEvent.bairro);
            setNumero(response.data.eventInfos.enderecoEvent.numero);
            setCidade(response.data.eventInfos.enderecoEvent.cidade);
            setEstado(response.data.eventInfos.enderecoEvent.estado);
            setQuantPista(response.data.eventInfos.event.quantPista);
            setQuantStage(response.data.eventInfos.event.quantStage);
            setQuantVip(response.data.eventInfos.event.quantVip);
            setValorPista(response.data.eventInfos.event.valorPista);
            setValorStage(response.data.eventInfos.event.valorStage);
            setPorcentagemGratis(response.data.eventInfos.event.porcentagemMeia);
            setPorcentagemGratis(response.data.eventInfos.event.porcentagemGratis);

        });
    }, []);
    
    const editarEvento = (event: any) => {
        event.preventDefault();

        var promoterCpf = 0;
        if (localStorage.getItem("CPF") !== null) {
            var promoterCpfString = localStorage.getItem("CPF");
            promoterCpf = parseInt(promoterCpfString !== null ? promoterCpfString : "0");
        }

        var dadosEvento: any = {
            promoterCpf,
            nome,
            descricao,
            dataEvento,
            status,
            quantPista,
            quantStage,
            quantVip,
            valorPista,
            valorStage,
            valorVip,
            porcentagemMeia,
            porcentagemGratis,
            cep,
            cidade,
            estado,
            bairro,
            rua,
            numero
        }
    }

    return (
        <>
            <NavBarGeral />
            <Form style={{ minHeight: '75vh' }} onSubmit={editarEvento}>
                <Container>


                    <Row >
                        <FormLabel label='Editar Evento' />
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <InputTexto type='text' defaultValue={''} required={true} label={"Nome do evento"} placeholder={nome} controlId={"Nome"} data={nome} setData={setNome} />
                        </Col>
                        <Col sm={6}>
                            <InputTexto type='date' defaultValue={''} required={true} label={"Data do evento"} placeholder={dataEvento} controlId={"Data"} data={dataEvento} setData={setDataEvento} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12}>
                            <InputTexto type='text' defaultValue={''} required={true} label={"Descrição do evento"} placeholder={descricao} controlId={"Descrição"} data={descricao} setData={setDescricao} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={4}>
                            <InputTexto type='number' defaultValue={''} required={true} label={"Quantidade de ingressos - Pista"} placeholder={quantPista} controlId={"Quantidade pista"} data={quantPista} setData={setQuantPista} />
                        </Col>
                        <Col sm={4}>
                            <InputTexto type='number' defaultValue={''} required={true} label={"Quantidade de ingressos - Stage"} placeholder={quantStage} controlId={"Quantidade stage"} data={quantStage} setData={setQuantStage} />
                        </Col>
                        <Col sm={4}>
                            <InputTexto type='number' defaultValue={''} required={true} label={"Quantidade de ingressos - VIP"} placeholder={quantVip} controlId={"quantidade vip"} data={quantVip} setData={setQuantVip} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={4}>
                            <InputTexto type='number' defaultValue={''} required={true} label={"Valor Pista"} placeholder={"R$ " + { valorPista }} controlId={"Valor pista"} data={valorPista} setData={setValorPista} />
                        </Col>
                        <Col sm={4}>
                            <InputTexto type='number' defaultValue={''} required={true} label={"Valor Backstage"} placeholder={"R$ " + { valorStage }} controlId={"Valor stage"} data={valorStage} setData={setValorStage} />
                        </Col>
                        <Col sm={4}>
                            <InputTexto type='Number' defaultValue={''} required={true} label={"Valor VIP"} placeholder={"R$" + { valorVip }} controlId={"Valor vip"} data={valorVip} setData={setValorVip} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={2}>
                            <InputTexto type='time' defaultValue={''} required={true} label={"Horário"} placeholder={hora} controlId={"horario"} data={hora} setData={setHora} />
                        </Col>
                        <Col sm={2}>
                            <Form.Group className="mb-3">
                                <Row className='me-1 ms-1 mt-4'>
                                    <Form.Check className="text-nowrap" type="checkbox" label="É um evento ativo?" checked={status} onChange={e => { setStatus(!status) }} />
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <InputTexto type='number' defaultValue={''} required={true} label={"Porcentagem de ingressos meia"} placeholder={"(Minimo de 40%)"} controlId={"Porcentagem meia"} data={porcentagemMeia} setData={setPorcentagemMeia} />
                        </Col>
                        <Col sm={6}>
                            <InputTexto type='number' defaultValue={''} required={true} label={"Porcentagem de ingressos grátis"} placeholder={"%"} controlId={"Porcentagem gratis"} data={porcentagemGratis} setData={setPorcentagemGratis} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <InputTexto type='number' defaultValue={''} required={true} label={"CEP"} placeholder={cep} controlId={"cep"} data={cep} setData={setCep} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={8}>
                            <InputTexto type='text' defaultValue={''} required={true} label={"Cidade"} placeholder={cidade} controlId={"cidade"} data={cidade} setData={setCidade} />
                        </Col>
                        <Col sm={4}>
                            <InputTexto type='text' defaultValue={''} required={true} label={"Estado"} placeholder={estado} controlId={"estado"} data={estado} setData={setEstado} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <InputTexto type='text' defaultValue={''} required={true} label={"Bairro"} placeholder={bairro} controlId={"bairro"} data={bairro} setData={setBairro} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={8}>
                            <InputTexto type='text' defaultValue={''} required={true} label={"Rua"} placeholder={rua} controlId={"rua"} data={rua} setData={setRua} />
                        </Col>
                        <Col sm={4}>
                            <InputTexto type='text' defaultValue={''} required={true} label={"Número"} placeholder={numero} controlId={"numero"} data={numero} setData={setNumero} />
                        </Col>
                    </Row>

                    <Row className='d-flex justify-content-center'>
                        <Button href='/' style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Secundario Texto-Azul'>
                            Cancelar
                        </Button>
                        <Button style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Primario Texto-Branco' type="submit">
                            Confirmar
                        </Button>
                    </Row>

                </Container>
            </Form>
        </>
    );
}