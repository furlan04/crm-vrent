import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Database from "tauri-plugin-sql-api";
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import getEnvVariable from '../util/getEnvVariable';

const TableClienti = ({ selezione_agente }) => {
    const [listaClienti, setListaClienti] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    async function select_clienti() {
        setLoaded(false);
        const db = await Database.load(await getEnvVariable('DB_URL'));
        let result = [];
        if (selezione_agente === 'tutte') {
            result = await db.select("SELECT * FROM Clienti");
        } else {
            result = await db.select("SELECT * FROM Clienti WHERE AgenteId = ?", [selezione_agente]);
        }
        return result;
    }

    useEffect(() => {
        select_clienti()
            .then((res) => {
                setListaClienti(res);
                setLoaded(true);
            });
    }, [selezione_agente]);

    if (loaded) {
        if (listaClienti.length > 0) {
            return (
                <Container className='p-2'>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr key={'header'}>
                                <th>Partita Iva</th>
                                <th>Divisione</th>
                                <th>Ragione Sociale</th>
                                <th>Agente</th>
                                <th>Referente</th>
                                <th>Indirizzo</th>
                                <th>Città</th>
                                <th>Provincia</th>
                                <th>Mail</th>
                                <th>Potenziale</th>
                                <th>Competitor</th>
                                <th>Telefono</th>
                                <th>Fase</th>
                                <th>Percentuale Successo</th>
                                <th>Azioni</th> {/* Aggiungi intestazione per le azioni */}
                            </tr>
                        </thead>
                        <tbody>
                            {listaClienti.map((c) => {
                                return (
                                    <tr key={c.partitaIva}>
                                        <td>{c.partitaIva}</td>
                                        <td>{c.Divisione}</td>
                                        <td>{c.Ragione_Sociale}</td>
                                        <td>{c.AgenteId}</td>
                                        <td>{c.Referente}</td>
                                        <td>{c.Indirizzo}</td>
                                        <td>{c.Città}</td>
                                        <td>{c.Provincia}</td>
                                        <td>{c.Mail}</td>
                                        <td>{c.Potenziale}</td>
                                        <td>{c.Competitor}</td>
                                        <td>{c.Telefono}</td>
                                        <td>{c.Fase}</td>
                                        <td>{c.Percentuale_Successo}%</td>
                                        <td className='d-flex'>
                                            <Link to={`/modifica-cliente/${c.partitaIva}`} className="btn btn-info me-2">
                                                ✏️
                                            </Link>
                                            <Link to={`/commenti/${c.partitaIva}`} className="btn btn-warning">
                                                📝
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Container>
            );
        } else {
            return (
                <Container className='p-2'>
                    <h3>
                        {selezione_agente} non ha ancora inserito nessun cliente!
                    </h3>
                </Container>
            );
        }
    } else {
        return (
            <Container className='p-4'>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }
}

export default TableClienti;
