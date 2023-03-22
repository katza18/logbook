import workoutsStore from "../stores/workoutsStore";
import React from "react";

export default function WorkoutCreateForm({log_id}) {
    const store = workoutsStore();

    if (store.updateForm._id || !store.create) return;

    return(
        <div className="form">
            <h2>Create Workout</h2>
            <form onSubmit={(e) => store.createWorkout(e, log_id)}>
                <label htmlFor="title">Workout Name:</label>
                <input name="title" value={store.createForm.title} onChange={store.updateCreateFormField}/>

                <label htmlFor="body">Notes:</label>
                <textarea name="body" value={store.createForm.body} onChange={store.updateCreateFormField}/>

                <label htmlFor="date">Date: </label>
                <input name="date" type="date" value={store.createForm.date} onChange={store.updateCreateFormField} />

                <button onClick={() => {store.setCreateFalse()}}>Cancel</button>
                <button type="submit">Create Workout</button>
            </form>
        </div>
    );
}
