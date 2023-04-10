import React from "react";
import authStore from "../../stores/authStore";
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function LoginForm() {
    const store = authStore();
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();
        await store.login();

        //navigate to home
        navigate('/');
    };

    return(
        <Form onSubmit={loginHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name ="email" placeholder="Enter email" value={store.loginForm.email} onChange={store.updateLoginForm} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={store.loginForm.password} onChange={store.updateLoginForm} />
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
            <a href="/signup">Signup</a>
        </Form>
    );
}

/*
<form onSubmit={loginHandler}>
            <input type="email" name="email" value={store.loginForm.email} onChange={store.updateLoginForm} />
            <input type="password" name="password" value={store.loginForm.password} onChange={store.updateLoginForm} />
            <button type="submit">Login</button>
        </form>
        <div>
*/
