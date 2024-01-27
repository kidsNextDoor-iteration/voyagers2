import React from 'react';
import { useNavigate } from "react-router";


export default function ProtectedRoute({ children }) {

    const navigate = useNavigate();


    fetch('/checkCookie')
        .then(response => response.json())
        .then(data => {

            console.log('response from cookie check: ', data)
            if (!data) {
                navigate('/home')
            }

        }
        )

    return children;


}