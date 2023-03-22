import exercisesStore from "../stores/exercisesStore";
import ExerciseUpdate from "./ExerciseUpdate";

export default function Exercise({exercise, number}) {
    const store = exercisesStore();

    if (store.updateForm._id && exercise._id === store.updateForm._id) {
        return <ExerciseUpdate exercise={exercise} number={number} />
    }

    return(
        <tr key={exercise._id}>
            <td>{number}</td>
            <td>{exercise.name}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.sets}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.intensity}</td>
            <td>{exercise.muscle}</td>
            <td>{exercise.notes}</td>
            <td className="delete" onClick={() => store.deleteExercise(exercise._id)}>X</td>
            <td onClick={() => store.toggleUpdate(exercise)}>Update</td>
        </tr>
    );
}
