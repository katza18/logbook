import mealsStore from "../stores/mealsStore";
import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";


export default function MealCreateForm({log_id}) {
    const store = mealsStore();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div className="form">
            <Button className="create-button" onClick={handleShow}>Create New Meal</Button>
            <Modal show={show} onHide={handleClose}backdrop="static" keyboard={false}>
            <Modal.Header><h2>Create Meal</h2></Modal.Header>
            <form onSubmit={(e) => {store.createMeal(e, log_id); handleClose()}}>
                <Modal.Body>
                <label htmlFor="title">Meal Name:</label>
                <input name="title" value={store.createForm.title} onChange={store.updateCreateFormField}/>

                <label htmlFor="body">Notes:</label>
                <textarea name="body" value={store.createForm.body} onChange={store.updateCreateFormField}/>

                <label htmlFor="date">Date: </label>
                <input name="date" type="date" value={store.createForm.date} onChange={store.updateCreateFormField} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Create Meal</Button>
                </Modal.Footer>
            </form>
            </Modal>
        </div>
    );
}
