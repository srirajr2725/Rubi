import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Landing() {
    const [activeFaq, setActiveFaq] = useState(null);
    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const faqData = [
        {
            q: "1. இந்த புத்தகம் யாருக்கு பயன்படும்?",
            a: "இந்த புத்தகம் தினசரி சிறிய உடல் பிரச்சினைகள் அனுபவிப்பவர்கள், மன அழுத்தம் மற்றும் தூக்கமின்மை உள்ளவர்கள், இயற்கை முறையில் குணமடைய விரும்புபவர்கள் ஆகியோருக்குப் பயனுள்ளதாக இருக்கும். எளிய முறையில் தங்களைத் தாங்களே குணப்படுத்த விரும்பும் அனைவருக்கும் இது ஒரு முழுமையான வழிகாட்டியாக செயல்படும்."
        },
        {
            q: "2. இந்த முறைகள் பாதுகாப்பானதா?",
            a: "இந்த முறைகள் முழுமையாக பாதுகாப்பானவை. பக்கவிளைவுகள் எதுவும் இல்லை. உட்கொள்ள வேண்டிய மருந்துகள் இதில் இல்லை. இது முழுக்க வெளிப்புறத்தில் செய்யப்படும் Non-Invasive Healing Method ஆகும்."
        },
        {
            q: "3. இந்த புத்தகத்தை பயன்படுத்த மருத்துவ அறிவு தேவைப்படுமா?",
            a: "மருத்துவ அறிவு தேவையில்லை. இந்த புத்தகம் மிகவும் எளிமையான முறையில் எழுதப்பட்டுள்ளது. யாரும் படித்தவுடன் உடனே புரிந்து கொண்டு செயல்படுத்த முடியும்."
        },
        {
            q: "4. இந்த முறைகள் எவ்வளவு நேரத்தில் வேலை செய்யும்?",
            a: "பல சந்தர்ப்பங்களில் சில நிமிடங்களிலேயே நிவாரணம் கிடைக்கலாம். தொடர்ந்து பயன்படுத்தும் போது நீண்டநாள் மற்றும் நிலையான பலன்களை அனுபவிக்க முடியும்."
        },
        {
            q: "5. இந்த புத்தகத்தில் எத்தனை பிரச்சினைகளுக்கு தீர்வு உள்ளது?",
            a: "இந்த புத்தகம் 20 தினசரி வாழ்க்கை பிரச்சினைகளுக்கு 100-க்கும் மேற்பட்ட இயற்கை தீர்வுகளை வழங்குகிறது. ஒவ்வொரு பிரச்சினைக்கும் பல்வேறு முறைகள் தெளிவாக விளக்கப்பட்டுள்ளன."
        },
        {
            q: "6. இந்த முறைகளை தினமும் பயன்படுத்த வேண்டுமா?",
            a: "அவசியமில்லை. பிரச்சினை ஏற்பட்டபோது பயன்படுத்தலாம். ஆனால் தினசரி பயன்படுத்தினால் உடலின் சமநிலை மற்றும் ஆரோக்கியம் மேம்படும்."
        },
        {
            q: "7. விதை தெரபி (Seed Therapy) எப்படி வேலை செய்கிறது?",
            a: "கைகள் மற்றும் கால்களில் உள்ள குறிப்பிட்ட புள்ளிகள் உடலின் பல்வேறு உறுப்புகளுடன் தொடர்புடையவை. அந்த புள்ளிகளில் விதைகளை வைத்து மெதுவாக அழுத்தம் கொடுத்தால், உடலின் இயற்கை குணப்படுத்தும் செயல்முறை தூண்டப்படுகிறது."
        },
        {
            q: "8. எந்த விதைகளை பயன்படுத்த வேண்டும்?",
            a: "கடுகு, வெந்தயம், பயறு வகைகள் போன்ற எளிதில் கிடைக்கும் விதைகளை பயன்படுத்தலாம். பொதுவாக உங்கள் வீட்டிலேயே இருக்கும் சாதாரண விதைகள் போதுமானவை."
        },
        {
            q: "9. இந்த முறைகள் குழந்தைகள் மற்றும் வயதானவர்களுக்கு பயன்படுத்தலாமா?",
            a: "ஆம். இந்த முறைகள் அனைத்து வயதினருக்கும் பாதுகாப்பானவை. குழந்தைகள் முதல் முதியவர்கள் வரை யாரும் பயன்படுத்தலாம்."
        },
        {
            q: "10. இந்த புத்தகம் வாங்கிய பிறகு உடனே பயன்படுத்த முடியுமா?",
            a: "ஆம். இது “Read and Apply” வகை புத்தகம். படித்த உடனே நடைமுறையில் பயன்படுத்தும் வகையில் வடிவமைக்கப்பட்டுள்ளது."
        },
        {
            q: "11. இது மாத்திரைக்கு மாற்றாக பயன்படுத்தலாமா?",
            a: "சிறிய உடல் பிரச்சினைகளுக்கு இயற்கை மாற்று தீர்வாக பயன்படுத்தலாம். ஆனால் பெரிய அல்லது தீவிரமான உடல்நல பிரச்சினைகளுக்கு மருத்துவர் ஆலோசனை அவசியம்."
        },
        {
            q: "12. இந்த புத்தகத்தில் என்ன கற்றுக்கொள்ள முடியும்?",
            a: "இந்த புத்தகம் உங்கள் உடலை புரிந்து கொள்ளும் திறனை வளர்க்கிறது. எந்த பிரச்சினைக்கு என்ன செய்ய வேண்டும் என்பதை தெளிவாக கற்றுக்கொள்ள முடியும். உடனடி நிவாரணம் பெறும் முறைகளையும் இதில் அறியலாம். மேலும், Self-Healing திறனை நீங்கள் வளர்த்துக்கொள்ள முடியும்."
        },
        {
            q: "13. இந்த புத்தகம் என்ன வித்தியாசம்?",
            a: "இது ஒரு சாதாரண தகவல் புத்தகம் அல்ல. இது முழுமையான செயல்பாட்டு கையேடு. Step-by-step வழிகாட்டலுடன், உடனடியாக பயன்படுத்தக்கூடிய முறைகள் இதில் வழங்கப்பட்டுள்ளன."
        },
        {
            q: "14. இந்த முறைகள் உண்மையிலேயே வேலை செய்கிறதா?",
            a: "இந்த முறைகள் உலகம் முழுவதும் பலரால் பயன்படுத்தப்பட்டு வருகின்றன. தொடர்ந்து மற்றும் சரியான முறையில் பயன்படுத்தினால், மாற்றங்களை அனுபவிக்க முடியும்."
        },
        {
            q: "15. நான் இதை வாங்க வேண்டிய முக்கிய காரணம் என்ன?",
            a: "இந்த புத்தகம் உங்கள் ஆரோக்கியத்தை உங்கள் கட்டுப்பாட்டுக்குள் கொண்டு வரும். உடனடி மற்றும் இயற்கையான தீர்வுகளை வழங்கும். மருந்துகளின் மீது நம்பிக்கையை குறைக்கும். இது ஒரு முறை கற்றுக்கொண்டால் வாழ்நாள் முழுவதும் பயன்படும் அறிவாக இருக்கும்."
        },
        {
            q: "16. இந்த முறைகளை செயல்படுத்த தேவையான பொருட்கள் எளிதாக கிடைக்குமா?",
            a: "ஆம். இந்த முறைகளுக்கு தேவையான பொருட்கள் மிகவும் எளிதாக கிடைக்கும் மற்றும் குறைந்த செலவில் வாங்க முடியும். \n\nColor Therapy (நிற சிகிச்சை): சாதாரண chart markers அல்லது sketch pens போதுமானவை. \n\nNumber Therapy (எண் சிகிச்சை): குறிப்பிட்ட எண்களை அதே நிறத்தில் எழுத வேண்டும். \n\nSeed Therapy (விதை சிகிச்சை): விதைகளை ஒட்ட surgical tape பயன்படுத்தப்படுகிறது. இது எந்த மருத்துவக் கடையிலும் கிடைக்கும்."
        },
        {
            q: "17. இந்த முறைகளை பயன்படுத்துவது சிக்கலானதா?",
            a: "இல்லை. இந்த முறைகள் மிகவும் எளிமையானவை. தினசரி வாழ்க்கையில் யாரும் சுலபமாக இணைத்து பயன்படுத்தக்கூடிய வகையில் வடிவமைக்கப்பட்டுள்ளன."
        }
    ];



    // Auto-slide logic
    useEffect(() => {
        const autoSlide = setInterval(() => {
            if (sliderRef.current) {
                const nextIndex = (currentIndex + 1) % 3;
                const cardWidth = sliderRef.current.scrollWidth / 3;
                sliderRef.current.scrollTo({
                    left: nextIndex * cardWidth,
                    behavior: 'smooth'
                });
                setCurrentIndex(nextIndex);
            }
        }, 3500);

        return () => clearInterval(autoSlide);
    }, [currentIndex]);


    return (
        <div className="app-shell mesh-bg">

            <header className="premium-header">
                <div className="header-glass">
                    <img src="/assets/ruby-logo.png" alt="Ruby Logo" className="animate-float" />
                    <div className="brand-info">
                        <h1 className="shine-text">RUBY WELLNESS CENTER</h1>
                        <span className="tagline">ART OF HEALTHY LIVING</span>
                    </div>
                </div>
            </header>

            <section className="hero-modern animate-reveal">
                <div className="hero-content">
                    <div className="hero-badge">BEST NATURAL HEALING 2026</div>
                    <h2 className="title-large">20 அன்றாட வாழ்க்கை சிக்கல்கள் <br /> <span className="highlight">100 இயற்கை தீர்வுகள்</span></h2>
                    <p className="description">பாரம்பரிய முறைகளை நவீன வடிவில் அனுபவியுங்கள்.</p>
                </div>
                <div className="hero-hook-container animate-reveal" style={{ animationDelay: '0.4s' }}>
                    <div className="hero-hook-card">
                        <p className="hook-text">உங்கள் வாழ்க்கையை பாதிப்பது பெரிய நோய்கள் அல்ல…</p>
                        <p className="hook-text highlight-hook">தினமும் உங்களை மெதுவாக சோர்வடையச் செய்யும் சிறிய பிரச்சினைகள்தான்!</p>
                    </div>
                </div>
            </section>

            <section className="pain-points-section animate-reveal">
                <h2 className="section-title">நீங்கள் கவனித்திருக்கிறீர்களா?</h2>
                <div className="pain-points-grid">
                    {[
                        { icon: '/headache_icon_premium_1775040744685.png', text: 'தலைவலி', isImage: true },
                        { icon: '/fatigue_icon_premium_1775040764020.png', text: 'சோர்வு', isImage: true },
                        { icon: '/stress_icon_premium_1775040782554.png', text: 'மன அழுத்தம்', isImage: true },
                        { icon: '/digestion_icon_premium_1775040801249.png', text: 'செரிமான கோளாறு', isImage: true },
                        { icon: '/insomnia_icon_premium_1775040821305.png', text: 'தூக்கமின்மை', isImage: true },
                        { icon: '/body_pain_icon_final_retry_2_1775040934403.png', text: 'உடல் வலி', isImage: true },
                        { icon: '/cold_cough_icon_final_retry_2_1775040952250.png', text: 'குளிர், இருமல்', isImage: true },
                        { icon: '🔥', text: 'உடல் சூடு', isImage: false },
                        { icon: '/anxiety_icon_last_try_1775040898762.png', text: 'கவலை', isImage: true }
                    ].map((item, index) => (
                        <div key={index} className="pain-point-card">
                            {item.isImage ? (
                                <img src={item.icon} alt={item.text} className="pain-icon-img" />
                            ) : (
                                <span className="pain-icon">{item.icon}</span>
                            )}
                            <span className="pain-text">{item.text}</span>
                        </div>
                    ))}
                </div>
                <div className="pain-story animate-reveal">
                    <p>இவை எல்லாம் “சின்ன விஷயம்” என்று நாம் எளிதாக புறக்கணிக்கும் பிரச்சினைகள்…</p>
                    <p>ஆனால் உண்மையில் —</p>
                </div>
                <div className="pain-warning">
                    <div className="warning-emoji-large">⚠️</div>
                    <p>இவையே உங்கள் நாள் முழுவதையும் பாதிக்கும் மிகப்பெரிய காரணங்கள். சிறிய பிரச்சினைகள்... மெதுவாக உங்கள் வாழ்க்கையின் தரத்தை குறைத்து கொண்டே இருக்கும்.</p>
                </div>
            </section>

            <section className="methods-section animate-reveal">
                <div className="methods-card">
                    <div className="methods-header">
                        <h4>பலர் என்ன செய்கிறார்கள்?</h4>
                    </div>
                    <div className="methods-body">
                        <p>❌ அவற்றை கவனிக்காமல் விடுகிறார்கள்</p>
                        <p>❌ அல்லது மாத்திரை எடுத்துக் கொண்டு தற்காலிக நிவாரணம் பெறுகிறார்கள்</p>
                    </div>

                    <div className="methods-header secondary">
                        <h4>ஏன் தெரியுமா?</h4>
                    </div>
                    <div className="speed-grid">
                        <div className="speed-item">
                            <span className="speed-icon">⏳</span>
                            <p>இது அவசர உலகம்</p>
                        </div>
                        <div className="speed-item">
                            <span className="speed-icon">⚡</span>
                            <p>எல்லாவற்றிலும் வேகம்</p>
                        </div>
                        <div className="speed-item">
                            <span className="speed-icon">💊</span>
                            <p>நிவாரணத்திலும் வேகம்</p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="remote-control-section animate-reveal">
                <div className="remote-card">
                    <div className="remote-icon">📱</div>
                    <h2>உங்கள் உடலுக்கான ரிமோட்</h2>
                    <p>இன்று நாம் வாழும் உலகம் — “ரிமோட் உலகம்”. TV, Fan, AC எல்லாவற்றுக்கும் ரிமோட் தேவைப்படுகிறது. ஆனால் உங்கள் உடலுக்கான ரிமோட் — உங்கள் கைகளிலேயே உள்ளது!</p>
                    <div className="remote-highlight">
                        உங்கள் உள்ளங்கைகள் & பாதங்கள்
                    </div>
                    <p>இவற்றில் உங்கள் உடலின் அனைத்து உறுப்புகளையும் கட்டுப்படுத்தும் 📱 <strong>“ரிமோட் பாயிண்ட்ஸ்”</strong> உள்ளன. இதுவே Sujok மருத்துவத்தின் அடிப்படை.</p>
                    <div className="remote-points">
                        <p>✅ மருந்துகள் இல்லாமல்</p>
                        <p>✅ பக்கவிளைவுகள் இல்லாமல்</p>
                        <p>✅ யாருடைய உதவியும் இல்லாமல்</p>
                        <p className="remote-final">நீங்களே உங்கள் ஆரோக்கியத்தை கையாள முடியும்!</p>
                    </div>
                </div>
                 <div className="hero-cta">
                        <Link to="/booking" className="buy-now-btn">Buy Now</Link>
                    </div>
            </section>

            <section className="solution-bridge-section animate-reveal">
                <div className="bridge-card">
                    <h3 className="bridge-title">ஒரு நிமிடம் சிந்தியுங்கள்…</h3>
                    <p className="bridge-intro-text">
                        நீங்கள் உங்கள் பிரச்சினைகளை <strong>இயற்கையாக, எளிதாக மற்றும் பாதுகாப்பாக</strong> தீர்க்க முடிந்தால் எப்படி இருக்கும்?
                    </p>

                    <div className="negative-contrast">
                        <p>❌ மருந்து இல்லாமல்…</p>
                        <p>❌ சிக்கலான முறைகள் இல்லாமல்…</p>
                        <p>❌ பக்கவிளைவுகள் இல்லாமல்…</p>
                    </div>

                    <div className="empowerment-highlight">
                        <p className="highlight-text">✅ உங்களுக்கே உங்களால் தீர்வு கண்டுபிடிக்க முடிந்தால்?</p>
                    </div>

                    <div className="book-reveal">
                        <p className="reveal-tag">📘 அதற்காகத்தான் இந்த புத்தகம்!</p>
                        <h2 className="reveal-title">“20 தினசரி வாழ்க்கை பிரச்சினைகள் – 100 இயற்கை குணப்படுத்தும் தீர்வுகள்”</h2>
                        <p className="reveal-desc">இது ஒரு சாதாரண புத்தகம் அல்ல… இது உங்கள் தினசரி வாழ்க்கைக்கான சக்திவாய்ந்த ஹீலிங் கையேடு 💥</p>
                    </div>

                    <div className="lesson-box">
                        <p className="lesson-title">இந்த புத்தகம் உங்களுக்கு என்ன கற்றுக்கொடுக்கிறது?</p>
                        <p className="lesson-item">👉 உங்கள் உடல் தானாகவே குணமாகும் சக்தி கொண்டது</p>
                        <p className="lesson-item">👉 அதை சரியாக தூண்டினால் உடனடி பதில் கிடைக்கும்</p>
                    </div>
                </div>
            </section>

            <main className="therapy-section animate-reveal" style={{ animationDelay: '0.4s' }}>
                <h2 className="therapy-title">அதற்காக பயன்படுத்தப்படும் 3 சக்திவாய்ந்த முறைகள்:</h2>
                <div className="slider-container">
                    <div className="therapy-slider ultra-modern" ref={sliderRef}>
                        <div className="glass-card">
                            <div className="glass-image">
                                <img src="/assets/color-therapy.png" alt="Color Therapy" />
                                <div className="image-overlay"></div>
                            </div>
                            <div className="glass-content">
                                <h3>Color Therapy (நிற சிகிச்சை)</h3>
                                <span className="glass-label">VIBRATIONAL HEALING</span>
                                <ul className="therapy-points">
                                    <li>✨ வண்ணங்கள் பார்க்க மட்டும் அல்ல</li>
                                    <li>✨ ஒவ்வொரு வண்ணத்திற்கும் தனி அதிர்வு உள்ளது</li>
                                    <li>✨ சரியான வண்ணங்கள் ஆரோக்கியத்திற்கு உதவும்</li>
                                </ul>
                            </div>
                        </div>

                        <div className="glass-card">
                            <div className="glass-image">
                                <img src="/assets/number-therapy.png" alt="Number Therapy" />
                                <div className="image-overlay"></div>
                            </div>
                            <div className="glass-content">
                                <h3>Number Therapy (எண் சிகிச்சை)</h3>
                                <span className="glass-label">ENERGY SHIFT</span>
                                <ul className="therapy-points">
                                    <li>✨ எண்கள் வெறும் கணக்கு அல்ல</li>
                                    <li>✨ ஒவ்வொரு எண்ணும் ஒரு ஆற்றல்</li>
                                    <li>✨ சரியான எண் - சரியான மாற்றம்</li>
                                </ul>
                            </div>
                        </div>

                        <div className="glass-card">
                            <div className="glass-image">
                                <img src="/assets/seed-therapy.png" alt="Seed Therapy" />
                                <div className="image-overlay"></div>
                            </div>
                            <div className="glass-content">
                                <h3>Seed Therapy (விதை சிகிச்சை)</h3>
                                <span className="glass-label">NATURAL POTENTIAL</span>
                                <ul className="therapy-points">
                                    <li>✨ விதைகள் சமைப்பதற்கு மட்டும் அல்ல</li>
                                    <li>✨ விதைக்குள் விருட்ச்சம் உள்ளது</li>
                                    <li>✨ உள் தன்மை பொறுத்து தீர்வுகள் உண்டு</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="modern-indicators">
                        {[0, 1, 2].map((idx) => (
                            <span key={idx} className={`m-dot ${currentIndex === idx ? 'active' : ''}`}></span>
                        ))}
                    </div>
                </div>
                <div className="slider-hint">ஒவ்வொன்றாக பார்க்க இடதுபுறம் நகர்த்தவும் ←</div>

                <div className="therapy-synergy animate-reveal">
                    <div className="synergy-card">
                        <h3>இந்த 3 முறைகளையும் சேர்த்து பயன்படுத்தினால்?</h3>
                        <div className="synergy-grid-premium">
                            <div className="syn-item-premium">
                                <img src="/body_icon_premium.png" alt="Body" className="syn-icon-img" />
                                <span>உடல்</span>
                            </div>
                            <div className="syn-item-premium">
                                <img src="/mind_icon_premium.png" alt="Mind" className="syn-icon-img" />
                                <span>மனம்</span>
                            </div>
                            <div className="syn-item-premium">
                                <img src="/energy_icon_premium.png" alt="Energy" className="syn-icon-img" />
                                <span>ஆற்றல்</span>
                            </div>
                        </div>
                        <p className="synergy-result">மூன்றையும் ஒரே நேரத்தில் சமநிலைப்படுத்தும்<strong>முழுமையான ஹீலிங்</strong>கிடைக்கும்</p>
                    </div>
                </div>

                <div className="book-specialty-premium animate-reveal">
                    <h3 className="spec-title-modern">இந்த புத்தகத்தின் சிறப்பு:</h3>
                    <ul className="spec-list-premium">
                        <li><span className="check-badge">✓</span> சிக்கலான கோட்பாடுகள் இல்லை</li>
                        <li><span className="check-badge">✓</span> மருத்துவ அறிவு தேவையில்லை</li>
                        <li><span className="check-badge">✓</span> யாராலும் உடனே பயன்படுத்த முடியும்</li>
                    </ul>

                    <div className="detail-box-modern">
                        <p className="detail-header-modern">📌 ஒவ்வொரு பிரச்சினைக்கும்:</p>
                        <div className="detail-grid-flex">
                            <span className="detail-tag">✔️ எப்படி செய்வது</span>
                            <span className="detail-tag">✔️ எங்கே செய்வது</span>
                            <span className="detail-tag">✔️ எவ்வளவு நேரம்</span>
                            <span className="detail-tag">✔️ என்ன பலன்</span>
                        </div>
                        <p className="detail-footer-modern">எல்லாம் தெளிவாக கொடுக்கப்பட்டுள்ளது</p>
                    </div>
                </div>


                <div className="target-audience-section-v2 animate-reveal">
                    <div className="section-header-modern">
                        <h2 className="section-title-premium-v2">👥 இந்த புத்தகம் யாருக்கு?</h2>
                        <p className="section-subtitle-v2">ஒவ்வொருவருக்கும் இயற்கை வழித் தீர்வு உண்டு</p>
                    </div>

                    <div className="audience-categories-v2">
                        {/* Category 1: Professionals & Students */}
                        <div className="audience-group-v2">
                            <div className="category-hero">
                                <img src="/category_pros_students.png" alt="Professionals & Students" />
                                <h3 className="group-title-v2">பணி மற்றும் கல்வி</h3>
                            </div>
                            <div className="audience-grid-v2">
                                <div className="audience-card-v2">
                                    <h4>வேலைப்பளு அதிகமானவர்கள்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">தினசரி சோர்வு, தலைவலி, மன அழுத்தம்</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> உடனடி இயற்கை ரிலீஃப் தேவை — வேலை பாதிக்காமல்</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="audience-card-v2">
                                    <h4>மாணவர்கள்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">கவனம் குறைவு, மன அழுத்தம், தூக்கமின்மை</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> concentration & memory improve செய்ய</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="audience-card-v2">
                                    <h4>Screen time அதிகமானவர்கள்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">கண் வலி, தலைவலி, neck pain</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> instant relief techniques</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Category 2: Families & Caregivers */}
                        <div className="audience-group-v2">
                            <div className="category-hero">
                                <img src="/category_family_care.png" alt="Family & Care" />
                                <h3 className="group-title-v2">குடும்பம் மற்றும் பராமரிப்பு</h3>
                            </div>
                            <div className="audience-grid-v2">
                                <div className="audience-card-v2">
                                    <h4>வீட்டுத் தாய்மார்கள்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">குடும்பத்தினரின் சிறிய உடல் பிரச்சினைகள்</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> வீட்டிலேயே எளிய தீர்வுகள் தர முடியும்</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="audience-card-v2">
                                    <h4>குழந்தைகள் கொண்ட பெற்றோர்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">குளிர், இருமல், ஜீரண பிரச்சினைகள்</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> safe & side-effect free care</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="audience-card-v2">
                                    <h4>மூத்த குடிமக்கள்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">உடல் வலி, சோர்வு, circulation issues</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> பாதுகாப்பான, மென்மையான சிகிச்சை</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="audience-card-v2">
                                    <h4>குடும்ப பராமரிப்பாளர்கள்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">அனைவருக்கும் உடனடி உதவி தேவைப்படும் சூழல்</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> First Aid போல பயன்படும்</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Category 3: Mental Wellness */}
                        <div className="audience-group-v2">
                            <div className="category-hero">
                                <img src="/mind_icon_premium.png" alt="Mental Wellness" />
                                <h3 className="group-title-v2">மனநலம் மற்றும் தூக்கம்</h3>
                            </div>
                            <div className="audience-grid-v2">
                                <div className="audience-card-v2">
                                    <h4>மன அழுத்தத்தில் இருப்பவர்கள்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">Anxiety, overthinking, tension</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> மன அமைதி பெற இயற்கை வழி</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="audience-card-v2">
                                    <h4>தூக்கமின்மை உள்ளவர்கள்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">இரவில் தூங்க முடியாமல் தவிப்பு</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> Natural sleep support without tablets</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="audience-card-v2">
                                    <h4>Self-Improvement ஆர்வம் உள்ளவர்கள்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">body-mind awareness</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> self-healing skill develop செய்ய</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Category 4: Natural & Preventive */}
                        <div className="audience-group-v2">
                            <div className="category-hero">
                                <img src="/body_icon_premium.png" alt="Natural Healing" />
                                <h3 className="group-title-v2">இயற்கை மற்றும் தடுப்பு</h3>
                            </div>
                            <div className="audience-grid-v2">
                                <div className="audience-card-v2">
                                    <h4>இயற்கை மருத்துவம் விரும்புபவர்கள்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">Chemical-free lifestyle</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> 100% natural healing methods</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="audience-card-v2">
                                    <h4>ஆரோக்கியத்தை மேம்படுத்த விரும்புபவர்கள்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">Prevention mindset</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> immunity & energy boost</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="audience-card-v2">
                                    <h4>அடிக்கடி மாத்திரை எடுப்பவர்கள்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">சிறிய பிரச்சினைக்கும் மருந்து</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> Drug-free alternative தேவை</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="audience-card-v2">
                                    <h4>ஹீலர்கள் & பிராக்டிஷனர்கள்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">Clients க்கு simple solutions தேவை</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> practice expand செய்ய powerful tool</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Category 5: Energy & Emergency */}
                        <div className="audience-group-v2">
                            <div className="category-hero">
                                <img src="/energy_icon_premium.png" alt="Energy & Emergency" />
                                <h3 className="group-title-v2">ஆற்றல் மற்றும் அவசரம்</h3>
                            </div>
                            <div className="audience-grid-v2">
                                <div className="audience-card-v2">
                                    <h4>எப்போதும் சோர்வாக இருப்பவர்கள்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">low energy, burnout feeling</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> body energy balance செய்ய</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="audience-card-v2">
                                    <h4>அடிக்கடி சிறிய பிரச்சினைகள் வரும் நபர்கள்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">repeated cold, headache, digestion issues</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> root-level natural solution</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="audience-card-v2">
                                    <h4>அவசரநேர உதவி தேவைப்படுபவர்கள்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">doctor உடனே கிடைக்காத சூழல்</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> self-healing first response</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="audience-card-v2">
                                    <h4>செலவை குறைக்க விரும்புபவர்கள்</h4>
                                    <div className="card-content-v2">
                                        <p className="problem-p">medical expenses அதிகம்</p>
                                        <div className="reason-p">
                                            <span className="lightbulb"></span>
                                            <p><strong>காரணம்:</strong> low-cost healing method</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="transformation-section animate-reveal">
                    <div className="trans-card">
                        <h3>✨ இந்த புத்தகம் உங்கள் வாழ்க்கையை மாற்றும்</h3>
                        <p className="trans-intro">நீங்கள் இதை பயன்படுத்தத் தொடங்கும் போது…</p>
                        <div className="results-grid">
                            <div className="result-item">🌿 தலைவலி குறையும்</div>
                            <div className="result-item">🌿 சோர்வு குறையும்</div>
                            <div className="result-item">🌿 மனம் அமைதியாகும்</div>
                            <div className="result-item">🌿 தூக்கம் மேம்படும்</div>
                            <div className="result-item">🌿 உடல் சக்தி அதிகரிக்கும்</div>
                        </div>
                    </div>
                </div>

                <div className="power-manual animate-reveal">
                    <div className="manual-card">
                        <h3>💥 முக்கியமாக…</h3>
                        <p>👉 நீங்கள் உங்கள் உடலை புரிந்து கொள்வீர்கள்</p>
                        <p>👉 எப்போது என்ன செய்ய வேண்டும் தெரியும்</p>
                        <div className="power-tag">இதுவே — சுய குணப்படுத்தும் சக்தி</div>
                        <h4 className="freedom-title">🧠 இதுவே உண்மையான சுதந்திரம்!</h4>
                        <div className="freedom-points">
                            <p>👉 நீங்கள் இனி அடிமை இல்லை</p>
                            <p>👉 உங்கள் உடல் — உங்கள் கட்டுப்பாட்டில்</p>
                        </div>
                    </div>
                </div>

                <div className="family-benefit animate-reveal">
                    <div className="family-card">
                        <h3>இந்த அறிவு உங்கள் குடும்பத்திற்கும் பயன் தரும்</h3>
                        <div className="family-grid">
                            <span>👉 குழந்தைகள்</span>
                            <span>👉 பெற்றோர்</span>
                            <span>👉 நண்பர்கள்</span>
                        </div>
                        <p className="lifestyle-tag">இது ஒரு புத்தகம் மட்டும் அல்ல… இது ஒரு வாழ்க்கை முறை!</p>
                    </div>
                </div>

                <div className="safety-summary animate-reveal">
                    <div className="safety-grid-large">
                        <div className="safe-badge">✅ பாதுகாப்பானது</div>
                        <div className="safe-badge">✅ அனைத்து வயதினருக்கும் ஏற்றது</div>
                        <div className="safe-badge">✅ பக்கவிளைவுகள் இல்லை</div>
                        <div className="safe-badge">✅ உட்கொள்ள வேண்டியதும் இல்லை</div>
                    </div>
                    <div className="non-invasive">100% Non-Invasive Healing</div>
                </div>

                <div className="daily-balance animate-reveal">
                    <div className="balance-card">
                        <h3>🧘‍♂️ தினமும் பயன்படுத்தினால்:</h3>
                        <p>👉 உடல் சமநிலை</p>
                        <p>👉 நோய் எதிர்ப்பு சக்தி அதிகரிப்பு</p>
                        <p>👉 சிறிய பிரச்சினைகள் தாக்காது</p>
                    </div>
                </div>

                <div className="final-call-section animate-reveal">
                    <div className="thinking-card">
                        <h3 className="think-header">🧠 ஒரு நிமிடம் சிந்தியுங்கள்…</h3>
                        <p>👉 வாரத்திற்கு எத்தனை பிரச்சினைகள்?</p>
                        <p>👉 எவ்வளவு நேரம் வீணாகிறது?</p>
                        <p>👉 மனநிலை எவ்வளவு பாதிக்கப்படுகிறது?</p>
                    </div>

                    <div className="imagine-card">
                        <h3>🔥 இப்போது கற்பனை செய்யுங்கள்…</h3>
                        <p>👉 ஒவ்வொரு பிரச்சினைக்கும் உடனடி தீர்வு</p>
                        <p>👉 உங்கள் கையில் ஒரு ஹீலிங் சக்தி</p>
                        <p>👉 வாழ்க்கையில் முழு கட்டுப்பாடு</p>
                        <div className="imagine-reveal">💥 அதுதான் இந்த புத்தகம் தருகிறது!</div>
                    </div>

                    <div className="action-final">
                        <p className="action-tag">👉 படித்து வைக்க வேண்டியது அல்ல</p>
                        <p className="action-tag">👉 பயன்படுத்த வேண்டியது</p>
                        <h3 className="final-punch">✨ எளிமையானது… 🔥 ஆனால் சக்திவாய்ந்தது…</h3>
                        <Link to="/booking" className="urgent-cta">🚀 இப்போதே தொடங்குங்கள்!</Link>
                    </div>

                    <div className="closing-thought">
                        <p>💡 ஏனெனில்… வாழ்க்கையை மாற்றுவது பெரிய விஷயங்கள் அல்ல… சிறிய, சரியான தீர்வுகள்தான்! 💯</p>
                    </div>
                </div>
            </main >

            <section className="why-choose-section animate-reveal">
                <h2 className="why-choose-title">🎯 ஏன் இந்த முறையைத் தேர்வு செய்ய வேண்டும்?</h2>
                <div className="why-choose-grid">
                    <div className="why-item">✔️ பக்கவிளைவுகள் இல்லை</div>
                    <div className="why-item">✔️ மிகவும் சிக்கனமானது</div>
                    <div className="why-item">✔️ சுய மருத்துவம்</div>
                    <div className="why-item">✔️ அறிவியல் அடிப்படை</div>
                </div>
                <div className="why-cta">
                    <Link to="/booking" className="buy-now-btn">Buy Now</Link>
                </div>
            </section>


            <section className="promise-section animate-reveal" style={{ animationDelay: '0.8s' }}>
                <div className="promise-card">
                    <h2>எங்கள் உறுதிமொழி</h2>
                    <div className="promise-list">
                        <div className="promise-item">✅ 100% இயற்கை முறைகள்</div>
                        <div className="promise-item">✅ பக்கவிளைவுகள் அற்றது</div>
                        <div className="promise-item">✅ நிரந்தர தீர்வுகள்</div>
                    </div>
                    <Link to="/booking" className="add-more-btn">
                        <span>ஆலோசனையைத் தொடங்க ＋</span>
                    </Link>
                </div>
            </section>


            <section className="faq-section animate-reveal" style={{ animationDelay: '1.2s' }}>
                <h2 className="section-title">அடிக்கடி கேட்கப்படும் கேள்விகள்</h2>
                <div className="faq-accordion-modern">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`faq-item-modern ${activeFaq === index ? 'active' : ''}`}
                            onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                        >
                            <div className="faq-question-modern">
                                <span>{item.q}</span>
                                <span className="faq-icon-modern">{activeFaq === index ? '−' : '＋'}</span>
                            </div>
                            <div className="faq-answer-modern">
                                <div className="faq-answer-content">
                                    <p>{item.a}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="faq-footer-message">
                    <p>💡 உங்களிடம் மேலும் கேள்விகள் இருந்தால் தயங்காமல் கேட்கலாம். உங்கள் ஆரோக்கிய பயணத்தில் உங்களுக்கு வழிகாட்ட தயாராக உள்ளோம். 💯</p>
                </div>
                <div className="faq-cta">
                    <Link to="/booking" className="buy-now-btn">Buy Now</Link>
                </div>
            </section>

            <section className="final-note-section animate-reveal">
                <div className="note-card-footer">
                    <h3>⚠️ குறிப்பு:</h3>
                    <p>👉 விதைகள் 8–12 மணி நேரம் மட்டும் வைத்திருக்கவும்</p>
                    <p>👉 மீண்டும் அதே விதையை பயன்படுத்த வேண்டாம்</p>
                </div>

                <div className="closing-hook-footer">
                    <h3>💥 உங்கள் ஆரோக்கியம் — உங்கள் கைகளில்!</h3>
                    <p>👉 இன்று முதல் தொடங்குங்கள்</p>
                    <p>👉 இயற்கை வழியில் ஆரோக்கியமான வாழ்க்கைக்கு முன்னேறுங்கள் 🌿🔥</p>
                </div>
            </section>

            <footer className="footer-modern">
                <div className="footer-glass">
                    <div className="footer-top">
                        <img src="/assets/ruby-logo.png" alt="Ruby Logo" />
                        <div className="footer-brand">
                            <h3>RUBY WELLNESS</h3>
                            <p>Natural Healing Solutions</p>
                        </div>
                    </div>
                    <div className="doctor-info">
                        <span className="prefix">தலைமை மருத்துவர்</span>
                        <h2 className="doctor-name">டாக்டர் எஸ். ராஜ்குமார்</h2>
                        <div className="signature-line"></div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2024 Ruby Wellness. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div >
    );
}

export default Landing;
