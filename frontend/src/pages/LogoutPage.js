import React, { useEffect } from "react";
import authStore from "../stores/authStore.js";

export default function LogoutPage() {
    const store = authStore();

    //log user out once the page renders
    useEffect(() => {
        store.logout();
    }, []);

    return <h1>Logged out.</h1>;
}
