import React, { useEffect } from 'react';
import CreateForm from '../components/LogCreateForm';
import Logs from '../components/Logs';
import UpdateForm from '../components/LogUpdateForm';
import logsStore from '../stores/logsStore';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyNavbar from '../components/MyNavbar';


export default function LogsPage() {
    const store = logsStore();


    useEffect(() => {
        store.fetchLogs();
    }, [])

    return(
        <Container>
            <Row>
                <Col><MyNavbar /></Col>
            </Row>
            <Row className="body">
                <Col>
                    <Logs />
                    <CreateForm />
                    <UpdateForm />
                </Col>
            </Row>
        </Container>
    );
}
