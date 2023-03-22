import React, { useEffect } from 'react';
import exercisesStore from '../stores/exercisesStore';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyNavbar from '../components/MyNavbar';
import ExercisesTable from '../components/ExercisesTable';
import { useParams } from 'react-router-dom';

export default function ExercisesPage() {

    const store = exercisesStore(store => {
        return {
            fetchExercises: store.fetchExercises
        }
    });

    const _id = useParams();

    useEffect(() => {
        store.fetchExercises(_id);
    }, [])

    return(
        <Container>
            <Row>
                <Col><MyNavbar /></Col>
            </Row>
            <ExercisesTable workout_id={_id} />
        </Container>
    );
}
