import workoutsStore from "../stores/workoutsStore";
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Workout({workout}) {
  const navigate = useNavigate();

  const store = workoutsStore(store => {
        return {
            deleteWorkout: store.deleteWorkout,
            toggleUpdate: store.toggleUpdate
        };
    });

    return (
        <div key={workout._id}>
          <h3>{workout.title}</h3>
          <h4>{workout.date.substring(0, 10)}</h4>
          <button onClick={() => store.deleteWorkout(workout._id)}>Delete</button>
          <button onClick={() => store.toggleUpdate(workout)}>Update</button>
          <button onClick={() => navigate(`/workouts/${workout._id}/exercises`)}>View</button>
        </div>
      );
}
