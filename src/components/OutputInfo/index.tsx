import { Alert, Container, Form, Row, Col,Image } from 'react-bootstrap';
import "./OutputInfo.css"
export default function OutputInfo({label,text}:{label:string, text:String}){
    return(
        <>
        <Row  >
            <Col >
            <h1  style={{fontSize: 12}}>{label}</h1>
            <p className= 'subtitulo' style={{fontSize: 16, fontWeight: 'bold'}}>{text}</p>
            </Col>
        </Row>
        </>
    );
}