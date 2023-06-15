import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import FormLabel from '../../components/FormLabel';
import { useState } from 'react';
import React, { useEffect } from 'react';
import InputTexto from '../../components/InputTexto';
import { api } from '../../services/api';
import '../pages.css'
import NavBarGeral from '../../components/NavBarGeral';
import { useNavigate } from 'react-router-dom';

import { Modal } from 'react-bootstrap';

export default function EditarPromoter() {
    const [userType, setUserType] = useState('');
    const [cpf, setCpf] = useState('undefined');
    const [nomeCompleto, SetnomeCompleto] = useState('undefined');
    const [primeiroNome, setprimeiroNome] = useState('undefined');
    const [sobrenome, setSobreome] = useState('undefined');
    const [telefone, setTelefone] = useState('undefined');
    const [cep, setCep] = useState('undefined');
    const [cidade, setCidade] = useState('undefined');
    const [estado, setEstado] = useState('undefined');
    const [bairro, setBairro] = useState('undefined');
    const [rua, setRua] = useState('undefined');
    const [numero, setNumero] = useState('undefined');
    const [email, setEmail] = useState('undefined');
    const [show, setShow] = useState(false);
    const [senhaAtual, setsenhaAtual] = useState('');
    const [novaSenha, setnovaSenha] = useState('');
    const [confirmarSenha, setconfirmarSenha] = useState('');

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };

    const navigate = useNavigate();

    const refresh = () => window.location.reload();

    function pegarSobrenome(nomeCompleto: string) {
        var partesNome = nomeCompleto.split(' ');

        if (partesNome.length < 2) {
            setSobreome("")
        }
        else {
            let sobrenome = partesNome[partesNome.length - 2];
            setSobreome(sobrenome)
        }
    }
    function pegarNome(nomeCompleto: string) {

        var partesNome = nomeCompleto.split(' ');

        let sobrenome = partesNome[0];
        setprimeiroNome(sobrenome)
    }


    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        const user = localStorage.getItem('userType');
        if (user != null) {
            setUserType(user);
        }
        const cpfLocalStorage = localStorage.getItem('CPF');
        if (cpfLocalStorage != null) {
            setCpf(cpfLocalStorage);
        }


        api.get("user/promoter/", config).then((response) => {
            console.log(response)
            SetnomeCompleto(response.data.PromoterInfos.promoter.nome)
            setEmail(response.data.PromoterInfos.promoter.email)
            setTelefone(response.data.PromoterInfos.promoter.telefone)
            setCep(response.data.PromoterInfos.enderecoPromoter.cep)
            setEstado(response.data.PromoterInfos.enderecoPromoter.estado)
            setBairro(response.data.PromoterInfos.enderecoPromoter.bairro)
            setRua(response.data.PromoterInfos.enderecoPromoter.rua)
            setBairro(response.data.PromoterInfos.enderecoPromoter.bairro)
            setNumero(response.data.PromoterInfos.enderecoPromoter.numero)
            setCidade(response.data.PromoterInfos.enderecoPromoter.cidade)
            pegarSobrenome(nomeCompleto);
            pegarNome(nomeCompleto)
        });


    }, [])

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

    const editarPromoter = (event: any) => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };

        event.preventDefault();
        let nomePromoter: any = {
            newName: `${primeiroNome} ${sobrenome}`,
            tipo: userType,
            cpf
        }
        let telefonePromoter: any = {
            newPhone: telefone,
            tipo: userType,
            cpf
        }
        let enderecoPromoter: any = {
            cep,
            cidade,
            estado,
            bairro,
            rua,
            numero,
            tipo: userType,
        }

        api.post("user/promoter/update-address", enderecoPromoter, config).then((response) => { console.log(response) });
        api.post("user/promoter/update-name", nomePromoter, config).then((response) => { console.log(response) });
        api.post("user/promoter/update-phone", telefonePromoter, config).then((response) => { console.log(response) });

        navigate('/perfil');
    }

    const alterarSenha = (event: any) => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        
        event.preventDefault();
        let senha: any = {
            tipo: userType,
            cpf,
            passwordAuth: senhaAtual,
            newPassword: novaSenha,
            newPasswordConfirmation: confirmarSenha
        }
        api.post("user/promoter/update-password", senha,config).then((response)=>{console.log(response)});
        refresh()
    }


    return (
        <>
            <NavBarGeral />
            <Form style={{ minHeight: '75vh' }} onSubmit={editarPromoter}>
                <Container>
                    <Row >
                        <FormLabel label='Editar informações' />
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Primeiro nome"} placeholder={primeiroNome} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setprimeiroNome} />
                        </Col>
                        <Col sm={6}>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Sobrenome"} placeholder={sobrenome} controlId={"inputSobrenome"} data={sobrenome} setData={setSobreome} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <InputTexto type={'number'} defaultValue={''} required={true} label={"Telefone"} placeholder={telefone} controlId={"telefone"} data={telefone} setData={setTelefone} />
                        </Col>
                        <Col sm={6}>
                            <InputTexto type={'number'} defaultValue={''} required={true} label={"CPF/CNPJ"} placeholder={cpf} controlId={"cpfCnpj"} data={cpf} setData={setCpf} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <InputTexto type={'number'} defaultValue={''} required={true} label={"CEP"} placeholder={cep} controlId={"cep"} data={cep} setData={setCep} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={8}>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Cidade"} placeholder={cidade} controlId={"cidade"} data={cidade} setData={setCidade} />
                        </Col>
                        <Col sm={4}>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Estado"} placeholder={estado} controlId={"estado"} data={estado} setData={setEstado} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Bairro"} placeholder={bairro} controlId={"bairro"} data={bairro} setData={setBairro} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={8}>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Rua"} placeholder={rua} controlId={"rua"} data={rua} setData={setRua} />
                        </Col>
                        <Col sm={4}>
                            <InputTexto type={'text'} defaultValue={''} required={true} label={"Número"} placeholder={numero} controlId={"numero"} data={numero} setData={setNumero} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                            <InputTexto type='email' defaultValue={''} required={true} label={"Email"} placeholder={email} controlId={"email"} data={email} setData={setEmail} />
                        </Col>
                        <Col sm={4}>
                            <Button style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Terciário Texto-Azul' onClick={handleShow}>
                                Alterar senha
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Body className=" modal-content">
                                    <Row className='d-flex justify-content-center' >
                                        <h1 style={{ fontSize: 20 }}>Alterar senha</h1>
                                    </Row>

                                    <Form onSubmit={alterarSenha}>
                                        <Row className='justify-content-center'>
                                            <InputTexto defaultValue={''} required={true} label={"Senha atual"} placeholder={""} controlId={"Senha atual"} data={senhaAtual} setData={setsenhaAtual} type='password' />
                                            <InputTexto defaultValue={''} required={true} label={"Nova senha"} placeholder={""} controlId={"Nova Senha"} data={novaSenha} setData={setnovaSenha} type="password" />
                                            <InputTexto defaultValue={''} required={true} label={"Confirmar nova senha"} placeholder={""} controlId={"Confirmar nova senha"} data={confirmarSenha} setData={setconfirmarSenha} type="password" />
                                        </Row>
                                        <Row className='justify-content-center'>
                                            <Button className='Botão-Primario Texto-Branco' type='submit'>
                                                Confirmar alteração
                                            </Button>
                                        </Row>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        </Col>
                    </Row>

                    <Row className='d-flex justify-content-center'>
                        <Button href='/' style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Secundario Texto-Azul'>
                            Cancelar
                        </Button>
                        <Button style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Primario Texto-Branco' type="submit" >
                            Confirmar alterações
                        </Button>
                    </Row>

                </Container>
            </Form>
        </>
    )
}