import React from 'react'
import { Navigate } from 'react-router-dom'

const Protected = ({ children }) => {
    const isSignedIn = localStorage.getItem('isSignedIn');
    if (isSignedIn === "false") {
        return <Navigate to='/login' replace />
    }
    return children
}

export default Protected
