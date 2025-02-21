import React, { useState, useEffect } from 'react';
import SelectAgente from '../components/selectAgente';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import TableClienti from '../components/tableClienti';

const Home = () => {
    const [choice, setChoice] = useState('tutte');

    const select_to_home = (_choice) => {
        setChoice(_choice);
    };

    useEffect(() => { }, [choice]);

    return(
        <Container className='p-4'>
            <Container className='p-4'>
                <Stack direction="horizontal" gap={2}>
                    <SelectAgente select_to_home={select_to_home}/>
                    <div className="vr" />
                    <Button variant="primary" href='/createAgente'>Aggiungi agente</Button>
                </Stack>
            </Container>
            <Container className='p-4 text-right align-right'>
                <Button variant="primary" href='/createCliente'>Aggiungi cliente</Button>
                <TableClienti selezione_agente={choice}/>
            </Container>
        </Container>
        
    );
}

export default Home;