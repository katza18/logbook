import logsStore from "../stores/logsStore";
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
      <Card.Header>{log.title}</Card.Header>
      <Card.Body>
        <p>{log.body}</p>
        <Button onClick={() => store.deleteLog(log._id)}>Delete</Button>
        <Button onClick={() => store.toggleUpdate(log)}>Update</Button>
        <Button onClick={() => navigate(path)}>Open</Button>
      </Card.Body>
    </Card>
  );
}
