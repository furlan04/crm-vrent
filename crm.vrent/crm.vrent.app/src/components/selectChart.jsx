import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Database from "tauri-plugin-sql-api";
import getEnvVariable from '../util/getEnvVariable';

const SelectChart = ({select_to_home}) => {
    const [listaViste, setListaViste] = useState([]);
    const [loaded, setLoaded] = useState(false);

    async function select_viste(){
        const db = await Database.load(await getEnvVariable('DB_URL'));
        const result = await db.select("SELECT CONVERT(TABLE_NAME USING utf8) AS TABLE_NAME FROM lista_viste;");
        return result;
    }

    useEffect(() => {
        select_viste()
            .then((res) =>{
                setListaViste(res);
                setLoaded(true);
            });
    }, []);

    if(loaded){
        return(
            
            <Form.Select aria-label="Default select example" onChange={(choice) => select_to_home(choice.target.value)}>
                {listaViste.map(a => a.TABLE_NAME !== 'lista_viste' ? (
                    <option value={a.TABLE_NAME} key={a.TABLE_NAME}>{a.TABLE_NAME}</option>
                ) : null)}
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

export default SelectChart;