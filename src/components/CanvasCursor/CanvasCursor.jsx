import { useRef } from 'react';
import useCanvasCursor from '../../hooks/useCanvasCursor';

const CanvasCursor = () => {
  const canvasRef = useRef(null);
  useCanvasCursor(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60]"
      id="canvas-cursor"
      style={{ mixBlendMode: 'screen', opacity: 0.9 }}
    />
  );
};

export default CanvasCursor;
