import { useEffect, useRef } from 'react';
const STEP = 51;
const CELL_SIZE = 24;
const GAP = 4;
const COLUMNS = 18;
export const CanvasGrid = () => {
  const canvasRef = useRef(null);

  // Рисуем RGB-палитру
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const colors = [];

    // Создаём все комбинации RGB
    for (let r = 0; r <= 255; r += STEP) {
      for (let g = 0; g <= 255; g += STEP) {
        for (let b = 0; b <= 255; b += STEP) {
          colors.push([r, g, b]);
        }
      }
    }

    const rows = Math.ceil(colors.length / COLUMNS);
    const cellWithGap = CELL_SIZE + GAP;

    canvas.width = COLUMNS * cellWithGap - GAP;
    canvas.height = rows * cellWithGap - GAP;

    // Закрашиваем каждый квадрат своим цветом
    colors.forEach((color, index) => {
      const column = index % COLUMNS;
      const row = Math.floor(index / COLUMNS);

      const x = column * cellWithGap;
      const y = row * cellWithGap;

      ctx.fillStyle = `rgb(${color.join(', ')})`;
      ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        maxWidth: '100%',
        width: '400px',
        height: 'auto',
        cursor: 'pointer',
      }}
    />
  );
};
