import React, { useState, useEffect } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Use useEffect to update the dark mode state in localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Retrieve the dark mode state from localStorage on component mount
  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode);
    }
  }, []);

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <h1>My React App</h1>
      <div className="form-check form-switch fs-5 d-flex align-items-center">
        <input
          className="form-check-input"
          type="checkbox"
          id="darkModeToggle"
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />
        <label className="form-check-label" htmlFor="darkModeToggle">
          <span id="darkModeText" className={`text-white ${isDarkMode ? 'dark-text' : ''}`}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </span>
          <span
            id="darkModeIcon"
            className={`fas ${isDarkMode ? 'fa-moon' : 'fa-sun'}`}
            style={{ marginTop: '40%', marginLeft: '4px' }}
          ></span>
        </label>
      </div>
      <p>This is some content in your app.</p>
    </div>
  );
}

export default App;
