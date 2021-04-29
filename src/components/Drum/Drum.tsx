import React from 'react';
import { DrumType } from '../../utils/DrumType';

export type DrumProps = Omit<DrumType, 'price'|'id'>;

export const Drum: React.FC<DrumProps> = ({ diameter, height, shellColor, headColor, snare }) => {

  const mult = 30;

  const styles: React.CSSProperties = {
    width: diameter * mult,
    height: height * mult,
    backgroundColor: shellColor,
    borderTop: `5px solid ${headColor}`,
    borderBottom: snare ? `2px solid gray` : 'none',
  }

  return <div style={styles}></div>;
}