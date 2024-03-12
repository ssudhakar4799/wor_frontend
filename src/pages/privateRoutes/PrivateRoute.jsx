// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';


const PrivateRoute = ({ element: Component, roles }) => {

    // login details
  let {isAuthentification,usertype} = useSelector((state)=>state.auth);
  console.log(isAuthentification,usertype);

  // Mock authentication logic
  const isAuthenticated = isAuthentification;
  const userRole = usertype; // 'user' or 'admin'
  console.log(userRole);

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(userRole)) {
    // Redirect to unauthorized page if user doesn't have the required role
    return <Navigate to="/unauthorized" />;
  }

  return <Component userRole={userRole} isAuthenticated={isAuthenticated} />;
};

export default PrivateRoute;
