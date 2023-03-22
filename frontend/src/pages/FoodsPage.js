import React, { useEffect } from 'react';
import foodsStore from '../stores/foodsStore';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyNavbar from '../components/MyNavbar';
import FoodsTable from '../components/FoodsTable';
import { useNavigate, useParams } from 'react-router-dom';

export default function FoodsPage() {
    const navigate = useNavigate();

    const store = foodsStore(store => {
        return {
            fetchFoods: store.fetchFoods
        }
    });

    const _id = useParams();

    useEffect(() => {
        store.fetchFoods(_id);
    }, [])

    return(
        <Container>
            <Row>
                <Col><MyNavbar /></Col>
            </Row>
            <Row className="body">
                <Col>
                    <button onClick={() => navigate(-1)}>Back</button>
                    <h1>Foods</h1>
                    <FoodsTable meal_id={_id} />
                </Col>
                <Col>

                </Col>
            </Row>
        </Container>
    );
}
