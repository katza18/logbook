import workoutsStore from "../../stores/workoutsStore";
import React, { useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import ExercisesTable from '../Exercises/ExercisesTable';
import exercisesStore from "../../stores/exercisesStore";

export default function Workout({workout}) {

  const store = workoutsStore(store => {
        return {
            deleteWorkout: store.deleteWorkout,
            toggleUpdate: store.toggleUpdate
        };
    });

  const store2 = exercisesStore(store2 => {
    return {
      fetchExercises: store2.fetchExercises
    }
  });

  useEffect(() => {
    store2.fetchExercises(workout._id);
    // eslint-disable-next-line
  }, []);

  return (
    <div key={workout._id}>
      <Accordion className="card">
        <Accordion.Item eventKey={workout._id}>
        <Accordion.Header>
          <h3>{workout.title}: {workout.date.substring(5, 10)}</h3>
          <span className="material-symbols-outlined delete" onClick={() => store.deleteWorkout(workout._id)}>delete</span>
          <span className="material-symbols-outlined edit" onClick={() => store.toggleUpdate(workout)}>edit_square</span>
        </Accordion.Header>
        <Accordion.Body eventKey="0">
          <ExercisesTable workout_id={workout._id} />
        </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
