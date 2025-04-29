import React from 'react';
import { Navigate } from 'react-router-dom';
import Toaster from './Toaster';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = sessionStorage.getItem('userName');
    if (isAuthenticated) {
        return children
    }
    else {
        Toaster.info('Session is not Active');
        sessionStorage.clear();
        return <Navigate to="/Login" />;
    }
};

export default PrivateRoute;
