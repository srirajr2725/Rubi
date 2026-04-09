import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Success() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="success-page mesh-bg">
            <main className="success-container">
                <div className="success-card animate-reveal">
                    <div className="success-icon-wrapper">
                        <div className="success-check">✓</div>
                    </div>
                    
                    <h1 className="success-title">Payment Received!</h1>
                    <p className="success-subtitle">Thank you for your purchase. Your health journey begins now.</p>

                    <div className="download-section">
                        <h3>உங்களுக்கான தயாரிப்புகள்:</h3>
                        <div className="download-grid">
                            <a href="/20 DLP 100 NHS.pdf" download className="download-btn">
                                <span className="btn-icon">📄</span>
                                <div className="btn-text">
                                    <span className="file-name">Life Problems & Natural Solutions</span>
                                    <span className="file-info">Digital PDF • Download Now</span>
                                </div>
                            </a>
                            <a href="/Bonus - Diagnosis.pdf" download className="download-btn">
                                <span className="btn-icon">📄</span>
                                <div className="btn-text">
                                    <span className="file-name">Diagnosis Master Class (Bonus)</span>
                                    <span className="file-info">Digital PDF • Download Now</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="email-conf-message">
                        <p>We've also sent the download links to your email.</p>
                        <p className="support-text">Having trouble? Contact us at bbsmartmedia@gmail.com</p>
                    </div>

                    <Link to="/" className="home-link">← Return to Home</Link>
                </div>
            </main>
        </div>
    );
}

export default Success;
