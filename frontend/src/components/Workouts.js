import workoutsStore from "../stores/workoutsStore";
import React from 'react';
import Workout from "./Workout";
import CreateForm from './WorkoutCreateForm';

export default function Workouts({log_id}) {
    const store = workoutsStore();

    return(
        <div>
            <h2>Workouts: </h2>
            {store.workouts && store.workouts.map(workout => {
                if(workout.log && workout.log.localeCompare(log_id.id) === 0){
                    return <Workout workout={workout} key={workout._id} />
                }
            })}
            <CreateForm log_id={log_id} />
            <button onClick={() => store.toggleCreate()}>Create New Workout</button>
        </div>
    );
}
