import { DEFAULT_STEP, MAX_STEP, MIN_STEP, OPTIONS, thumbSize } from '../../consts';
import type { ColorChannel } from '../../types';
import styles from './Header.module.scss';
import { Button, Select, Slider } from '@mantine/core';

interface HeaderProps {
  size: number | null;
  handleChangeSize: (size: number | null) => void;
  rgbStep: {
    red: number;
    green: number;
    blue: number;
  };
  generalStep: number;
  handleChangeStep: (step: number) => void;
  resetRgbStep: () => void;
  handleChangeRgbStep: ({ color, value }: { color: ColorChannel; value: number }) => void;
}
const Header = ({
  size,
  handleChangeSize,
  rgbStep,
  generalStep,
  resetRgbStep,
  handleChangeStep,
  handleChangeRgbStep,
}: HeaderProps) => {
  return (
    <div className={styles.root}>
      <h2>RGB Explorer</h2>
      <p>Нажми на любой цвет, чтобы увидеть его значения</p>

      <div className={styles.slider}>
        <Select
          label="Размер сетки"
          placeholder="Выберите размер"
          data={OPTIONS}
          value={size}
          onChange={handleChangeSize}
        />
      </div>
      <div className={styles.slider}>
        <div>Общий шаг цветов</div>
        <Slider
          thumbSize={thumbSize}
          defaultValue={DEFAULT_STEP}
          min={MIN_STEP}
          max={MAX_STEP}
          value={generalStep}
          onChange={handleChangeStep}
        />
      </div>
      <div className={styles.slider}>
        <div>Шаг цвета Red</div>
        <Slider
          thumbSize={thumbSize}
          defaultValue={DEFAULT_STEP}
          min={MIN_STEP}
          max={MAX_STEP}
          value={rgbStep.red}
          onChange={(step: number) => handleChangeRgbStep({ color: 'red', value: step })}
        />
      </div>
      <div className={styles.slider}>
        <div>Шаг цвета Green</div>
        <Slider
          thumbSize={thumbSize}
          defaultValue={DEFAULT_STEP}
          min={MIN_STEP}
          max={MAX_STEP}
          value={rgbStep.green}
          onChange={(step: number) => handleChangeRgbStep({ color: 'green', value: step })}
        />
      </div>
      <div className={styles.slider}>
        <div>Шаг цвета Blue</div>
        <Slider
          thumbSize={thumbSize}
          defaultValue={DEFAULT_STEP}
          min={MIN_STEP}
          max={MAX_STEP}
          value={rgbStep.blue}
          onChange={(step: number) => handleChangeRgbStep({ color: 'blue', value: step })}
        />
      </div>
      <Button
        variant="gradient"
        gradient={{ from: 'red', to: 'indigo', deg: 137 }}
        onClick={resetRgbStep}
      >
        Сбросить
      </Button>
    </div>
  );
};

export default Header;
