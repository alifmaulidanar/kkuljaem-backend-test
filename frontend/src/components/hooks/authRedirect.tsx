import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Check if user is authenticated
export const useAuthRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/');
    }
  }, [navigate]);
};
