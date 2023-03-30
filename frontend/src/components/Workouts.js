import workoutsStore from "../stores/workoutsStore";
import React from 'react';
import Workout from "./Workout";
import CreateForm from './WorkoutCreateForm';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import UpdateForm from './WorkoutUpdateForm';
import DateAccordion from "./WorkoutsDateAccordion";

export default function Workouts({log_id}) {
    const store = workoutsStore();
    const set = new Set();
    const arr = [];

    function convertSet(set) {
        for(const item of set) {
            arr.push(item);
        }
    }

    return(
        <div className="central-items">
            <h1>Workouts</h1>

            {store.workouts && store.workouts.map(workout => {
                if(workout.log && workout.log.localeCompare(log_id.id) === 0){
                    set.add(workout.date);
                }
            })}

            {convertSet(set)}

            <Accordion alwaysOpen>
                {/*arr && arr.map(date => {
                    return <DateAccordion date={date} log_id={log_id} key={date}/>
                })*/}
                {store.workouts && store.workouts.map(workout => {
                    if(workout.log && workout.log.localeCompare(log_id.id) === 0){
                        return <Workout workout={workout} key={workout._id} />
                    }
                })}
            </Accordion>

            <CreateForm log_id={log_id} />
            <Button variant="primary" className="create-button" onClick={() => store.toggleCreate()}>Create New Workout</Button>
            <UpdateForm />
        </div>
    );
}
