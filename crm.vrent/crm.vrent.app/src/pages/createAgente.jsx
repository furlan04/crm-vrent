import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Database from "tauri-plugin-sql-api";
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import getEnvVariable from '../util/getEnvVariable';

const CreateAgente = () => {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    async function add_agente(e){
        e.preventDefault()
        const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj.nomeAgente);
        let nome = formDataObj.nomeAgente;
        const db = await Database.load(await getEnvVariable('DB_URL'));
        db.execute("INSERT INTO Agente (Nome) VALUES (?)", [nome,])
            .then((res) =>{
                console.log(res);
                setSubmitted(true);
            }).catch((err) =>{
                setError(err);
            });
    }

    if(!submitted){
        return(
            <Container className='p-4'>
                <Form.Label className='text-danger'>{error == '' ? '' : '⚠️' + error + '⚠️'}</Form.Label>
                <Form onSubmit={add_agente}>
                    <Stack direction="horizontal" gap={3}>
                        <Form.Label htmlFor="inputPassword5">Inserire il nome dell'agente:</Form.Label>
                        <Form.Control name="nomeAgente"/>
                        <div className="vr" />
                        <Button variant="secondary" type='submit'>Aggiungi</Button>
                    </Stack>
                </Form>
            </Container>
        );
    } else {
        return(
            <Container className='p-4'>
                <h4>Il form è stato inviato correttamente</h4>
                <Button href='/'>Torna indietro</Button>
            </Container>
        );
    }
}

export default CreateAgente;