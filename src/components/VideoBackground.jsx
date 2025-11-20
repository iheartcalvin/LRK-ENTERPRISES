import React from 'react';
import '../App.css';

export const VideoBackground = ({ children }) => {
  return (
    <div className="video-wrapper">
      <video
        className="video-bg"
        autoPlay
        muted
        loop
        playsInline
        poster="/videos/maasai banner.jpg"   // fallback image in public/
        preload="auto"
      >
        <source src="/videos/edit1.mp4" type="video/mp4" />
        <source src="/videos/maasai-banner-video.webm" type="video/webm" />
        Your browser does not support video.
      </video>
      <div className="video-overlay">{children}</div>
    </div>
  );
};