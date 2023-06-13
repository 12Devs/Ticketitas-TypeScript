import { Alert, Container, Form, Row, Col,Image } from 'react-bootstrap';
import "./style.css"
export default function OutputInfo({label,text}:{label:string, text:String}){
    return(
        <div className= 'boxText'>
            <h1 className= 'titulo' style={{fontSize: 12}}>{label}</h1>
            <p className= 'subtitulo' >{text}</p>
        </div>
    );
}