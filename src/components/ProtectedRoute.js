import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { getUserRole } = useContext(AuthContext);
    const role = getUserRole();

    return allowedRoles.includes(role) ? element : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
