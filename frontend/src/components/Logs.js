import logsStore from "../stores/logsStore";
import React from 'react';
import Log from "./Log";

export default function Logs({logIn}) {
    const store = logsStore();

    return(
        <div className="central-items">
            <h1>Logs</h1>
            <div className="cards">
                {store.logs && store.logs.map(log => {
                    return <Log log={log} key={log._id} />
                })}
            </div>
        </div>
    );
}
