import { Alert, Container, Form, Row, Col,Image } from 'react-bootstrap';
import "./OutputInfo.css"
export default function OutputInfo({label,text}:{label:string, text:String}){
    return(
        <>
        <Row  >
            <Col >
            <h1 className='d-flex flex-column-start'>{label}</h1>
            <p className= 'subtitulo'>{text}</p>
            </Col>
        </Row>
        </>
    );
}