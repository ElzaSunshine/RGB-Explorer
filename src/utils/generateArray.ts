import type { Color } from '../types';

const START = 0;
const FINISH = 255;

// идея 1 : выводим с большоим шагом просто в реакте
export const generateRGBArrayWithStep = (step: number | Color = 51) => {
  const redStep = typeof step === 'number' ? step : step.red;
  const greenStep = typeof step === 'number' ? step : step.green;
  const blueStep = typeof step === 'number' ? step : step.blue;

  const array = [];
  for (let i = START; i < FINISH + redStep; i += redStep) {
    for (let j = START; j < FINISH + greenStep; j += greenStep) {
      for (let k = START; k < FINISH + blueStep; k += blueStep) {
        const r = Math.min(i, FINISH);
        const g = Math.min(j, FINISH);
        const b = Math.min(k, FINISH);
        array.push([r, g, b]);
      }
    }
  }
  return array;
};

// идея 2 : делаем через генератор в реакте, но как подсказал ии, через ленивую подзагрузку
// Генератор — полезен, когда хочешь получать цвета постепенно,
// например, порциями или по мере необходимости:
function* rgbCombinations() {
  const step = 20;
  const max = FINISH + step;
  for (let i = START; i < max; i += step) {
    for (let j = START; j < max; j += step) {
      for (let k = START; k < max; k += step) {
        const r = Math.min(i, FINISH);
        const g = Math.min(j, FINISH);
        const b = Math.min(k, FINISH);

        yield [r, g, b];

        if (r === FINISH && g === FINISH && b === FINISH) return;
      }
    }
  }
}
// const generator = rgbCombinations();
// console.log(generator.next().value)
// console.log(generator.next().value)

// идея 3 : пробуем в канвас с Обычным
