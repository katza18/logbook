import React, { useEffect } from 'react';
import Workouts from '../components/Workouts';
import UpdateForm from '../components/WorkoutUpdateForm.js';
import workoutsStore from '../stores/workoutsStore';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyNavbar from '../components/MyNavbar';
import { useNavigate, useParams } from 'react-router-dom';

export default function WorkoutsPage() {
    const store = workoutsStore();
    const navigate = useNavigate();

    const _id = useParams();

    useEffect(() => {
        store.fetchWorkouts(_id);
    }, [])

    return(
        <Container>
            <Row>
                <Col><MyNavbar /></Col>
            </Row>
            <Row className="body">
                <Col>
                    <button onClick={() => navigate(-1)}>Back</button>
                    <Workouts log_id={_id} />
                </Col>
                <Col>
                    <UpdateForm />
                </Col>
            </Row>
        </Container>
    );
}
