import type { RGB } from '../types';

export const toRGBString = (value: string) => {
  return `rgb(${value})`;
};

export const fromRGBToHEX = ([r, g, b]: RGB) => {
  return (
    '#' + [r, g, b].map((value) => value.toString(16).padStart(2, '0')).join('')
  ).toUpperCase();
};

export const fromRGBToHSL = ([r, g, b]: RGB) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};
