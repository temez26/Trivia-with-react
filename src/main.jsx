import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Footer from './Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.min.js'; // Import Bootstrap JavaScript
import Animation from './Lottie.jsx';
import Nav from './Navbar.jsx';
import './style/App.css';
import './style/index.css';

ReactDOM.createRoot(document.getElementById('navbar')).render(
    <React.StrictMode>
        <Nav />
        
    </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
        <Footer />
    </React.StrictMode>
);
