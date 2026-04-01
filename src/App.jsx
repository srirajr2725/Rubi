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
    <div className="app-shell mesh-bg">
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
          <p>⚠️ இவையே உங்கள் நாள் முழுவதையும் பாதிக்கும் மிகப்பெரிய காரணங்கள். சிறிய பிரச்சினைகள்... மெதுவாக உங்கள் வாழ்க்கையின் தரத்தை குறைத்து கொண்டே இருக்கும்.</p>
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
            ✨ உங்கள் உள்ளங்கைகள் & பாதங்கள்
          </div>
          <p>இவற்றில் உங்கள் உடலின் அனைத்து உறுப்புகளையும் கட்டுப்படுத்தும் 📱 <strong>“ரிமோட் பாயிண்ட்ஸ்”</strong> உள்ளன. இதுவே Sujok மருத்துவத்தின் அடிப்படை.</p>
          <div className="remote-points">
            <p>✅ மருந்துகள் இல்லாமல்</p>
            <p>✅ பக்கவிளைவுகள் இல்லாமல்</p>
            <p>✅ யாருடைய உதவியும் இல்லாமல்</p>
            <p className="remote-final">✨ உங்கள் ஆரோக்கியத்தை நீங்களே கையாள முடியும்!</p>
          </div>
        </div>
      </section>

      <section className="solution-bridge-section animate-reveal">
        <div className="bridge-card">
          <h3 className="bridge-title">ஒரு நிமிடம் சிந்தியுங்கள்…</h3>
          <p className="bridge-intro">நீங்கள் உங்கள் பிரச்சினைகளை:</p>
          <div className="impact-grid">
            <span className="impact-item">👉 இயற்கையாக</span>
            <span className="impact-item">👉 எளிதாக</span>
            <span className="impact-item">👉 பாதுகாப்பாக</span>
          </div>
          <p className="bridge-question">தீர்க்க முடிந்தால் எப்படி இருக்கும்?</p>

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
          <div className="synergy-highlight">
            <p>விதை வைத்து மெதுவாக அழுத்தினால்: ⚡ <strong>குணப்படுத்தும் செயல்முறை</strong> துவங்கும்</p>
          </div>
          <div className="synergy-card">
            <h3>💥 இந்த 3 முறைகளையும் சேர்த்து பயன்படுத்தினால்?</h3>
            <div className="synergy-grid">
              <div className="syn-item">👉 உடல்</div>
              <div className="syn-item">👉 மனம்</div>
              <div className="syn-item">👉 ஆற்றல்</div>
            </div>
            <p className="synergy-result">மூன்றையும் ஒரே நேரத்தில் சமநிலைப்படுத்தும் 🔥 <strong>முழுமையான ஹீலிங்</strong> முறை கிடைக்கும்</p>
          </div>
        </div>

        <div className="book-specialty animate-reveal">
          <h3 className="spec-title">🌟 இந்த புத்தகத்தின் சிறப்பு:</h3>
          <div className="spec-grid">
            <div className="spec-item-modern">✔️ சிக்கலான கோட்பாடுகள் இல்லை</div>
            <div className="spec-item-modern">✔️ மருத்துவ அறிவு தேவையில்லை</div>
            <div className="spec-item-modern">✔️ யாராலும் உடனே பயன்படுத்த முடியும்</div>
          </div>

          <div className="detail-box">
            <p className="detail-header">📌 ஒவ்வொரு பிரச்சினைக்கும்:</p>
            <div className="detail-grid-modern">
              <span>👉 எப்படி செய்வது</span>
              <span>👉 எங்கே செய்வது</span>
              <span>👉 எவ்வளவு நேரம்</span>
              <span>👉 என்ன பலன்</span>
            </div>
            <p className="detail-footer">எல்லாம் தெளிவாக கொடுக்கப்பட்டுள்ளது</p>
          </div>
        </div>

        <div className="target-audience animate-reveal">
          <h3>👥 இந்த புத்தகம் யாருக்கு?</h3>
          <ul className="audience-list">
            <li>👉 தினசரி உடல் பிரச்சினைகள் உள்ளவர்களுக்கு</li>
            <li>👉 மன அழுத்தத்தில் இருப்பவர்களுக்கு</li>
            <li>👉 இயற்கை தீர்வு தேடுபவர்களுக்கு</li>
            <li>👉 குடும்பத்தினருக்கு உதவ விரும்புபவர்களுக்கு</li>
            <li>👉 ஹீலர்கள் & வெல்ல்னஸ் பிராக்டிஷனர்களுக்கு</li>
          </ul>
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
            <div className="power-tag">🔥 இதுவே — சுய குணப்படுத்தும் சக்தி</div>
            <h4 className="freedom-title">🧠 இதுவே உண்மையான சுதந்திரம்!</h4>
            <div className="freedom-points">
              <p>👉 நீங்கள் இனி அடிமை இல்லை</p>
              <p>👉 உங்கள் உடல் — உங்கள் கட்டுப்பாட்டில்</p>
            </div>
          </div>
        </div>

        <div className="family-benefit animate-reveal">
          <div className="family-card">
            <h3>👨‍👩‍👧‍👦 இந்த அறிவு உங்கள் குடும்பத்திற்கும் பயன் தரும்</h3>
            <div className="family-grid">
              <span>👉 குழந்தைகள்</span>
              <span>👉 பெற்றோர்</span>
              <span>👉 நண்பர்கள்</span>
            </div>
            <p className="lifestyle-tag">🌟 இது ஒரு புத்தகம் மட்டும் அல்ல… இது ஒரு வாழ்க்கை முறை!</p>
          </div>
        </div>

        <div className="safety-summary animate-reveal">
          <div className="safety-grid-large">
            <div className="safe-badge">✅ பாதுகாப்பானது</div>
            <div className="safe-badge">✅ அனைத்து வயதினருக்கும் ஏற்றது</div>
            <div className="safe-badge">✅ பக்கவிளைவுகள் இல்லை</div>
            <div className="safe-badge">✅ உட்கொள்ள வேண்டியதும் இல்லை</div>
          </div>
          <div className="non-invasive">💯 100% Non-Invasive Healing</div>
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
            <div className="urgent-cta">🚀 இப்போதே தொடங்குங்கள்!</div>
          </div>

          <div className="closing-thought">
            <p>💡 ஏனெனில்… வாழ்க்கையை மாற்றுவது பெரிய விஷயங்கள் அல்ல… சிறிய, சரியான தீர்வுகள்தான்! 💯</p>
          </div>
        </div>
      </main>

      <section className="why-choose-section animate-reveal">
        <h2 className="why-choose-title">🎯 ஏன் இந்த முறையைத் தேர்வு செய்ய வேண்டும்?</h2>
        <div className="why-choose-grid">
          <div className="why-item">✔️ பக்கவிளைவுகள் இல்லை</div>
          <div className="why-item">✔️ மிகவும் சிக்கனமானது</div>
          <div className="why-item">✔️ சுய மருத்துவம்</div>
          <div className="why-item">✔️ அறிவியல் அடிப்படை</div>
        </div>
      </section>

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
