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
          <h2 className="title-large">20 அன்றாட வாழ்க்கை சிக்கல்கள் <br /> <span className="highlight">100 இயற்கை தீர்வுகள்</span></h2>
          <p className="description">பாரம்பரிய முறைகளை நவீன வடிவில் அனுபவியுங்கள்.</p>
        </div>
      </section>

      <section className="trust-badges animate-reveal" style={{ animationDelay: '0.2s' }}>
        <div className="badge-item">
          <span className="badge-icon">🌿</span>
          <span>100% இயற்கை</span>
        </div>
        <div className="badge-item">
          <span className="badge-icon">✅</span>
          <span>உறுதிப்படுத்தப்பட்டது</span>
        </div>
        <div className="badge-item">
          <span className="badge-icon">🏠</span>
          <span>வீட்டுத் தீர்வுகள்</span>
        </div>
      </section>

      <main className="therapy-section animate-reveal" style={{ animationDelay: '0.4s' }}>
        <div className="slider-container">
          <div className="therapy-slider ultra-modern" ref={sliderRef}>
            <div className="glass-card">
              <div className="glass-image">
                <img src="/assets/color-therapy.png" alt="வண்ண சிகிச்சை" />
                <div className="image-overlay"></div>
              </div>
              <div className="glass-content">
                <h3>வண்ண சிகிச்சை</h3>
                <span className="glass-label">COLOR THERAPY</span>
                <p>வண்ணங்களின் ஆற்றல் மூலம் மனதை அமைதிப்படுத்துங்கள்.</p>
              </div>
            </div>

            <div className="glass-card">
              <div className="glass-image">
                <img src="/assets/number-therapy.png" alt="எண் சிகிச்சை" />
                <div className="image-overlay"></div>
              </div>
              <div className="glass-content">
                <h3>எண் சிகிச்சை</h3>
                <span className="glass-label">NUMBER THERAPY</span>
                <p>எண்களின் அதிர்வுகள் மூலம் ஆரோக்கியத்தை மேம்படுத்துங்கள்.</p>
              </div>
            </div>

            <div className="glass-card">
              <div className="glass-image">
                <img src="/assets/seed-therapy.png" alt="விதை சிகிச்சை" />
                <div className="image-overlay"></div>
              </div>
              <div className="glass-content">
                <h3>விதை சிகிச்சை</h3>
                <span className="glass-label">SEED THERAPY</span>
                <p>இயற்கை விதைகளின் மருத்துவ குணங்களை உணருங்கள்.</p>
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

      <section className="info-section animate-reveal" style={{ animationDelay: '0.6s' }}>
        <h2 className="section-title">சிகிச்சை முறைகள்</h2>
        <div className="process-grid">
          <div className="process-card">
            <div className="process-num">01</div>
            <h3>ஆலோசனை</h3>
            <p>உங்கள் உடல் நிலை குறித்த விரிவான ஆலோசனை.</p>
          </div>
          <div className="process-card">
            <div className="process-num">02</div>
            <h3>சிகிச்சை</h3>
            <p>இயற்கை முறையில் எளிய மற்றும் சிறந்த தீர்வுகள்.</p>
          </div>
          <div className="process-card">
            <div className="process-num">03</div>
            <h3>புத்துணர்வு</h3>
            <p>முழுமையான ஆரோக்கியம் மற்றும் புது தெம்பு.</p>
          </div>
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
          <button className="add-more-btn">
            <span>ஆலோசனையைத் தொடங்க ＋</span>
          </button>
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
