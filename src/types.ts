export type RGB = [number, number, number];
export type Color = {
  red: number;
  green: number;
  blue: number;
};
export type ColorChannel = keyof Color;
export type StepMode = 'general' | 'custom';
