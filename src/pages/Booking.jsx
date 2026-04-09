import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Booking.css';

function Booking() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handlePayment = () => {
        if (!email || !phone) {
            alert("தயவுசெய்து உங்கள் மின்னஞ்சல் மற்றும் தொலைபேசி எண்ணை உள்ளிடவும்.");
            return;
        }

        const options = {
            key: "rzp_test_YOUR_KEY_HERE", // Replace with your Actual Razorpay Key ID
            amount: 9900, // Amount in paise (99 INR = 9900 paise)
            currency: "INR",
            name: "Ruby Wellness",
            description: "Natural Healing Course Bundle",
            image: "/assets/logo.png", // Optional branding logo
            handler: function (response) {
                // This code runs only if payment is SUCCESSFUL
                console.log("Payment Success:", response.razorpay_payment_id);
                setIsProcessing(true);
                // Navigate to success page only after bank-confirmed payment
                navigate('/success');
            },
            prefill: {
                name: "Customer",
                email: email,
                contact: phone
            },
            notes: {
                address: "Ruby Wellness Office"
            },
            theme: {
                color: "#B00000"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response){
            alert("பணம் செலுத்துவதில் தோல்வி: " + response.error.description);
        });
        rzp.open();
    };

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
                        <div className="booking-details-card modern-checkout-card">
                            <div className="price-tag-modern">
                                <span className="old-price">₹999</span>
                                <span className="new-price">₹99</span>
                                <span className="discount-badge">90% OFF</span>
                            </div>

                            <div className="checkout-message">
                                Access to this purchase will be sent to this email
                            </div>

                            <div className="modern-form-group">
                                <div className="input-field-wrapper">
                                    <label>Email Address</label>
                                    <input 
                                        type="email" 
                                        placeholder="example@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="input-field-wrapper">
                                    <label>Phone number *</label>
                                    <div className="phone-input-container">
                                        <span className="country-code">+91 ⌵</span>
                                        <input 
                                            type="tel" 
                                            placeholder="1234567890"    
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pricing-summary">
                                <div className="pricing-details-list">
                                    <div className="pricing-item-detail">
                                        <span>20 DLP + 100 NHS (Actual Price)</span>
                                        <span className="strike">₹999</span>
                                    </div>
                                    <div className="pricing-item-detail">
                                        <span>Bonus: Diagnosis Course</span>
                                        <span className="free-text">FREE</span>
                                    </div>
                                </div>
                                <div className="pricing-item">
                                    <span>Sub Total</span>
                                    <span>₹99</span>
                                </div>
                                <div className="pricing-item total-item">
                                    <span>Total</span>
                                    <span>₹99</span>
                                </div>
                            </div>

                            <button 
                                className={`confirm-booking-btn-modern ${isProcessing ? 'loading' : ''}`}
                                onClick={handlePayment}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Opening Payment...' : <>BUY NOW <span className="btn-arrow">→</span></>}
                            </button>
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
