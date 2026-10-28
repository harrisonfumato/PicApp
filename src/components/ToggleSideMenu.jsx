import React, { useState, useEffect } from 'react';
import SideDashboard from './SideDashboard';
import './styles.css';

function ToggleSideMenu() {
  const [showSideDashboard, setShowSideDashboard] = useState(true);

  useEffect(() => {
    function handleResize() {
      // Adjust the visibility of the side dashboard based on the screen width
      if (window.innerWidth <= 768) {
        setShowSideDashboard(false);
      } else {
        setShowSideDashboard(true);
      }
    }

    // Add an event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check for screen size
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <button onClick={() => setShowSideDashboard(!showSideDashboard)} className="toggle-button">
        Toggle Side Dashboard
      </button>
      <SideDashboard showSideDashboard={showSideDashboard} />
    </div>
  );
}

export default ToggleSideMenu;
