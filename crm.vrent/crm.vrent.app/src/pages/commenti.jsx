import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Database from "tauri-plugin-sql-api";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import getEnvVariable from '../util/getEnvVariable';

const Commenti = () => {
    const { partitaIva } = useParams();
    const [listaCommenti, setListaCommenti] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    async function fetchCommenti() {
        const db = await Database.load(await getEnvVariable('DB_URL'));
        try {
            const result = await db.select("SELECT * FROM Commenti WHERE clienteId = ?", [partitaIva]);
            console.log(result);
            if (result.length > 0) {
                setListaCommenti(result);
            } else {
                setError("Commenti non trovati!");
            }
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        setLoaded(false);

        fetchCommenti()
            .then((res) => {
                console.log(listaCommenti);
                setLoaded(true);
            });
    }, []);

    if (error) {
        return (
            <Container className='p-4'>
                <h4 className='text-danger'>{error}</h4>
                <Button variant="primary" onClick={() => navigate('/createCommento/' + partitaIva)}>Crea un commento</Button>
            </Container>
        );
    }

    if (loaded) {
        return (
            <Container className='p-4'>
                <h3>Lista dei commenti del cliente con partita iva: {partitaIva}</h3>
                {listaCommenti.map((c) => {
                    return (
                        <Container className='p-3'>
                            <Card>
                                <Card.Header>{c.Inserted}</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        {c.Commento_}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Container>
                    );
                })}
                <Button variant="primary" onClick={() => navigate('/createCommento/' + partitaIva)}>Crea un commento</Button>
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

export default Commenti;
