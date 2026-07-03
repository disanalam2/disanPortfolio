import React, { useState, useEffect } from 'react';

const MediaCarousel = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Agar media nahi hai ya sirf 1 hi image/video hai to interval run mat karo
    if (!media || media.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, 3000); // 3 seconds me change hoga

    return () => clearInterval(interval);
  }, [media]);

  if (!media || media.length === 0) return null;

  const currentMedia = media[currentIndex];

  return (
    <div className="project-media-carousel">
      {currentMedia.type === 'video' ? (
        <video 
          src={currentMedia.url} 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="carousel-media video" 
        />
      ) : (
        <img 
          src={currentMedia.url} 
          alt="Project showcase screenshot" 
          loading="lazy"
          className="carousel-media image" 
          key={currentMedia.url} // Key add karne se fade animation sahi se trigger hota hai
        />
      )}

      {/* Niche ke indicator dots */}
      {media.length > 1 && (
        <div className="carousel-dots">
          {media.map((_, idx) => (
            <span 
              key={idx} 
              className={`dot ${idx === currentIndex ? 'active' : ''}`} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaCarousel;