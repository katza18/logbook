import React, { useEffect } from 'react';
import Meals from '../components/Meals/Meals';
import mealsStore from '../stores/mealsStore';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
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
                    <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
                    <Meals log_id={_id} />
                </Col>
            </Row>
        </Container>
    );
}
