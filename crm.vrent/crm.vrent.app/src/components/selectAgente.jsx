import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Database from "tauri-plugin-sql-api";
import getEnvVariable from '../util/getEnvVariable';

const SelectAgente = ({select_to_home}) => {
    const [listaAgenti, setListaAgenti] = useState([]);
    const [loaded, setLoaded] = useState(false);

    async function select_agenti(){
        const db = await Database.load(await getEnvVariable('DB_URL'));
        const result = await db.select("SELECT * FROM Agente");
        return result;
    }

    useEffect(() => {
        select_agenti()
            .then((res) =>{
                setListaAgenti(res);
                setLoaded(true);
            });
    }, []);

    if(loaded){
        return(
            
            <Form.Select aria-label="Default select example" onChange={(choice) => select_to_home(choice.target.value)}>
                <option value='tutte' key={'tutte'}>Tutti</option>
                {listaAgenti.map(a => (
                    <option value={a.Nome} key={a.Nome}>{a.Nome}</option>
                ))}
            </Form.Select>
            
        );
    } else {
        return(
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }
}

export default SelectAgente;