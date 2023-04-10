import React, { useEffect } from 'react';
import Workouts from '../components/Workouts/Workouts';
import workoutsStore from '../stores/workoutsStore';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
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
                    <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
                    <Workouts log_id={_id} />
                </Col>
            </Row>
        </Container>
    );
}
