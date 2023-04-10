import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import workoutsStore from '../../stores/workoutsStore';
import Workout from './Workout';

export default function DateAccordion({date, log_id}) {
    const store = workoutsStore(store => {
        return {
            workouts: store.workouts
        }
    });

    return (
        <Accordion.Item eventKey={date} className="card">
            <Accordion.Header>
                {date.substring(0, 10)}
            </Accordion.Header>
            <Accordion.Body>
                {/* eslint-disable-next-line */}
                {store.workouts && store.workouts.map(workout => {
                    if(workout.log && workout.date && workout.log.localeCompare(log_id.id) === 0 && workout.date.localeCompare(date) === 0){
                        return <Workout workout={workout} key={workout._id} />
                    }
                })}
            </Accordion.Body>
        </Accordion.Item>
    )
}
