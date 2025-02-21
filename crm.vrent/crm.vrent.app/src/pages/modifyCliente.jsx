import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Database from "tauri-plugin-sql-api";
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import getEnvVariable from '../util/getEnvVariable';

const ModifyCliente = () => {
    const { partitaIva } = useParams();
    const [cliente, setCliente] = useState(null);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCliente() {
            const db = await Database.load(await getEnvVariable('DB_URL'));
            try {
                const result = await db.select("SELECT * FROM Clienti WHERE partitaIva = ?", [partitaIva]);
                if (result.length > 0) {
                    setCliente(result[0]);
                } else {
                    setError("Cliente non trovato.");
                }
            } catch (err) {
                setError(err.message);
            }
        }
        fetchCliente();
    }, [partitaIva]);

    async function updateCliente(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = Object.fromEntries(formData.entries());

        const db = await Database.load(await getEnvVariable('DB_URL'));
        try {
            await db.execute(
                "UPDATE Clienti SET Referente = ?, Indirizzo = ?, Città = ?, Telefono = ?, Provincia = ?, Mail = ?, Potenziale = ?, Competitor = ?, Fase = ?, Percentuale_Successo = ?, Ragione_Sociale = ?, Divisione = ? WHERE partitaIva = ?",
                [obj.referente, obj.indirizzo, obj.città, obj.telefono, obj.provincia, obj.mail, obj.potenziale, obj.competitor, obj.fase, obj.percentuale, obj.Ragione_Sociale, obj.Divisione, partitaIva]
            );
            setSubmitted(true);
        } catch (err) {
            setError(err.message);
        }
    }

    if (submitted) {
        return (
            <Container className='p-4'>
                <h4>Il cliente è stato modificato correttamente!</h4>
                <Button onClick={() => navigate('/')}>Torna alla lista clienti</Button>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className='p-4'>
                <h4 className='text-danger'>{error}</h4>
            </Container>
        );
    }

    if (cliente) {
        return (
            <Container className='p-4'>
                <Form onSubmit={updateCliente}>
                    <Stack direction="vertical" gap={3}>
                        <Form.Label htmlFor="partitaIva">Partita Iva</Form.Label>
                        <Form.Control name="partitaIva" value={cliente.partitaIva} readOnly />
                        <Form.Label htmlFor="agenteId">Agente</Form.Label>
                        <Form.Control name="agenteId" defaultValue={cliente.AgenteId} readOnly />
                        <Form.Label htmlFor="Ragione_Sociale">Ragione Sociale</Form.Label>
                        <Form.Control name="Ragione_Sociale" defaultValue={cliente.Ragione_Sociale} required />
                        <Form.Label htmlFor="Divisione">Divisione</Form.Label>
                        <Form.Control name="Divisione" defaultValue={cliente.Divisione} readOnly />
                        <Form.Label htmlFor="referente">Referente</Form.Label>
                        <Form.Control name="referente" defaultValue={cliente.Referente} required />
                        <Form.Label htmlFor="indirizzo">Indirizzo</Form.Label>
                        <Form.Control name="indirizzo" defaultValue={cliente.Indirizzo} required />
                        <Form.Label htmlFor="città">Città</Form.Label>
                        <Form.Control name="città" defaultValue={cliente.Città} required />
                        <Form.Label htmlFor="telefono">Telefono</Form.Label>
                        <Form.Control name="telefono" defaultValue={cliente.Telefono} required />
                        <Form.Label htmlFor="provincia">Provincia</Form.Label>
                        <Form.Control name="provincia" defaultValue={cliente.Provincia} required />
                        <Form.Label htmlFor="mail">Mail</Form.Label>
                        <Form.Control name="mail" defaultValue={cliente.Mail} required />
                        <Form.Label htmlFor="potenziale">Potenziale</Form.Label>
                        <Form.Control name="potenziale" defaultValue={cliente.Potenziale} required />
                        <Form.Label htmlFor="competitor">Competitor</Form.Label>
                        <Form.Control name="competitor" defaultValue={cliente.Competitor} required />
                        <Form.Label htmlFor="fase">Fase</Form.Label>
                        <Form.Select aria-label="Default select example" name='fase'>
                            <option value={cliente.Fase}>{cliente.Fase}</option>
                            <option value='1'>1 - Primi contatti</option>
                            <option value='2'>2 - </option>
                            <option value='3'>3 - </option>
                            <option value='4'>4 - </option>
                            <option value='5'>5 - Contratto chiuso</option>
                        </Form.Select>
                        <Form.Label htmlFor="percentuale">Percentuale di Successo</Form.Label>
                        <Form.Control name="percentuale" type="number" defaultValue={cliente.Percentuale_Successo} required />
                        <Button variant="primary" type="submit">Aggiorna Cliente</Button>
                    </Stack>
                </Form>
            </Container>
        );
    }

    return (
        <Container className='p-4'>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    );
};

export default ModifyCliente;
