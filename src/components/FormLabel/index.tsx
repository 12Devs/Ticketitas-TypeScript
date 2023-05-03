import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

function FormLabel ({label}:{label : string}) {
    return (
        <>
            <div className="d-flex justify-content-start" style={{margin: '5px 0px 10px 0px'}}>
                <div className='rounded-top border-top border-start border-end border-dark'>
                    <h6 className='' style={{margin: '5px 10px 5px 10px'}}> { label } </h6>
                </div>
                <Container className="border-bottom border-dark">
                </Container>
            </div>
        </>
    )
}

export default FormLabel;