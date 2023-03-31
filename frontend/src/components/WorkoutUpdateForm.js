import workoutsStore from "../stores/workoutsStore";
import React from "react";

export default function UpdateForm() {
    const store = workoutsStore();

    if (!store.updateForm._id) return;

    return(
        <div>
            <h2>Update Workout</h2>
            <form onSubmit={store.updateWorkout}>
              <input name="title" value={store.updateForm.title} onChange={store.updateUpdateFormField}/>
              <textarea name="body" value={store.updateForm.body} onChange={store.updateUpdateFormField}/>
              <input name="date" type="date" value={store.updateForm.date.substring(0,10)} onChange={store.updateUpdateFormField}/>
              <button type="submit">Update Workout</button>
            </form>
          </div>
    );
}
