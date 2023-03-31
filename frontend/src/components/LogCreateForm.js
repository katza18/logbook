import logsStore from "../stores/logsStore";
import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function CreateForm() {
    const store = logsStore();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div className="form">
        <Button className="create-button" onClick={handleShow}>Create New Logbook</Button>
        <Modal show={show} onHide={handleClose}backdrop="static" keyboard={false}>
            <Modal.Header><h2>Create Logbook</h2></Modal.Header>
            <form onSubmit={(e) => {store.createLog(e); handleClose()}}>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button type="submit">Create Log</Button>
            </Modal.Footer>
            </form>
        </Modal>
        </div>
    );
}
