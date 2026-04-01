import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedEndTime = localStorage.getItem('rubyTimerEndTime');
    const now = Date.now();

    if (savedEndTime) {
      const remaining = Math.max(0, Math.floor((parseInt(savedEndTime) - now) / 1000));
      return remaining;
    } else {
      const initialTime = 600;
      const endTime = now + initialTime * 1000;
      localStorage.setItem('rubyTimerEndTime', endTime.toString());
      return initialTime;
    }
  });

  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const scrollTimeout = useRef(null);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll detection logic
  useEffect(() => {
    const handleScroll = () => {
      setIsTimerVisible(true);

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        setIsTimerVisible(false);
      }, 2000); // Hide after 2 seconds of no scrolling
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / 600) * 100;

  return (
    <div className="app mobile-shell mesh-bg">
      <div className={`modern-timer-card ${isTimerVisible ? 'visible' : ''}`}>
        <div className="timer-header">
          {timeLeft > 0 ? '✨ சிறந்த சலுகை விலை ✨' : '⌛ சலுகை காலம் முடிந்தது ⌛'}
        </div>
        <div className="timer-content">
          <span className="danger-icon animate-pulse">⚠️</span>
          <span className="timer-countdown">{formatTime(timeLeft)}</span>
        </div>
        <div className="timer-progress-track">
          <div className="timer-progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <header className="premium-header">
        <div className="header-glass">
          <img src="/assets/ruby-logo.png" alt="Ruby Logo" className="animate-float" />
          <div className="brand-info">
            <h1 className="shine-text">RUBY WELLNESS</h1>
            <span className="tagline">இயற்கை வாழ்வியல் மையம்</span>
          </div>
        </div>
      </header>

      <section className="hero-modern animate-reveal">
        <div className="hero-content">
          <div className="hero-badge">BEST NATURAL HEALING 2024</div>
          <h2 className="title-large">✨ உங்கள் வாழ்க்கையை பாதிப்பது <br /> <span className="highlight">சிறிய பிரச்சினைகள்தான்!</span></h2>
          <p className="description">பெரிய நோய்கள் அல்ல... தினமும் உங்களை மெதுவாக சோர்வடையச் செய்யும் சிறிய விஷயங்களே உங்கள் வாழ்வின் தரத்தைக் குறைக்கின்றன.</p>
        </div>
      </section>

      <section className="pain-points-section animate-reveal">
        <h2 className="section-title">நீங்கள் கவனித்திருக்கிறீர்களா?</h2>
        <div className="pain-points-grid">
          {[
            { icon: '💆‍♂️', text: 'தலைவலி' },
            { icon: '😫', text: 'சோர்வு' },
            { icon: '🧠', text: 'மன அழுத்தம்' },
            { icon: '🤢', text: 'செரிமான கோளாறு' },
            { icon: '😴', text: 'தூக்கமின்மை' },
            { icon: '🦴', text: 'உடல் வலி' },
            { icon: '🤧', text: 'குளிர், இருமல்' },
            { icon: '🔥', text: 'உடல் சூடு' },
            { icon: '😟', text: 'கவலை' }
          ].map((item, index) => (
            <div key={index} className="pain-point-card">
              <span className="pain-icon">{item.icon}</span>
              <span className="pain-text">{item.text}</span>
            </div>
          ))}
        </div>
        <div className="pain-warning">
          <p>⚠️ இவையே உங்கள் நாள் முழுவதையும் பாதிக்கும் மிகப்பெரிய காரணங்கள்.</p>
        </div>
      </section>

      <section className="remote-control-section animate-reveal">
        <div className="remote-card">
          <div className="remote-icon">📱</div>
          <h2>உங்கள் உடலுக்கான ரிமோட்</h2>
          <p>TV, Fan, AC எல்லாவற்றுக்கும் ரிமோட் உள்ளது. உங்கள் உடலுக்கும் உண்டு!</p>
          <div className="remote-highlight">
            ✨ உங்கள் உள்ளங்கைகள் & பாதங்கள்
          </div>
          <p>இவற்றில் உங்கள் உடலின் அனைத்து உறுப்புகளையும் கட்டுப்படுத்தும் 🔑 <strong>“ரிமோட் பாயிண்ட்ஸ்”</strong> உள்ளன. இதுவே Sujok மருத்துவத்தின் அடிப்படை.</p>
        </div>
      </section>

      <main className="therapy-section animate-reveal">
        <div className="section-header">
          <h2 className="section-title">3 சக்திவாய்ந்த முறைகள்</h2>
        </div>
        <div className="slider-container">
          <div className="therapy-slider ultra-modern" ref={sliderRef}>
            <div className="glass-card">
              <div className="glass-image">
                <img src="/assets/color-therapy.png" alt="Color Therapy" />
                <div className="image-overlay"></div>
              </div>
              <div className="glass-content">
                <h3>Color Therapy (நிற சிகிச்சை)</h3>
                <span className="glass-label">மனதை அமைதிப்படுத்த</span>
                <p>ஒவ்வொரு நிறமும் ஒரு அதிர்வு. உடல் சூட்டை குறைக்கவும், சக்தியை அதிகரிக்கவும் உதவுகிறது.</p>
              </div>
            </div>

            <div className="glass-card">
              <div className="glass-image">
                <img src="/assets/number-therapy.png" alt="Number Therapy" />
                <div className="image-overlay"></div>
              </div>
              <div className="glass-content">
                <h3>Number Therapy (எண் சிகிச்சை)</h3>
                <span className="glass-label">ஆற்றல் மாற்றம்</span>
                <p>எண்கள் வெறும் கணக்கு அல்ல, ஒரு ஆற்றல். சரியான எண் - சரியான மாற்றம் தரும்.</p>
              </div>
            </div>

            <div className="glass-card">
              <div className="glass-image">
                <img src="/assets/seed-therapy.png" alt="Seed Therapy" />
                <div className="image-overlay"></div>
              </div>
              <div className="glass-content">
                <h3>Seed Therapy (விதை சிகிச்சை)</h3>
                <span className="glass-label">இயற்கை அழுத்தம்</span>
                <p>கைகள் & கால்களில் உள்ள புள்ளிகளில் விதை வைத்து அழுத்தினால் குணப்படுத்தும் செயல்முறை துவங்கும்.</p>
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
      </main>

      <section className="book-promo-section animate-reveal">
        <div className="book-card">
          <div className="book-badge">புதிய வெளியீடு</div>
          <h2 className="book-title">20 தினசரி வாழ்க்கை பிரச்சினைகள் – 100 இயற்கை குணப்படுத்தும் தீர்வுகள்</h2>
          <p className="book-subtitle">இது ஒரு சாதாரண புத்தகம் அல்ல, உங்கள் தினசரி வாழ்க்கைக்கான சக்திவாய்ந்த ஹீலிங் கையேடு.</p>
          <div className="book-features">
            <div className="feature">✅ மருந்துகள் இல்லை</div>
            <div className="feature">✅ பக்கவிளைவுகள் இல்லை</div>
            <div className="feature">✅ 100% பாதுகாப்பானது</div>
          </div>
          <button className="cta-btn primary-btn pulse-glow">இப்போதே ஆர்டர் செய்யுங்கள்</button>
          <p className="seed-note">⚠️ குறிப்பு: விதைகள் 8–12 மணி நேரம் மட்டும் வைத்திருக்கவும். மீண்டும் பயன்படுத்த வேண்டாம்.</p>
        </div>
      </section>

      <section className="specialties-section animate-reveal" style={{ animationDelay: '1.0s' }}>
        <h2 className="section-title">எங்கள் சிறப்புகள்</h2>
        <div className="specialties-grid">
          <div className="specialty-card">
            <span className="spec-icon">🧠</span>
            <h3>மன அழுத்தம்</h3>
            <p>மன அமைதி மற்றும் தெளிவான சிந்தனை.</p>
          </div>
          <div className="specialty-card">
            <span className="spec-icon">😴</span>
            <h3>தூக்கமின்மை</h3>
            <p>ஆழ்ந்த மற்றும் நிம்மதியான உறக்கம்.</p>
          </div>
          <div className="specialty-card">
            <span className="spec-icon">🍽️</span>
            <h3>செரிமானம்</h3>
            <p>சிறந்த செரிமான மண்டலம் மற்றும் ஆரோக்கியம்.</p>
          </div>
          <div className="specialty-card">
            <span className="spec-icon">💪</span>
            <h3>உடல் வலி</h3>
            <p>உடல் சோர்வு மற்றும் வலிகளில் இருந்து விடுதலை.</p>
          </div>
          <div className="specialty-card">
            <span className="spec-icon">✨</span>
            <h3>சரும பராமரிப்பு</h3>
            <p>இயற்கையான முறையில் ஜொலிக்கும் சருமம்.</p>
          </div>
          <div className="specialty-card">
            <span className="spec-icon">⚖️</span>
            <h3>உடல் எடை</h3>
            <p>ஆரோக்கியமான முறையில் எடையைக் குறைத்தல்.</p>
          </div>
        </div>
      </section>

      <section className="faq-section animate-reveal" style={{ animationDelay: '1.2s' }}>
        <h2 className="section-title">அடிக்கடி கேட்கப்படும் கேள்விகள்</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h4>கேள்வி: இது 100% இயற்கையானதா?</h4>
            <p>பதில்: ஆம், எங்களது அனைத்து சிகிச்சைகளும் 100% இயற்கை முறைகளை அடிப்படையாகக் கொண்டவை.</p>
          </div>
          <div className="faq-item">
            <h4>கேள்வி: பக்கவிளைவுகள் ஏற்படுமா?</h4>
            <p>பதில்: இல்லை, இயற்கை முறையைப் பின்பற்றுவதால் எந்தவிதமான பக்கவிளைவுகளும் ஏற்படாது.</p>
          </div>
          <div className="faq-item">
            <h4>கேள்வி: பலன் கிடைக்க எவ்வளவு காலம் ஆகும்?</h4>
            <p>பதில்: ஒவ்வொருவரின் உடல் நிலையைப் பொறுத்து மாற்றம் தெரியும். பொதுவாக சில நாட்களிலேயே நல்ல முன்னேற்றம் கிடைக்கும்.</p>
          </div>
        </div>
      </section>

      <footer className="luxury-footer animate-reveal">
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
    </div>
  );
}

export default App;
