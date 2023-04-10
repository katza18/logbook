import logsStore from "../../stores/logsStore";
import React from 'react';
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
    <Card bg="primary">
      <Card.Header className="card-header">
        <div>
          {log.title}
        </div>
        <div className="actions">
          <span onClick={() => store.toggleUpdate(log)} className="material-symbols-outlined log-edit">edit_square</span>
          <span onClick={() => store.deleteLog(log._id)} className="material-symbols-outlined log-delete">delete</span>
        </div>
      </Card.Header>
      <Card.Body className="card-body">
        <p>{log.body}</p>
        <Button onClick={() => navigate(path)}>Open</Button>
      </Card.Body>
    </Card>
  );
}
