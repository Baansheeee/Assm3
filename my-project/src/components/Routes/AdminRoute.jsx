/* eslint-disable no-unused-vars */
/* global process */
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from 'axios';
import Spinner from "../Spinner";

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API}/api/v1/auth/admin-auth`, {
                    headers: {
                        Authorization: auth?.token, 
                    },
                });
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                    navigate('/login'); 
                }
            } catch (error) {
                console.error("Error during admin authentication check:", error);
                setOk(false);
                navigate('/login'); 
            }
        };

        if (auth?.token) authCheck();
    }, [auth?.token, navigate]);

    return ok ? <Outlet /> : <Spinner path={""} />;
}
