import { useMemo, useState } from 'react';
import styles from './App.module.scss';
import { generateRGBArrayWithStep } from './utils/generateArray';
import { SelectedColor } from './components/SelectedColor/SelectedColor';
import { toRGBString } from './utils/utils';
import RGBSeparately from './components/SelectedColor/components/RGBSeparately/RGBSeparately';
import Header from './components/Header/Header';
import { DEFAULT_STEP, DEFAULT_STEP_RGB, OPTIONS } from './consts';
import type { Color, ColorChannel, RGB, StepMode } from './types';

function App() {
  const [selectedColor, setSelectedColor] = useState<RGB | null>(null);
  const [selectedColorString, setSelectedColorString] = useState('');
  const [stepMode, setStepMode] = useState<StepMode>('general');
  const [size, setSize] = useState<number | null>(OPTIONS[0]);
  const [generalStep, setGeneralStep] = useState<number>(DEFAULT_STEP);
  const [rgbStep, setRgbStep] = useState<Color>(DEFAULT_STEP_RGB);

  const blocks = useMemo(() => {
    if (stepMode === 'general') {
      return generateRGBArrayWithStep(generalStep);
    }

    return generateRGBArrayWithStep(rgbStep);
  }, [stepMode, generalStep, rgbStep]);

  const handleChangeSize = (value: number | null) => {
    setSize(value);
  };
  const resetRgbStep = () => {
    setRgbStep(DEFAULT_STEP_RGB);
  };
  const handleChangeStep = (value: number) => {
    setStepMode('general');
    resetRgbStep();
    setGeneralStep(value);
  };
  const handleChangeRgbStep = ({ color, value }: { color: ColorChannel; value: number }) => {
    setStepMode('custom');
    setGeneralStep(DEFAULT_STEP);
    setRgbStep((prev) => ({ ...prev, [color]: value }));
  };

  const handleClick = (e) => {
    const block = e.target.closest(`.${styles.block}`);
    if (!block || !e.currentTarget.contains(block)) {
      return;
    }
    const colorString = block.dataset.color;
    const color = colorString.split(', ').map(Number);
    setSelectedColor(color);
    setSelectedColorString(colorString);
  };

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <Header
          size={size}
          generalStep={generalStep}
          rgbStep={rgbStep}
          resetRgbStep={resetRgbStep}
          handleChangeSize={handleChangeSize}
          handleChangeStep={handleChangeStep}
          handleChangeRgbStep={handleChangeRgbStep}
        />
        <div className={styles.card}>
          <div className={styles.grid} onClick={handleClick}>
            {blocks.map((colors, index) => {
              const colorsString = colors.join(', ');
              const rgbString = toRGBString(colorsString);
              return (
                <div
                  key={index}
                  className={
                    selectedColorString === colorsString ? styles.blockActive : styles.block
                  }
                  data-color={colorsString}
                  style={{
                    background: rgbString,
                    '--square-color': rgbString,
                    height: `${size}px`,
                    width: `${size}px`,
                    borderRadius: size / 6,
                  }}
                ></div>
              );
            })}
          </div>
        </div>
        <SelectedColor color={selectedColor} />
        <RGBSeparately color={selectedColor} lightness={selectedColor?.[2]} />
        {/* <CanvasGrid/> */}
      </div>
    </section>
  );
}

export default App;
