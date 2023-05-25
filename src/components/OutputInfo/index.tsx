import { Alert, Container, Form, Row, Col,Image } from 'react-bootstrap';
import "./OutputInfo.css"
export default function OutputInfo({label,text}:{label:string, text:String}){
    return(
        <>
        <Row>
            <Col>
            <h1 className='title-1'>Nome</h1>
            <p className= 'subtitle-1'>Matheus Mota</p>
            </Col>
        </Row>
        </>
    );
}