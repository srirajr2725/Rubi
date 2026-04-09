import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Booking from './pages/Booking';
import Success from './pages/Success';
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
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Router>
      <div className="modern-timer-card visible">
        <div className="timer-content">
          <span className="timer-label-tamil">சலுகை முடிய:</span>
          <span className="danger-icon animate-pulse">⚠️</span>
          <span className="timer-countdown">{formatTime(timeLeft)}</span>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;