import type { RGB } from '../../types';
import { fromRGBToHEX, fromRGBToHSL } from '../../utils/utils';
import styles from './SelectedColor.module.scss';

type SelectedColorProps = {
  color: RGB | null;
};
export const SelectedColor = ({ color }: SelectedColorProps) => {
  if (!color) {
    return null;
  }

  const background = { backgroundColor: `rgb(${color.join(', ')})` };
  const rgb = `rgb(${color.join(', ')})`;
  const hex = fromRGBToHEX(color);
  const { h, s, l } = fromRGBToHSL(color);
  const hsl = `hsl(${h}, ${s}%, ${l}%)`;

  return (
    <section className={styles.root}>
      <div className={styles.preview} style={background} />

      <div className={styles.info}>
        <div className={styles.group}>
          <p className={styles.label}>RGB</p>
          <p className={styles.value}>{rgb}</p>
        </div>
        <div className={styles.group}>
          <p className={styles.label}>HEX</p>
          <p className={styles.value}>{hex}</p>
        </div>
        <div className={styles.group}>
          <p className={styles.label}>HSL</p>
          <p className={styles.value}>{hsl}</p>
        </div>
      </div>

      <button className={styles.copyButton} type="button">
        <span aria-hidden="true">▢</span>
        Копировать
      </button>
    </section>
  );
};
