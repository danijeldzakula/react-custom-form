import { useState } from "react";

export default function useAuth() {
    const getAuthorized = () => {
        return false;
    }

    const [auth, setAuth] = useState(getAuthorized());

    const setAuthorized = () => {
        setAuth(true);
    }

    return {
        auth, 
        setAuthorized
    }
}