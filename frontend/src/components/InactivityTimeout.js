// src/components/InactivityTimeout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const InactivityTimeout = () => {
  const navigate = useNavigate();

  // Function to clear token and redirect after inactivity
  const logoutOnInactivity = () => {
    // Check if user is not an admin
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      localStorage.removeItem('token');
      toast.error('You have been logged out due to inactivity.');
      navigate('/login');
    }
  };

  // Inactivity timer (1 minute = 60000ms)
  const INACTIVITY_TIMEOUT = 5 * 60 * 1000;

  useEffect(() => {
    // Only set up inactivity timer if user is not an admin
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      return; // Exit early if admin is logged in
    }

    let inactivityTimer;

    const resetTimer = () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
      inactivityTimer = setTimeout(logoutOnInactivity, INACTIVITY_TIMEOUT);
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll'];

    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
      clearTimeout(inactivityTimer);
    };
  }, [navigate]);

  return null;
};

export default InactivityTimeout;
