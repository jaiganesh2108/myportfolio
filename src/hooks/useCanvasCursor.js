import { useEffect } from 'react';

const useCanvasCursor = canvasRef => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    if (!context) return undefined;

    const devicePixelRatio = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

    let animationFrameId = 0;
    let isVisible = false;
    let width = 0;
    let height = 0;

    const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.28 };
    const follower = { x: pointer.x, y: pointer.y };
    const trail = Array.from({ length: 6 }, () => ({ x: pointer.x, y: pointer.y }));

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.round(width * devicePixelRatio);
      canvas.height = Math.round(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const setPointer = (x, y) => {
      pointer.x = x;
      pointer.y = y;
      isVisible = true;
    };

    const handleMouseMove = event => {
      setPointer(event.clientX, event.clientY);
    };

    const handleTouchMove = event => {
      if (!event.touches || event.touches.length === 0) return;
      const touch = event.touches[0];
      setPointer(touch.clientX, touch.clientY);
    };

    const handlePointerLeave = () => {
      isVisible = false;
    };

    const updateTrail = () => {
      const easing = 0.22;

      follower.x += (pointer.x - follower.x) * easing;
      follower.y += (pointer.y - follower.y) * easing;

      trail[0].x = follower.x;
      trail[0].y = follower.y;

      for (let index = 1; index < trail.length; index += 1) {
        const previous = trail[index - 1];
        const current = trail[index];
        const drift = 0.18 - index * 0.015;
        current.x += (previous.x - current.x) * drift;
        current.y += (previous.y - current.y) * drift;
      }
    };

    const drawCursor = () => {
      context.clearRect(0, 0, width, height);

      if (!isVisible) return;

      context.save();
      context.globalCompositeOperation = 'screen';
      context.lineCap = 'round';
      context.lineJoin = 'round';

      for (let index = trail.length - 1; index > 0; index -= 1) {
        const current = trail[index];
        const previous = trail[index - 1];
        const alpha = Math.max(0.04, 0.2 - index * 0.025);
        const radius = Math.max(2, 10 - index * 1.2);

        context.beginPath();
        context.moveTo(previous.x, previous.y);
        context.lineTo(current.x, current.y);
        context.strokeStyle = index % 2 === 0 ? `rgba(204, 255, 0, ${alpha})` : `rgba(34, 211, 238, ${alpha * 0.7})`;
        context.lineWidth = radius * 0.55;
        context.stroke();
      }

      const head = trail[0];
      const halo = context.createRadialGradient(head.x, head.y, 0, head.x, head.y, 36);
      halo.addColorStop(0, 'rgba(204,255,0,0.34)');
      halo.addColorStop(0.4, 'rgba(34,211,238,0.12)');
      halo.addColorStop(1, 'rgba(34,211,238,0)');

      context.beginPath();
      context.fillStyle = halo;
      context.arc(head.x, head.y, 16, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.fillStyle = 'rgba(245, 245, 245, 0.72)';
      context.arc(head.x, head.y, 2.4, 0, Math.PI * 2);
      context.fill();

      context.restore();
    };

    const animate = () => {
      updateTrail();
      drawCursor();
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const start = () => {
      cancelAnimationFrame(animationFrameId);
      animate();
    };

    resizeCanvas();
    start();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
      context.clearRect(0, 0, width, height);
    };
  }, [canvasRef]);
};

export default useCanvasCursor;
