'use client';
import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, delay = 0, yOffset = 24, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: '750ms',
        transitionDelay: `${delay}ms`,
        transform: isVisible ? 'translateY(0)' : `translateY(${yOffset}px)`,
        opacity: isVisible ? 1 : 0,
      }}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
    >
      {children}
    </div>
  );
}