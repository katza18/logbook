import logsStore from "../stores/logsStore";
import React from 'react';
import Log from "./Log";

export default function Logs({logIn}) {
    const store = logsStore();

    return(
        <div>
            <h2>Logbooks:</h2>
            {store.logs && store.logs.map(log => {
                return <Log log={log} key={log._id} />
            })}
            <button onClick={() => store.toggleCreate()}>Create New Logbook</button>
        </div>
    );
}
