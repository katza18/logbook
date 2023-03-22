import React, { useEffect } from 'react';
import Meals from '../components/Meals';
import mealsStore from '../stores/mealsStore';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyNavbar from '../components/MyNavbar';
import { useNavigate, useParams } from 'react-router-dom';

export default function MealsPage() {
    const navigate = useNavigate();
    const store = mealsStore();

    const _id = useParams();

    useEffect(() => {
        store.fetchMeals(_id);
    }, []);

    return(
        <Container>
            <Row>
                <Col><MyNavbar /></Col>
            </Row>
            <Row className="body">
                <Col>
                    <button onClick={() => navigate(-1)}>Back</button>
                    <Meals log_id={_id} />
                </Col>
            </Row>
        </Container>
    );
}
