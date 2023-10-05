import { useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  const AuthRequired = (props: any) => {
    const navigate = useNavigate();

    useEffect(() => {

      const user = JSON.parse(localStorage.getItem('authContext') || '{}');
      
      if (!user?.token) {
  
        navigate('/');
      }
    }, []);

    return React.createElement(WrappedComponent, props);
  };

  return AuthRequired;
};

export default withAuth;
