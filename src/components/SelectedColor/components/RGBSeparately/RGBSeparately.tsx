import { Slider } from '@mantine/core';
import type { RGB } from '../../../../types';
import { toRGBString } from '../../../../utils/utils';
import styles from './RGBSeparately.module.scss';
import { thumbSize } from '../../../../consts';

type RGBSeparatelyProps = {
  color: RGB | null;
  lightness: number;
};
const RGBSeparately = ({ color: colorValue, lightness }: RGBSeparatelyProps) => {
  const colors = colorValue
    ? [
        {
          letter: 'R',
          value: colorValue[0],
          valueFull: `${colorValue[0]}, 0, 0`,
        },
        {
          letter: 'G',
          value: colorValue[1],
          valueFull: `0, ${colorValue[1]}, 0`,
        },
        {
          letter: 'B',
          value: colorValue[2],
          valueFull: `0, 0, ${colorValue[2]}`,
        },
      ]
    : [];

  return (
    <div className={styles.root}>
      {colors.map((color) => {
        return (
          <div className={styles.values}>
            <div className={styles.letter}>{color.letter}</div>
            <div className={styles.value}>{color.value}</div>
            <span
              className={styles.valueFull}
              style={{ background: toRGBString(color.valueFull) }}
            ></span>
          </div>
        );
      })}
      <div>Яркость</div>
      <Slider
        thumbSize={thumbSize}
        defaultValue={20}
        min={0}
        max={100}
        value={lightness}
        onChange={() => {}}
      />
    </div>
  );
};

export default RGBSeparately;
