import useCanvasCursor from '../../hooks/useCanvasCursor';

const CanvasCursor = () => {
  useCanvasCursor();

  return (
    <canvas
      aria-hidden='true'
      id='canvas'
      style={{
        display: 'block',
        inset: 0,
        height: '100vh',
        left: 0,
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        width: '100vw',
        zIndex: 9999,
      }}
    />
  );
};
export default CanvasCursor;

