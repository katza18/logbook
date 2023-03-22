import mealsStore from "../stores/mealsStore";
import React from "react";

export default function MealCreateForm({log_id}) {
    const store = mealsStore();

    if (store.updateForm._id || !store.create) return;

    return(
        <div className="form">
            <h2>Create Meal</h2>
            <form onSubmit={(e) => store.createMeal(e, log_id)}>
                <label htmlFor="title">Meal Name:</label>
                <input name="title" value={store.createForm.title} onChange={store.updateCreateFormField}/>

                <label htmlFor="body">Notes:</label>
                <textarea name="body" value={store.createForm.body} onChange={store.updateCreateFormField}/>

                <label htmlFor="date">Date: </label>
                <input name="date" type="date" value={store.createForm.date} onChange={store.updateCreateFormField} />

                <button onClick={() => {store.setCreateFalse()}}>Cancel</button>
                <button type="submit">Create Meal</button>
            </form>
        </div>
    );
}
