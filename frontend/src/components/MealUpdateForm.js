import mealsStore from "../stores/mealsStore";
import React from "react";

export default function UpdateForm() {
    const store = mealsStore();

    if (!store.updateForm._id) return;

    return(
        <div>
            <h2>Update Meal</h2>
            <form onSubmit={store.updateMeal}>
              <input name="title" value={store.updateForm.title} onChange={store.updateUpdateFormField}/>
              <textarea name="body" value={store.updateForm.body} onChange={store.updateUpdateFormField}/>
              <input name="date" type="date" value={store.updateForm.date} onChange={store.updateUpdateFormField}/>
              <button type="submit">Update Meal</button>
            </form>
          </div>
    );
}
