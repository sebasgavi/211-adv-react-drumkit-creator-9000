import React from 'react';
import { DrumType } from '../../utils/DrumType';
import { Drum } from '../Drum/Drum';
import { CheckboxField } from '../Fields/CheckboxField';
import { ColorField } from '../Fields/ColorField';
import { RangeField } from '../Fields/RangeField';

interface DrumCreatorProps {

}

export const DrumCreator: React.FC<DrumCreatorProps> = () => {

  const [ tab, setTab ] = React.useState<'size'|'colors'|'other'>('size');

  const [ drum, setDrum ] = React.useState<DrumType>({
    diameter: 10,
    height: 5,
    headColor: '#fff',
    shellColor: '#000',
    snare: false,
    price: 412312,
  });

  const getHandleChange = (key: keyof DrumType) => {
    return (value: any) => {
      setDrum((prev) => ({
        ...prev,
        [key]: value
      }));
    }
  }

  /* const handleDiameterChange = (value: number) => {
    setDrum((prev) => ({
      ...prev,
      diameter: value
    }));
  }

  const handleHeightChange = (height: number) => {
    setDrum((prev) => ({ ...prev, height }));
  }

  const handleHeadChange = (headColor: string) => {
    setDrum((prev) => ({ ...prev, headColor }));
  }

  const handleShellChange = (shellColor: string) => {
    setDrum((prev) => ({ ...prev, shellColor }));
  }

  const handleSnareChange = (snare: boolean) => {
    setDrum((prev) => ({ ...prev, snare }));
  } */

  const handleBack = () => {
    setTab((prev) => {
      switch(prev) {
        case 'colors': return 'size';
        case 'other': return 'colors';
      }
      return prev;
    });
  }

  const handleNext = () => {
    setTab((prev) => {
      switch(prev) {
        case 'size': return 'colors';
        case 'colors': return 'other';
      }
      return prev;
    });
  }

  return <div>

    <h3>{tab}</h3>

    {tab === 'size' && <div>
      <RangeField
        min={10} max={18} value={drum.diameter}
        onChange={getHandleChange('diameter')}
        label="Diameter"
        />
      <RangeField
        min={5} max={10} value={drum.height}
        onChange={getHandleChange('height')}
        label="Height"
        />
    </div>}

    {tab === 'colors' && <div>
      <ColorField
        value={drum.headColor}
        onChange={getHandleChange('headColor')}
        label="Head Color"
        />
      <ColorField
        value={drum.shellColor}
        onChange={getHandleChange('shellColor')}
        label="Shell Color"
        />
    </div>}

    {tab === 'other' && <div>
      <CheckboxField
        value={drum.snare}
        onChange={getHandleChange('snare')}
        label="Is it a snare?"
        />
    </div>}

    <button onClick={handleBack}>Back</button>
    <button onClick={handleNext}>Next</button>

    <Drum
      diameter={drum.diameter}
      height={drum.height}
      headColor={drum.headColor}
      shellColor={drum.shellColor}
      snare={drum.snare} />
  </div>;
}