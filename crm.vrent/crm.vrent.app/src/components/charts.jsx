import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/esm/Container';
import React, { useState, useEffect } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import Database from "tauri-plugin-sql-api";
import getEnvVariable from '../util/getEnvVariable';

const Charts = ({ query, chartType }) => {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const select_from_view = async () => {
        const db = await Database.load(await getEnvVariable('DB_URL'));
        const result = await db.select(query);
        return result;
    };

    useEffect(() => {
        setLoaded(false);
        const fetchData = async () => {
            const res = await select_from_view();

            let formattedData;
            if (chartType === 'pie') {
                formattedData = res.map((item, index) => ({
                    id: index,
                    value: item.totale, 
                    label: item.Fase   
                }));
            } else if (chartType === 'bar') {
                formattedData = res.map((item, index) => ({
                    id: index,
                    label: item.AgenteId,
                    value: item.totale
                }));
            }

            setData(formattedData);
        };

        fetchData().then(() =>{
            setLoaded(true);
        });
    }, [query, chartType]);

    if (loaded) {
        if (chartType === 'pie') {
            return (
                <PieChart
                    series={[
                        {
                            data: data,
                        }
                    ]}
                    width={400}
                    height={200}
                />
            ); 
        } else if (chartType === 'bar') {
            return (
                <BarChart
                    width={500}
                    height={300}
                    series={[
                        { data: data.map(d => d.value), label: 'Contratti aperti', id: 'identificatore' },
                    ]}
                    xAxis={[{ data: data.map(d => d.label), scaleType: 'band' }]}
                />
            );
        } else {
            return <p>Tipo di grafico non supportato</p>;
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
};

export default Charts;