import React, { useState, useEffect } from 'react';
import { VideoBackground } from './components/VideoBackground';
import './App.css';

function Head() {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const fullText = "Your Trusted Partner for Industrial Supply, Repair, and Fabrication";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(typing);
        setTimeout(() => setShowCursor(false), 1200); // hide cursor after finish
      }
    }, 65); // smooth speed

    return () => clearInterval(typing);
  }, []);

  return (
    <VideoBackground>
      <div className="content">
        <div className="title">
          <div className="titlelogo" />
          <h1>ENTERPRISES</h1>
        </div>

        {/* TYPING ANIMATION - LOOKS INSANE ON VIDEO BACKGROUND */}
        <h3 className="typing-hero">
          {typedText}
          {showCursor && <span className="cursor">|</span>}
        </h3>
      </div>
    </VideoBackground>
  );
}

export default Head;