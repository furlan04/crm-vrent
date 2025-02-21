import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Database from "tauri-plugin-sql-api";
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import SelectAgente from '../components/selectAgente';
import getEnvVariable from '../util/getEnvVariable';

const CreateCliente = () => {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [choice, setChoice] = useState('tutte');

    const select_to_home = (_choice) => {
        setChoice(_choice);
    };

    async function add_cliente(e){
        e.preventDefault()
        if(choice == 'tutte'){
            setError('Non hai selezionato un agente');
            return;
        }
        const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries())
        let obj = formDataObj;
        const db = await Database.load(await getEnvVariable('DB_URL'));
        db.execute("INSERT INTO Clienti (partitaIva, AgenteId, Referente, Indirizzo, Città, Telefono, Provincia, Mail, Potenziale, Competitor, Fase, Percentuale_Successo, Ragione_Sociale, Divisione)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [obj.partitaIva, choice, obj.referente, obj.indirizzo, obj.città, obj.telefono, obj.provincia, obj.mail, obj.potenziale, obj.competitor, obj.fase, obj.percentuale, obj.Ragione_Sociale, obj.Divisione])
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
                <Form onSubmit={add_cliente}>
                    <Stack direction="vertical" gap={3}>
                        <Form.Label htmlFor="inputPassword5">Inserire i valori del nuovo cliente</Form.Label>
                        <Form.Control name="partitaIva" placeholder='partitaIva' maxLength={11} minLength={11} required/>
                        <SelectAgente select_to_home={select_to_home}/>
                        <Form.Control name="Ragione_Sociale" required />
                        <Form.Select aria-label="Default select example" name='Divisione'>
                            <option value='Refrigeranti' key={'Refrigeranti'}>Refrigeranti</option>
                            <option value='Rifiuti' key={'Rifiuti'}>Rifiuti</option>
                        </Form.Select>
                        <Form.Control name="referente" placeholder='referente' required/>
                        <Form.Control name="indirizzo" placeholder='indirizzo' required/>
                        <Form.Control name="città" placeholder='città' required/>
                        <Form.Control name="telefono" placeholder='telefono' type='tel' required/>
                        <Form.Control name="provincia" placeholder='provincia' maxLength={2} minLength={2} required/>
                        <Form.Control name="mail" placeholder='mail' type='email' required/>
                        <Form.Control name="potenziale" placeholder='potenziale' type='number' required/>
                        <Form.Control name="competitor" placeholder='competitor' required/>
                        <Form.Select aria-label="Default select example" name='fase'>
                            <option value='1'>1 - Primi contatti</option>
                            <option value='2'>2 - </option>
                            <option value='3'>3 - </option>
                            <option value='4'>4 - </option>
                            <option value='5'>5 - Contratto chiuso</option>
                        </Form.Select>
                        <Form.Control name="percentuale" placeholder='percentuale' type='number' required/>
                        <div className="hr" />
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

export default CreateCliente;