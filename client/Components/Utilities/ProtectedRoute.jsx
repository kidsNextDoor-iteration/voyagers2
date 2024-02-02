import React from 'react';
import { useNavigate } from "react-router";


export default function ProtectedRoute({ children }) {

    const navigate = useNavigate();


    fetch('/checkCookie')
        .then(response => response.json())
        .then(data => {
            if (!data) {
                return navigate('/home')
            } else {
                return children;
            }

        }
        )

    // return children;


}