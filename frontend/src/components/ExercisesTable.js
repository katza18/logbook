import Table from 'react-bootstrap/Table';
import exercisesStore from '../stores/exercisesStore';
import Exercise from './Exercise';
import ExerciseStats from './ExerciseStats';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

export default function ExercisesTable({workout_id}) {
    const store = exercisesStore();
    const navigate = useNavigate();

    let count = 1, reps = 0, sets = 0;


    return(
    <Row>
    <Col>
        <h2>Exercises</h2>
        <form form="update" onSubmit={store.updateExercise}>
            <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>#</th>
                <th>Exercise</th>
                <th>Weight</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Intensity</th>
                <th>Muscle Group(s)</th>
                <th>Notes</th>
                <th colSpan={2}>Actions</th>
            </tr>
            </thead>
            <tbody>
                {/* eslint-disable-next-line*/}
                {store.exercises && store.exercises.map(exercise => {
                    try {
                        if (exercise.workout && exercise.workout.localeCompare(workout_id) === 0) {
                            if(exercise.reps) reps += (parseInt(exercise.reps) * parseInt(exercise.sets)) ;
                            if(exercise.sets) sets += parseInt(exercise.sets);
                            console.log("returning exercise");
                            return <Exercise number={count++} exercise={exercise} key={exercise._id} />;
                        }
                    } catch(err) {
                        console.log(err);
                    }
                })}
            </tbody>
            </Table>
            <button onClick={(e) => store.createExercise(e, workout_id)}>Add</button>
            {store.updating && <button type="submit">Update</button>}
        </form>
    </Col>
        <Col>
            <h1>Stats</h1>
            <ExerciseStats reps={reps} sets={sets}/>
        </Col>
    </Row>
    );
}
