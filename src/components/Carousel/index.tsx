import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

function CarouselPrincipal() {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="row">
          <div className="col-md-6">
            <img
              className="d-block w-100"
              src="img/exemploHeaderEvento.png"
              alt="First slide"
            />
          </div>
          <div className="col-md-6">
            <Carousel.Caption as="div" className="text-start">
              <h3>Primeiro</h3>
              <p>Evento de samba.</p>
            </Carousel.Caption>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="row">
          <div className="col-md-6">
            <img
              className="d-block w-100"
              src="img/exemploHeaderEvento.png"
              alt="Second slide"
            />
          </div>
          <div className="col-md-6">
            <Carousel.Caption as="div" className="text-start">
              <h3>Segundo Slide</h3>
              <p>Evento de sertanejo.</p>
            </Carousel.Caption>
          </div>
        </div>
      </Carousel.Item>
      {/* Adicione mais itens de carrossel, se necessário */}
    </Carousel>
  );
}

export default CarouselPrincipal;