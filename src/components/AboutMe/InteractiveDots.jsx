import { useEffect, useRef, useCallback } from 'react';

const InteractiveDots = ({
  dotColor = '#0D1130',
  gridSpacing = 34,
  animationSpeed = 0.005,
}) => {
  const canvasRef = useRef(null);
  const timeRef = useRef(0);
  const animationFrameId = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const ripples = useRef([]);
  const dotsRef = useRef([]);

  const getMouseInfluence = (x, y) => {
    const dx = x - mouseRef.current.x;
    const dy = y - mouseRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 150;
    return Math.max(0, 1 - distance / maxDistance);
  };

  const getRippleInfluence = (x, y, currentTime) => {
    let total = 0;
    ripples.current.forEach((ripple) => {
      const age = currentTime - ripple.time;
      const maxAge = 3000;
      if (age < maxAge) {
        const dx = x - ripple.x;
        const dy = y - ripple.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const rippleRadius = (age / maxAge) * 320;
        const rippleWidth = 60;
        if (Math.abs(distance - rippleRadius) < rippleWidth) {
          const strength = (1 - age / maxAge) * ripple.intensity;
          const proximity = 1 - Math.abs(distance - rippleRadius) / rippleWidth;
          total += strength * proximity;
        }
      }
    });
    return Math.min(total, 2);
  };

  const initializeDots = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const dots = [];
    for (let x = gridSpacing / 2; x < w; x += gridSpacing) {
      for (let y = gridSpacing / 2; y < h; y += gridSpacing) {
        dots.push({ x, y, originalX: x, originalY: y, phase: Math.random() * Math.PI * 2 });
      }
    }
    dotsRef.current = dots;
  }, [gridSpacing]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const dpr = window.devicePixelRatio || 1;
    const w = parent.clientWidth;
    const h = parent.clientHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    initializeDots();
  }, [initializeDots]);

  // Listen on window so the effect reacts everywhere on the page,
  // even when the cursor is over text, buttons, or cards above the canvas.
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  const handleMouseLeaveWindow = useCallback(() => {
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
  }, []);

  const handleMouseDown = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Only ripple if the click landed within the canvas bounds
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

    ripples.current.push({ x, y, time: Date.now(), intensity: 2 });
    const now = Date.now();
    ripples.current = ripples.current.filter((r) => now - r.time < 3000);
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    timeRef.current += animationSpeed;
    const currentTime = Date.now();
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    ctx.clearRect(0, 0, w, h);

    const red = parseInt(dotColor.slice(1, 3), 16);
    const green = parseInt(dotColor.slice(3, 5), 16);
    const blue = parseInt(dotColor.slice(5, 7), 16);

    dotsRef.current.forEach((dot) => {
      const mouseInfluence = getMouseInfluence(dot.originalX, dot.originalY);
      const rippleInfluence = getRippleInfluence(dot.originalX, dot.originalY, currentTime);
      const totalInfluence = mouseInfluence + rippleInfluence;

      dot.x = dot.originalX;
      dot.y = dot.originalY;

      const dotSize = 1.4 + totalInfluence * 5.2 + Math.sin(timeRef.current + dot.phase) * 0.35;
      const opacity = Math.max(
        0.08,
        0.16 + totalInfluence * 0.55 + Math.abs(Math.sin(timeRef.current * 0.5 + dot.phase)) * 0.06
      );

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
      ctx.fill();
    });

    animationFrameId.current = requestAnimationFrame(animate);
  }, [dotColor, animationSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    resizeCanvas();

    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    resizeObserver.observe(parent);
    window.addEventListener('resize', resizeCanvas);

    // window-level listeners = works everywhere on the page, not just on canvas hover
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    animate();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      timeRef.current = 0;
      ripples.current = [];
      dotsRef.current = [];
    };
  }, [animate, resizeCanvas, handleMouseMove, handleMouseDown, handleMouseLeaveWindow]);

  return <canvas ref={canvasRef} className="jg-dots-canvas" />;
};

export default InteractiveDots;