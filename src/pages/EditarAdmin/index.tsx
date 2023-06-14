import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import InputTexto from '../../components/InputTexto';
import FormLabel from '../../components/FormLabel';
import { api } from '../../services/api';
import NavBarGeral from '../../components/NavBarGeral';
import { useNavigate } from 'react-router-dom';

import '../pages.css';
import jwtDecode from 'jwt-decode';
import { Modal } from 'react-bootstrap';

export default function EditarAdmin() {
    const [userType, setUserType] = useState('');
    const [cpf, setCpf] = useState('undefined');
    const [nomeCompleto, SetnomeCompleto] = useState('undefined');
    const [primeiroNome, setprimeiroNome] = useState('undefined');
    const [sobrenome, setSobreome] = useState('undefined');
    const [telefone, setTelefone] = useState('undefined');
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
    const alterarSenha = (event: any) => {
        event.preventDefault();
    }

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
        
        api.get("user/administrator/",config).then((response)  => {
            console.log(response)
            SetnomeCompleto(response.data.AdministratorInfos.administrator.name);
            setEmail(response.data.AdministratorInfos.administrator.email)
            setTelefone(response.data.AdministratorInfos.administrator.phone)
            setCpf(response.data.AdministratorInfos.administrator.cpf);
            pegarSobrenome(nomeCompleto);
            pegarNome(nomeCompleto)
        });

        
    },[])

    const editarAdmin = (event: any) => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        };
        
        event.preventDefault();
        let nomeAdmin: any = {
            newName: `${primeiroNome} ${sobrenome}`, 
            tipo: userType,
            cpf
        }
        let telefoneAdmin: any = {
            newPhone: telefone,
            tipo: userType,
            cpf
        }

        api.post("user/administrator/update-name", nomeAdmin,config).then((response)=>{console.log(response)});
        api.post("user/adiministrator/update-phone", telefoneAdmin,config).then((response)=>{console.log(response)});

        navigate('/perfil');
    }

    return (
        <>
            <NavBarGeral />
            <Form style={{ minHeight: '75vh' }} onSubmit={editarAdmin}>
                <Container>

                    <Row>
                        <FormLabel label='Editar informações' />
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <InputTexto type="text" defaultValue={''} required={true} label={"Primeiro nome"} placeholder={primeiroNome} controlId={"inputPirmeiroNome"} data={primeiroNome} setData={setprimeiroNome} />
                        </Col>
                        <Col sm={6}>
                            <InputTexto type="text" defaultValue={''} required={true} label={"Sobrenome"} placeholder={sobrenome} controlId={"inputSobrenome"} data={sobrenome} setData={setSobreome} />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <InputTexto type="number" defaultValue={''} required={true} label={"Telefone"} placeholder={telefone} controlId={"telefone"} data={telefone} setData={setTelefone} />
                        </Col>
                        <Col sm={6}>
                            <InputTexto type="number" defaultValue={''} required={true} label={"CPF"} placeholder={cpf} controlId={"cpf"} data={cpf} setData={setCpf} />
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
                                            <InputTexto defaultValue={''} required={true} label={"Senha atual"} placeholder={""} controlId={"Senha atual"} data={senhaAtual} setData={setsenhaAtual} type='text' />
                                            <InputTexto defaultValue={''} required={true} label={"Nova senha"} placeholder={""} controlId={"Nova Senha"} data={novaSenha} setData={setnovaSenha} type="text" />
                                            <InputTexto defaultValue={''} required={true} label={"Confirmar nova senha"} placeholder={""} controlId={"Confirmar nova senha"} data={confirmarSenha} setData={setconfirmarSenha} type="text" />
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
