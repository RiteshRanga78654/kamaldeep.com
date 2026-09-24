'use client';
import { useState, useRef } from 'react';

export default function InteractiveCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalizing tilt: -5deg to 5deg
    const rx = ((y / rect.height) - 0.5) * -7;
    const ry = ((x / rect.width) - 0.5) * 7;

    setCoords({ x, y, rx, ry });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords({ x: 0, y: 0, rx: 0, ry: 0 });
      }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${coords.rx}deg) rotateY(${coords.ry}deg) translateY(-4px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
      }}
      className={`relative overflow-hidden rounded-2xl bg-white subtle-border transition-transform duration-300 ease-out ${className}`}
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(0,0,0,0.035), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}