import workoutsStore from "../stores/workoutsStore";
import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';

export default function WorkoutCreateForm({log_id}) {
    const store = workoutsStore();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div className="form">
            <Button className="create-button" onClick={handleShow}>Create New Workout</Button>
            <Modal show={show} onHide={handleClose}backdrop="static" keyboard={false}>
            <Modal.Header><h2>Create Workout</h2></Modal.Header>
            <form onSubmit={(e) => {store.createWorkout(e, log_id); handleClose()}}>
            <Modal.Body>
                <label htmlFor="title">Workout Name:</label>
                <input name="title" value={store.createForm.title} onChange={store.updateCreateFormField}/>

                <label htmlFor="body">Notes:</label>
                <textarea name="body" value={store.createForm.body} onChange={store.updateCreateFormField}/>

                <label htmlFor="date">Date: </label>
                <input required name="date" type="date" value={store.createForm.date} onChange={store.updateCreateFormField} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button type="submit">Create Workout</Button>
            </Modal.Footer>
            </form>
            </Modal>
        </div>
    );
}
