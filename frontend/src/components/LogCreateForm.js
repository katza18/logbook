import logsStore from "../stores/logsStore";
import React from "react";

export default function CreateForm() {
    const store = logsStore();

    if (store.updateForm._id || !store.create) return;

    return(
        <div className="form">
            <h2>Create Logbook</h2>
            <form onSubmit={store.createLog}>
                <label htmlFor="title">Logbook Name:</label>
                <input name="title" value={store.createForm.title} onChange={store.updateCreateFormField}/>

                <label htmlFor="type">Logbook Type:</label>
                <select name="type" required value={store.createForm.type} onChange={store.updateCreateFormField}>
                    <option value="" disabled></option>
                    <option value="Exercise">Exercise</option>
                    <option value="Nutrition">Nutrition</option>
                </select>

                <label htmlFor="body">Logbook Description:</label>
                <textarea name="body" value={store.createForm.body} onChange={store.updateCreateFormField}/>
                <button onClick={() => {store.setCreateFalse()}}>Cancel</button>
                <button type="submit">Create Log</button>
            </form>
        </div>
    );
}
