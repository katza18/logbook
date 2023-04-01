import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import authStore from '../stores/authStore';

export default function MyNavbar() {
    const store = authStore(store => {
        return {loggedIn: store.loggedIn};
    });

    return (
    <Navbar variant="dark" fixed="top" bg="dark" id="navbar">
        <Nav defaultActiveKey="/" as="ul" id="navbar-left">
            <Nav.Item as="li">
                <LinkContainer to="/"><Nav.Link className="nav-button">Dashboard</Nav.Link></LinkContainer>
            </Nav.Item>
            <Nav.Item as="li">
                <LinkContainer to="/build"><Nav.Link className="nav-button">Build a Program</Nav.Link></LinkContainer>
            </Nav.Item>
        </Nav>

        <Nav defaultActiveKey="/" as="ul" id="navbar-right">
            <Nav.Item as="li">
                <LinkContainer to="/settings"><Nav.Link className="nav-button">Settings</Nav.Link></LinkContainer>
            </Nav.Item>
            {store.loggedIn &&
            <Nav.Item as="li">
                <LinkContainer to="/logout"><Nav.Link className="nav-button">Log Out</Nav.Link></LinkContainer>
            </Nav.Item> }
        </Nav>
    </Navbar>
  );
}
