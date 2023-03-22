import logsStore from "../stores/logsStore";
import React from "react";

export default function UpdateForm() {
    const store = logsStore();

    if (!store.updateForm._id) return;

    return(
        <div>
            <h2>Update Log</h2>
            <form onSubmit={store.updateLog}>
              <input name="title" value={store.updateForm.title} onChange={store.updateUpdateFormField}/>
              <textarea name="body" value={store.updateForm.body} onChange={store.updateUpdateFormField}/>
              <button type="submit">Update Log</button>
            </form>
          </div>
    );
}
