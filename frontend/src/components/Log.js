import logsStore from "../stores/logsStore";
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Log({log}) {
  const navigate = useNavigate();

  const store = logsStore(store => {
      return {
          deleteLog: store.deleteLog,
          toggleUpdate: store.toggleUpdate,
          workoutsOrMeals: store.workoutsOrMeals
      };
  });

  const option = store.workoutsOrMeals(log.type);
  const path = `/logs/${log._id}/${option}`;

  return (
      <div key={log._id}>
        <h3>{log.title}</h3>
        <button onClick={() => store.deleteLog(log._id)}>Delete</button>
        <button onClick={() => store.toggleUpdate(log)}>Update</button>
        <button onClick={() => navigate(path)}>View</button>
      </div>
    );
}
