// src/components/InactivityTimeout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InactivityTimeout = () => {
  const navigate = useNavigate();

  // Function to clear token and redirect after inactivity
  const logoutOnInactivity = () => {
    localStorage.removeItem('token');  // Remove token from local storage
    alert('You have been logged out due to inactivity.');
    navigate('/login');  // Redirect to login page or home page
  };

  // Inactivity timer (5 minutes = 300000ms)
  const INACTIVITY_TIMEOUT = 5 * 60 * 1000;

  useEffect(() => {
    // Set a timeout that will log the user out after inactivity
    let inactivityTimer;

    // Reset the timer whenever user interacts with the page
    const resetTimer = () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
      inactivityTimer = setTimeout(logoutOnInactivity, INACTIVITY_TIMEOUT);
    };

    // List of events that should reset the inactivity timer
    const events = ['mousemove', 'keydown', 'click', 'scroll'];

    // Attach event listeners for activity detection
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // Start the timer immediately on page load
    resetTimer();

    // Clean up event listeners on component unmount
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
      clearTimeout(inactivityTimer);  // Clear timer on cleanup
    };
  }, [navigate]);

  return null;
};

export default InactivityTimeout;
