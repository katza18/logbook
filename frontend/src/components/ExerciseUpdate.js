import exercisesStore from "../stores/exercisesStore";

export default function ExerciseUpdate({exercise, number}) {
    const store = exercisesStore();

    return(
        <tr key={exercise._id}>
            <td>{number}</td>
            <td><input name="name" value={store.updateForm.name} onChange={store.updateUpdateFormField} /></td>
            <td><input name="weight" value={store.updateForm.weight} onChange={store.updateUpdateFormField} /></td>
            <td><input name="sets" value={store.updateForm.sets} onChange={store.updateUpdateFormField} /></td>
            <td><input name="reps" value={store.updateForm.reps} onChange={store.updateUpdateFormField} /></td>
            <td>
                <select name="intensity" value={store.updateForm.intensity} onChange={store.updateUpdateFormField}>
                    <option value="" disabled></option>
                    <option value="Low">Low</option>
                    <option value="Low-Mod">Low-Moderate</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Mod-High">Moderate-High</option>
                    <option value="High">High</option>
                </select>
            </td>
            <td>
                <select name="muscle" value={store.updateForm.muscle} onChange={store.updateUpdateFormField}>
                    <option value="" disabled></option>
                    <option value="Legs">Legs</option>
                    <option value="Chest, Triceps, Front Delts">Push Muscles</option>
                    <option value="Traps, Lats, Biceps, Rear Delts">Pull Muscles</option>
                    <option value="Front Delts, Triceps">Press Muscles</option>
                    <option value="" disabled></option>
                    <option value="Quads">Quads</option>
                    <option value="Hamstrings">Hamstrings</option>
                    <option value="Calves">Calves</option>
                    <option value="Glutes">Glutes</option>
                    <option value="" disabled></option>
                    <option value="Traps, Lats">Back</option>
                    <option value="Traps">Traps</option>
                    <option value="Lats">Lats</option>
                    <option value="" disabled></option>
                    <option value="Chest">Chest</option>
                    <option value="" disabled></option>
                    <option value="Front Delts">Front Delts</option>
                    <option value="Side Delts">Side Delts</option>
                    <option value="Rear Delts">Rear Delts</option>
                    <option value="" disabled></option>
                    <option value="Biceps">Biceps</option>
                    <option value="Triceps">Triceps</option>
                    <option value="" disabled></option>
                    <option value="Abs">Abs</option>
                    <option value="" disabled></option>
                    <option value="Other">Other</option>
                </select>
            </td>
            <td><input name="notes" value={store.updateForm.notes} onChange={store.updateUpdateFormField} /></td>
            <td className="delete"onClick={() => store.deleteExercise(exercise._id)}><span className="material-symbols-outlined delete">delete</span></td>
            <td></td>
        </tr>
    );
}
