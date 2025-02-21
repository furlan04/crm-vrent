import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/esm/Container";
import SelectChart from '../components/selectChart';
import Charts from '../components/charts';

const Analitica = () => {
    const [query, setQuery] = useState('select * from DIAGRAMMA_A_TORTA_FASI');
    const [chartType, setChartType] = useState('pie');

    const select_to_home = (_choice) => {
        setQuery("SELECT * FROM " + _choice);
        if(_choice.includes('TORTA'))
            setChartType('pie');
        else if(_choice.includes('ISTOGRAMMA'))
            setChartType('bar');
    };

    useEffect(() => { }, [query, chartType]);

    return (
        <Container>
            <h3>Pagina analitica</h3>
            <SelectChart select_to_home={select_to_home}/>
            <Container className="p-3">
                <Charts query={query} chartType={chartType}/>
            </Container>
        </Container>
    );
};

export default Analitica;