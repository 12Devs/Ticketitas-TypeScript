import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import React, { useEffect } from 'react';
import InputTexto from '../../components/InputTexto';
import FormLabel from '../../components/FormLabel';
import NavBarGeral from '../../components/NavBarGeral';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

import '../pages.css';
import '../../components/Texto/Texto.css';
import '../../components/Button/Button.css';
import jwtDecode from 'jwt-decode';



export default function EditarCliente() {
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
    const [cardName, setCardName] = useState('Matheus Mota Santos');
    const [cardNumber, setcardNumber] = useState('1234567832324545');
    const [cardNumberFour, setcardNumberFour] = useState('');
    const [saldo, setSaldo] = useState('0');

    const navigate = useNavigate();

    function pegarSobrenome(nomeCompleto: string) {
        var partesNome = nomeCompleto.split(' ');

        if (partesNome.length < 2) {
            setSobreome("")
        }
        else{
            let sobrenome = partesNome[partesNome.length - 2];
            setSobreome(sobrenome)
        }
      }
    function pegarNome(nomeCompleto: string) {
        
        var partesNome = nomeCompleto.split(' ');

        let sobrenome = partesNome[0];
        setprimeiroNome(sobrenome)
      }
    
      function pegarUltimosQuatroDigitos(numero: string) {
        let ultimosQuatroDigitos = numero.slice(-4);
        setcardNumberFour(ultimosQuatroDigitos);
      }

    useEffect(()=>{
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        const user = localStorage.getItem('userType');
        if(user != null){
            setUserType(user);
        }
        const cpfLocalStorage = localStorage.getItem('CPF');
        if(cpfLocalStorage != null){
            setCpf(cpfLocalStorage);
        }
        
        
        api.get("user/client/",config).then((response)  => {
            console.log(response)
            SetnomeCompleto(response.data.ClientInfos.client.nome);
            setEmail(response.data.ClientInfos.client.email);
            setSaldo(response.data.ClientInfos.client.saldo);
            setCpf(response.data.ClientInfos.client.cpf);
            setTelefone(response.data.ClientInfos.client.telefone);
            setCep(response.data.ClientInfos.enderecoClient.cep);
            setEstado(response.data.ClientInfos.enderecoClient.estado)
            setBairro(response.data.ClientInfos.enderecoClient.bairro)
            setRua(response.data.ClientInfos.enderecoClient.rua)
            setBairro(response.data.ClientInfos.enderecoClient.bairro)
            setNumero(response.data.ClientInfos.enderecoClient.numero)
            setCidade(response.data.ClientInfos.enderecoClient.cidade)
            pegarUltimosQuatroDigitos(cardNumber)
            pegarSobrenome(nomeCompleto);
            pegarNome(nomeCompleto)
        });

        
    },[])

    useEffect(() => {
        
        if(cep.length == 8 && !isNaN(parseInt(cep))){
            
            api.get(`/endereco/${cep}`).then((endereco) => {
                setCidade(endereco.data.localidade);
                setEstado(endereco.data.uf);
                setBairro(endereco.data.bairro);
                setRua(endereco.data.logradouro);
            });
        }
    }, [cep]);

    const editarCliente = (event: any) => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        
        event.preventDefault();
        let nomeCliente: any = {
            newName: `${primeiroNome} ${sobrenome}`, 
            tipo: userType,
            cpf
        }
        let telefoneCliente: any = {
            newPhone: telefone,
            tipo: userType,
            cpf
        }
        let enderecoCliente: any = {
            cep,
            cidade,
            estado,
            bairro,
            rua,
            numero,
            tipo: userType,
        }
        
        api.post("user/client/update-address", enderecoCliente,config).then((response)=>{console.log(response)});
        api.post("user/client/update-name", nomeCliente,config).then((response)=>{console.log(response)});
        api.post("user/client/update-phone", telefoneCliente,config).then((response)=>{console.log(response)});

        navigate('/perfil');
    }

    return (
        <>
            <NavBarGeral />
            <Form style={{minHeight: '75vh'}} onSubmit={editarCliente}>
                <Container>

                <Row >
                    <FormLabel label='Editar informações' />
                </Row>

                <Row>
                    <Col sm={6}>
                        <InputTexto type='text' defaultValue={''} required={true} label={"Primeiro nome"} placeholder={primeiroNome} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setprimeiroNome} />
                    </Col>
                    <Col sm={6}>
                        <InputTexto type='text' defaultValue={''} required={true} label={"Sobrenome"} placeholder={sobrenome} controlId={"inputSobrenome"} data={sobrenome} setData={setSobreome} />
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <InputTexto type='number' defaultValue={''} required={true} label={"Telefone"} placeholder={telefone} controlId={"telefone"} data={telefone} setData={setTelefone} />
                    </Col>
                    <Col sm={6}>
                        <InputTexto type='number' defaultValue={''} required={true} label={"CPF"} placeholder={cpf} controlId={"cpf"} data={cpf} setData={setCpf} />
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

                <Row>
                    <Col sm={8}>
                        <InputTexto type='email' defaultValue={''} required={true} label={"Email"} placeholder={email} controlId={"email"} data={email} setData={setEmail} />
                    </Col>
                    <Col sm={4}>
                        <Button href='/' style={{ margin: '5vh 5vw 5vh 5vw' }} className='Botão-Terciário Texto-Azul'>
                            Alterar senha
                        </Button>
                    </Col>
                </Row>

                    <Row className='d-flex justify-content-center'>
                            <Button href='/' style={{margin: '5vh 5vw 5vh 5vw'}} className='Botão-Secundario Texto-Azul'>
                                Cancelar
                            </Button>
                            <Button style={{margin: '5vh 5vw 5vh 5vw'}} className='Botão-Primario Texto-Branco' type="submit">
                                Confirmar alterações
                            </Button>
                    </Row>
                </Container>
            </Form>
        </>
    )
}