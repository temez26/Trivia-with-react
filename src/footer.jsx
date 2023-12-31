import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import './style/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="social-icons">
                        <a href="https://github.com/temez26" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} className='github' />
                        </a>
                        <a href="https://www.linkedin.com/in/teemu-kalmari-755469169/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} className='linked' />
                        </a>
                    </div>
                    <p className="firm">&copy; {new Date().getFullYear()} Bonkkers oy</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
