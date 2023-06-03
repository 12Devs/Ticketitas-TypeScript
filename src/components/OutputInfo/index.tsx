import { Alert, Container, Form, Row, Col,Image } from 'react-bootstrap';
import "./OutputInfo.css"
import React from 'react';


export default function OutputInfo({label,text}:{label:string, text:String}){
    return(
        <>
        <Row>
            <Col>
            <h1 className='title-1'>{label}</h1>
            <p className= 'subtitle-1'>{text}</p>
            </Col>
        </Row>
        </>
    );
}