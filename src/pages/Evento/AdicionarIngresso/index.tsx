import "../../../components/Texto/Texto.css";
import "../../../components/Button/Button.css";
import "./AdicionarIngresso.css";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import ModalLoginCompra from "../ModalLoginCompra";
import { api } from "../../../services/api";
import { Navigate, useNavigate } from "react-router-dom";

export default function AdicionarIngresso({ event }: { event: any }) {
  const navigate = useNavigate();

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const [quantidadePistaInteira, setQuantidadePistaInteira] = useState(0);
  const [quantidadePistaMeia, setQuantidadePistaMeia] = useState(0);

  const [quantidadeStageInteira, setQuantidadeStageInteira] = useState(0);
  const [quantidadeStageMeia, setQuantidadeStageMeia] = useState(0);

  const [quantidadeVipInteira, setQuantidadeVipInteira] = useState(0);
  const [quantidadeVipMeia, setQuantidadeVipMeia] = useState(0);

  const [quantidadeFree, setQuantidadeFree] = useState(0);

  const [valorTotal, setValorTotal] = useState(0);

  const [show, setShow] = useState(false);

  const [userType, setUserType] = useState("");

  const [status, setStatus] = useState(false);

  function subtrai(valor: number, setValor: Function) {
    if (valor > 0) {
      setValor(valor - 1);
    }
  }

  function soma(valor: number, setValor: Function, valorLimite: number) {
    if (valor < valorLimite) {
      setValor(valor + 1);
    }
  }

  const handleFinalizar = () => {
    var quantidadeTotalEscolhida = quantidadePistaInteira + quantidadePistaMeia + quantidadeStageInteira + quantidadeStageMeia + quantidadeVipInteira + quantidadeVipMeia + quantidadeFree;

    if (quantidadeTotalEscolhida == 0){
      console.log("Escolha ao menos um ingresso para proseguir")
    } else {
      var dados = {
        eventId: event.id,
        amountSale: valorTotal,
        pistaAmount: quantidadePistaInteira,
        pistaAmountHalf: quantidadePistaMeia,
        stageAmount: quantidadeStageInteira,
        stageAmountHalf: quantidadeStageMeia,
        vipAmount: quantidadeVipInteira,
        vipAmountHalf: quantidadeVipMeia,
        freeAmount: quantidadeFree,
        walletValue: 2.0,
      };
  
      // colocar o navigate
  
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("userType");
      if (token != null) {
        var dadosToken = jwtDecode(token);
        if (dadosToken != null) {
        }
      } else {
        localStorage.setItem("dadosCarrinho", JSON.stringify(dados));
        setShow(true);
      }
      if (user != null) {
        if (user == "cliente") {
          api.post("sale/checkout", dados, config).then((response) => {
            let idCart = response.data.checkout.id;
            navigate(`/checkout/${idCart}`);
          });
  
          console.log("cliente logado");
        } else {
          console.log("login nao autorizado");
        }
      }
    }
    
  };

  function renderModalLoginCompra() {
    return (
      <>
        <ModalLoginCompra data={show} setData={setShow} />
      </>
    );
  }


  function renderPistaInteira() {
    if (event == null) {
      return null;
    } else {
      if (parseInt(event.quantPista) > 0) {
        return (
          <Container>
            <Row>
              <Col sm={8} className="">
                <h4 className="text-start Texto-Pequeno Texto-Preto fw-bold">
                  Inteira - Pista
                </h4>
                <h5 className="text-start Texto-Pequeno Texto-Cinza pb-2 fw-light">
                  R$ {event.valorPista}
                </h5>
              </Col>

              <Col
                sm={4}
                className="d-flex justify-content-between align-items-center">
                
                <button className="border botao d-flex justify-content-center noPaddingNoMargin" 
                onClick={() =>
                    subtrai(
                        quantidadePistaInteira,
                        setQuantidadePistaInteira)}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 -4 16 16">
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                    </svg>
                </button>

                {quantidadePistaInteira}

                <button className="border botao d-flex justify-content-center noPaddingNoMargin" 
                onClick={() =>
                    soma(
                        quantidadePistaInteira,
                        setQuantidadePistaInteira,
                        parseInt(event.quantPista)
                      )}>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 -4 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                </button>

              </Col>
            </Row>
            <hr></hr>
          </Container>
        );
      } else {
        return false;
      }
    }
  }

  function renderPistaMeia() {
    if (event == null) {
      return null;
    } else {
      if (parseInt(event.quantPista) > 0) {
        var valorPistaMeia = (parseFloat(event.valorPista) / 2).toFixed(2);

        return (
          <Container>
            <Row>
              <Col sm={8} className="">
                <h4 className="text-start Texto-Pequeno Texto-Preto fw-bold">
                  Meia - Pista
                </h4>
                <h5 className="text-start Texto-Pequeno Texto-Cinza pb-2 fw-light">
                  R$ {valorPistaMeia}
                </h5>
              </Col>

              <Col
                sm={4}
                className="d-flex justify-content-between align-items-center"
              >

                <button className="border botao d-flex justify-content-center noPaddingNoMargin" 
                onClick={() =>
                    subtrai(quantidadePistaMeia, setQuantidadePistaMeia)}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 -4 16 16">
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                    </svg>
                </button>

                {quantidadePistaMeia}

                <button className="border botao d-flex justify-content-center noPaddingNoMargin" 
                onClick={() =>
                    soma(
                        quantidadePistaMeia,setQuantidadePistaMeia, parseInt(event.quantPista)
                      )}>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 -4 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                </button>
              </Col>
            </Row>
            <hr></hr>
          </Container>
        );
      } else {
        return false;
      }
    }
  }

  function renderStageInteira() {
    if (event == null) {
      return null;
    } else {
      if (parseInt(event.quantStage) > 0) {
        return (
          <Container>
            <Row>
              <Col sm={8} className="">
                <h4 className="text-start Texto-Pequeno Texto-Preto fw-bold">
                  Inteira - Stage
                </h4>
                <h5 className="text-start Texto-Pequeno Texto-Cinza pb-2 fw-light">
                  R$ {event.valorStage}
                </h5>
              </Col>

              <Col
                sm={4}
                className="d-flex justify-content-between align-items-center"
              >

                <button className="border botao d-flex justify-content-center noPaddingNoMargin" 
                onClick={() =>
                    subtrai(quantidadeStageInteira, setQuantidadeStageInteira)}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 -4 16 16">
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                    </svg>
                </button>

                {quantidadeStageInteira}

                <button className="border botao d-flex justify-content-center noPaddingNoMargin" 
                onClick={() =>
                    soma(
                        quantidadeStageInteira,
                      setQuantidadeStageInteira,
                      parseInt(event.quantStage)
                      )}>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 -4 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                </button>


                
              </Col>
            </Row>
            <hr></hr>
          </Container>
        );
      } else {
        return false;
      }
    }
  }

  function renderStageMeia() {
    if (event == null) {
      return null;
    } else {
      if (parseInt(event.quantStage) > 0) {
        var valorStageMeia = (parseFloat(event.valorStage) / 2).toFixed(2);

        return (
          <Container>
            <Row>
              <Col sm={8} className="">
                <h4 className="text-start Texto-Pequeno Texto-Preto fw-bold">
                  Meia - Stage
                </h4>
                <h5 className="text-start Texto-Pequeno Texto-Cinza pb-2 fw-light">
                  R$ {valorStageMeia}
                </h5>
              </Col>

              <Col
                sm={4}
                className="d-flex justify-content-between align-items-center"
              >

                <button className="border botao d-flex justify-content-center noPaddingNoMargin" 
                onClick={() =>
                    subtrai(quantidadeStageMeia, setQuantidadeStageMeia)}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 -4 16 16">
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                    </svg>
                </button>

                {quantidadeStageMeia}

                <button className="border botao d-flex justify-content-center noPaddingNoMargin" 
                onClick={() =>
                    soma(
                        quantidadeStageMeia,
                        setQuantidadeStageMeia,
                        parseInt(event.quantStage)
                      )}>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 -4 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                </button>

              </Col>
            </Row>
            <hr></hr>
          </Container>
        );
      } else {
        return false;
      }
    }
  }

  function renderVipInteira() {
    if (event == null) {
      return null;
    } else {
      if (parseInt(event.quantVip) > 0) {
        return (
          <Container>
            <Row>
              <Col sm={8} className="">
                <h4 className="text-start Texto-Pequeno Texto-Preto fw-bold">
                  Inteira - Vip
                </h4>
                <h5 className="text-start Texto-Pequeno Texto-Cinza pb-2 fw-light">
                  R$ {event.valorVip}
                </h5>
              </Col>

              <Col
                sm={4}
                className="d-flex justify-content-between align-items-center"
              >

                <button className="border botao d-flex justify-content-center noPaddingNoMargin" 
                onClick={() =>
                    subtrai(quantidadeVipInteira, setQuantidadeVipInteira)}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 -4 16 16">
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                    </svg>
                </button>

                {quantidadeVipInteira}

                <button className="border botao d-flex justify-content-center noPaddingNoMargin" 
                onClick={() =>
                    soma(
                        quantidadeVipInteira,
                      setQuantidadeVipInteira,
                      parseInt(event.quantVip)
                      )}>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 -4 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                </button>

              </Col>
            </Row>
            <hr></hr>
          </Container>
        );
      } else {
        return false;
      }
    }
  }

  function renderVipMeia() {
    if (event == null) {
      return null;
    } else {
      if (parseInt(event.quantVip) > 0) {
        var valorVipMeia = (parseFloat(event.valorVip) / 2).toFixed(2);

        return (
          <Container>
            <Row>
              <Col sm={8} className="">
                <h4 className="text-start Texto-Pequeno Texto-Preto fw-bold">
                  Meia - Vip
                </h4>
                <h5 className="text-start Texto-Pequeno Texto-Cinza pb-2 fw-light">
                  R$ {valorVipMeia}
                </h5>
              </Col>

              <Col
                sm={4}
                className="d-flex justify-content-between align-items-center"
              >



            <button className="border botao d-flex justify-content-center noPaddingNoMargin" 
                onClick={() =>
                    subtrai(quantidadeVipMeia, setQuantidadeVipMeia)}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 -4 16 16">
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                    </svg>
                </button>

                {quantidadeVipMeia}

                <button className="border botao d-flex justify-content-center noPaddingNoMargin" 
                onClick={() =>
                    soma(
                        quantidadeVipMeia,
                        setQuantidadeVipMeia,
                      parseInt(event.quantVip)
                      )}>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 -4 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                </button>

              </Col>
            </Row>
            <hr></hr>
          </Container>
        );
      } else {
        return false;
      }
    }
  }

  function renderFree() {
    if (event == null) {
      return null;
    } else {
      if (parseFloat(event.porcentagemGratis) > 0) {
        // Aqui deve ser somado a quantidade total de ingressos e extrair a porcentagem certa.
        var quantidadeTotalFree = "0";

        return (
          <Container>
            <Row>
              <Col sm={8} className="">
                <h4 className="text-start Texto-Pequeno Texto-Preto fw-bold">
                  Gratis
                </h4>
                <h5 className="text-start Texto-Pequeno Texto-Cinza pb-2 fw-light">
                  R$ 0
                </h5>
              </Col>

              <Col
                sm={4}
                className="d-flex justify-content-between align-items-center"
              >


                <button className="border botao d-flex justify-content-center noPaddingNoMargin" 
                onClick={() =>
                    subtrai(quantidadeFree, setQuantidadeFree)}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 -4 16 16">
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                    </svg>
                </button>

                {quantidadeFree}

                <button className="border botao d-flex justify-content-center noPaddingNoMargin" 
                onClick={() =>
                    soma(
                        quantidadeFree,
                        setQuantidadeFree,
                        parseInt(quantidadeTotalFree)
                      )}>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 -4 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                </button>

              </Col>
            </Row>
            <hr></hr>
          </Container>
        );
      } else {
        return false;
      }
    }
  }

  function somaTotal() {
    if (event == null) {
      return 0;
    } else {
      var valorPistaMeia = (parseFloat(event.valorPista) / 2).toFixed(2);
      var valorStageMeia = (parseFloat(event.valorStage) / 2).toFixed(2);
      var valorVipMeia = (parseFloat(event.valorVip) / 2).toFixed(2);

      let valorPI = parseFloat(event.valorPista) * quantidadePistaInteira;
      let valorPM = parseFloat(valorPistaMeia) * quantidadePistaMeia;

      let valorVI = parseFloat(event.valorVip) * quantidadeVipInteira;
      let valorVM = parseFloat(valorVipMeia) * quantidadeVipMeia;

      let valorSI = parseFloat(event.valorStage) * quantidadeStageInteira;
      let valorSM = parseFloat(valorStageMeia) * quantidadeStageMeia;

      var total = valorPI + valorPM + valorVI + valorVM + valorSM + valorSI;
      return total;
    }
  }

  function renderOpcoesGerais(){
    if (event == null) {
      return null;
    } else {

      var totalIngresso = parseFloat(event.porcentagemGratis) + parseInt(event.quantStage) + parseInt(event.quantPista) + parseInt(event.quantVip);

      if (totalIngresso == 0){
        return (
          <Modal.Dialog className="modal-dialog-scrollable">
            <Modal.Body>
              <Container>
                <Row>
                  <Col sm={8}>
                    <h4 className="text-start Texto-Pequeno Texto-Preto fw-bold">
                      Ingressos esgotados!
                    </h4>
                    
                  </Col>
                </Row>
            </Container>
            </Modal.Body>
          </Modal.Dialog>

          
        )
      } else{
        return (
          <Modal.Dialog className="modal-dialog-scrollable">
            <Modal.Body>
              {renderPistaInteira()}
              {renderPistaMeia()}
              {renderStageInteira()}
              {renderStageMeia()}
              {renderVipInteira()}
              {renderVipMeia()}
              {renderFree()}
            </Modal.Body>

            <Modal.Footer className="justify-content-center">
              <Row className="pb-2">
                <h5 className="text-start Texto-Preto Texto-MuitoPequeno">
                  Total
                </h5>
                <h2 className="text-start fw-bold Texto-Preto Texto-Grande">
                  R$ {valorTotal.toFixed(2)}
                </h2>
              </Row>
              <Row>
                <Button className="Botão-Primario" onClick={handleFinalizar}>
                  Finalizar Compras
                </Button>
                {renderModalLoginCompra()}
              </Row>
            </Modal.Footer>
          </Modal.Dialog>
        )
          
      }
    }
  }

  useEffect(() => {
    var total = somaTotal();
    setValorTotal(total);
  }, [
    quantidadePistaInteira,
    quantidadePistaMeia,
    quantidadeStageInteira,
    quantidadeStageMeia,
    quantidadeVipInteira,
    quantidadeVipMeia,
  ]);

  // useEffect(()=>{

  //     const dadosCarrinhoStr = localStorage.getItem('dadosCarrinho');

  //     if(dadosCarrinhoStr != null){
  //         const dadosCarrinhoObj = JSON.parse(dadosCarrinhoStr);
  //         console.log("Dados do carrinho:", dadosCarrinhoObj);

  //         console.log("Total no LS: ",dadosCarrinhoObj.valorTotal);
  //         setQuantidadePistaInteira(dadosCarrinhoObj.quantidadePistaInteira);
  //         setQuantidadePistaMeia(dadosCarrinhoObj.quantidadePistaMeia);
  //         setQuantidadeStageInteira(dadosCarrinhoObj.quantidadeStageInteira);
  //         setQuantidadeStageMeia(dadosCarrinhoObj.quantidadeStageMeia);
  //         setQuantidadeVipInteira(dadosCarrinhoObj.quantidadeVipInteira);
  //         setQuantidadeVipMeia(dadosCarrinhoObj.quantidadeVipMeia);

  //         // setValorTotal()

  //         let novoTotal = dadosCarrinhoObj.valorTotal;

  //         setValorTotal(novoTotal);
  //         // console.log("Total", novoTotal);

  //     }
  //     localStorage.removeItem('dadosCarrinho');

  // },[])

  return (
    <>
      <h4 className="Texto-Preto Texto-Medio text-start fw-bold">Ingressos</h4>

      <div className="Modal-Ingresos p-3">
        {renderOpcoesGerais()}
      </div>
    </>
  );
}
