import React from "react";
import authStore from "../stores/authStore";
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
    const store = authStore();
    const navigate = useNavigate();

    const signupHandler = async (e) => {
        e.preventDefault();
        await store.signup();

        navigate('/login');
    }

    return(
        <form onSubmit={signupHandler}>
            <input type="email" name="email" value={store.signupForm.email} onChange={store.updateSignupForm} />
            <input type="password" name="password" value={store.signupForm.password} onChange={store.updateSignupForm} />
            <button type="submit">Signup</button>
        </form>
    );
}
