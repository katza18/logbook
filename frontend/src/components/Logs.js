import logsStore from "../stores/logsStore";
import React from 'react';
import Log from "./Log";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Logs({logIn}) {
    const store = logsStore();

    let cardsInRow = 0;

    return(
        <div className="central-items">
            <h1>Logs</h1>
            <div className="cards">
                {store.logs && store.logs.map(log => {
                    return <Log log={log} key={log._id} />
                })}
            </div>
            <Button className="create-button" onClick={() => store.toggleCreate()}>Create New Logbook</Button>
        </div>
    );
}
