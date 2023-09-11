import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Footer from './footer.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.min.js'; // Import Bootstrap JavaScript


import './App.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Footer/>
  </React.StrictMode>,
)
