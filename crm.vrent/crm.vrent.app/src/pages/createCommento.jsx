import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Database from "tauri-plugin-sql-api";
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import getEnvVariable from '../util/getEnvVariable';


const CreateCommento = () => {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const { partitaIva } = useParams();
    const navigate = useNavigate();

    async function add_commento(e){
        e.preventDefault()
        const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj.nomeAgente);
        let commento = formDataObj.Commento_;
        const db = await Database.load(await getEnvVariable('DB_URL'));
        db.execute("INSERT INTO Commenti (Commento_, ClienteId) VALUES (?, ?)", [commento, partitaIva])
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
                <Form onSubmit={add_commento}>
                    <Stack direction="horizontal" gap={3}>
                        <Form.Label htmlFor="inputPassword5">Inserire il commento:</Form.Label>
                        <Form.Control as="textarea" name="Commento_"/>
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
                <Button onClick={() => navigate('/commenti/' + partitaIva)}>Torna indietro</Button>
            </Container>
        );
    }
}

export default CreateCommento;