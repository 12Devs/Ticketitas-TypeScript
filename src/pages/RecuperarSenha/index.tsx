import Form from 'react-bootstrap/Form';
import Footer from '../../components/Footer';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { MouseEventHandler, useState } from 'react';
import InputTexto from '../../components/InputTexto';
import '../pages.css';

import {useNavigate } from 'react-router-dom';

export default function RecuperarSenha(){
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [novaSenhaConfirmacao, setNovaSenhaConfirmacao] = useState('');
    const [mensagem, setMensagem] = useState(false); //Boleano que define a exibição da mensagem de erro
    const navigate = useNavigate(); //Objeto pra navegar para outras páginas
    
    const atualizarSenha = (event: any) => {
        event.preventDefault();
        var dadosSenha: any = {
            senhaAtual,
            novaSenha,
            novaSenhaConfirmacao
        }
        
        // Limpa a mensagem
        setMensagem(false);

        if (novaSenha == novaSenhaConfirmacao) {
            // Colocar chamada pro backend de atualizar a senha

            navigate('/');
        } else {
            setMensagem(true);
        }
        
    }

    function mudarRota(rota: string) {
        navigate(rota); 
    }

    return (
        <>
            <Form style={{minHeight: '75vh'}} onSubmit={atualizarSenha} className='mainContent'>
                <Container>
                    <Row className='border-bottom border-dark mt-3'>
                        <p className='Texto-Medio Texto-Preto'>Alterar Senha</p>
                    </Row>

                    <Row className='mt-3 d-flex justify-content-center'>
                        <Col sm={4}>
                            <InputTexto type="password" defaultValue={''} required={true} label={"Senha atual"} placeholder={"Insira a senha atual"} controlId={"inputSenhaAtual"} data={senhaAtual} setData={setSenhaAtual} />
                        </Col>
                    </Row>
                    <Row className='mt-3 d-flex justify-content-center'>
                        <Col sm={4}>
                            <InputTexto type="password" defaultValue={''} required={true} label={"Nova senha"} placeholder={"Insira a nova senha"} controlId={"inputNovaSenha"} data={novaSenha} setData={setNovaSenha} />
                        </Col>
                    </Row>
                    <Row className='mt-3 d-flex justify-content-center'>
                        <Col sm={4}>
                            <InputTexto type="password" defaultValue={''} required={true} label={"Repita a nova senha"} placeholder={"Insira a senha novamente"} controlId={"inputNovaSenhaAgain"} data={novaSenhaConfirmacao} setData={setNovaSenhaConfirmacao} />
                        </Col>
                    </Row>

                    <Row className='mt-3 '>
                        <Alert style={{width: 'fit-content'}} show={mensagem} variant="danger">
                            <p>As senhas não coincidem!</p>
                        </Alert>
                    </Row>
                    
                    <Row className='d-flex justify-content-center'>
                            <Button onClick={() => mudarRota('/')} style={{margin: '5vh 5vw 5vh 5vw'}} className='Botão-Secundario Texto-Azul'>
                                Cancelar
                            </Button>
                            <Button style={{margin: '5vh 5vw 5vh 5vw'}} className='Botão-Primario Texto-Branco' type="submit">
                                Confirmar
                            </Button>
                    </Row>
                </Container>
            </Form>
        </> 
    )
}