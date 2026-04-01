import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Booking.css';

function Booking() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="booking-page mesh-bg">
            <nav className="booking-nav">
                <Link to="/" className="back-link">← மேலோட்டப் பார்வைக்கு</Link>
            </nav>

            <main className="booking-container">
                <div className="booking-grid">
                    <div className="booking-image-section">
                        <div className="book-preview-card">
                            <img src="/assets/book-cover.jpg" alt="Book Cover" className="booking-book-cover" />
                            <div className="book-badge-premium animate-float">BEST SELLER</div>
                        </div>
                    </div>

                    <div className="booking-content-section">
                        <h1 className="booking-title">முழுமையான ஆரோக்கியப் பயணம்</h1>
                        <p className="booking-subtitle">இயற்கை முறையில் உங்களை நீங்களே குணப்படுத்திக் கொள்ளுங்கள்.</p>

                        <div className="booking-details-card">
                            <div className="price-tag-modern">
                                <span className="old-price">₹1,999</span>
                                <span className="new-price">₹499</span>
                                <span className="discount-badge">75% OFF</span>
                            </div>

                            <div className="booking-features">
                                <div className="feature-item">
                                    <span className="feature-icon">🌿</span>
                                    <span>100+ இயற்கை தீர்வுகள்</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">📱</span>
                                    <span>டிஜிட்டல் வடிவில் உடனடி அணுகல்</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">💎</span>
                                    <span>வாழ்நாள் முழுவதும் பயன்படும் அறிவு</span>
                                </div>
                            </div>

                            <button className="confirm-booking-btn">இப்போதே வாங்கவும் (Buy Now)</button>
                            <p className="secure-payment">🔒 பாதுகாப்பான பணப்பரிமாற்றம்</p>
                        </div>

                        <div className="terms-conditions-modern">
                            <h3>நிபந்தனைகள் மற்றும் விதிமுறைகள் (Terms & Conditions)</h3>
                            <div className="terms-scroll-area">
                                <p>1. இந்த புத்தகம் கல்வி மற்றும் விழிப்புணர்வு நோக்கத்திற்காக மட்டுமே வழங்கப்படுகிறது.</p>
                                <p>2. இது ஒரு டிஜிட்டல் தயாரிப்பு (E-Book), வாங்கியவுடன் உங்கள் பதிவிறக்க இணைப்பு வழங்கப்படும்.</p>
                                <p>3. தீவிரமான மருத்துவப் பிரச்சினைகளுக்கு உங்கள் மருத்துவரை அணுகவும்.</p>
                                <p>4. டிஜிட்டல் தயாரிப்பு என்பதால் பணம் திரும்பப் பெறுதல் (Refund) வசதி இல்லை.</p>
                                <p>5. இதில் கொடுக்கப்பட்டுள்ள முறைகள் பக்கவிளைவுகள் அற்றவை, இருப்பினும் சரியான முறையில் பின்பற்றுவது அவசியம்.</p>
                                <p>6. பதிப்புரிமை: இந்தப் புத்தகத்தின் உள்ளடக்கத்தை அனுமதியின்றி மறுபதிப்பு செய்யவோ பகிரவோ கூடாது.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="booking-footer">
                <p>&copy; 2024 Ruby Wellness Center. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default Booking;
