import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { DrumType } from '../../utils/DrumType';
import { DRUMS_COLLECTION } from '../../utils/firebase';
import { Btn } from '../Btn/Btn';
import { Drum } from '../Drum/Drum';
import { CheckboxField } from '../Fields/CheckboxField';
import { ColorField } from '../Fields/ColorField';
import { RangeField } from '../Fields/RangeField';
import { useStylesDrumCreator } from './useStylesDrumCreator';

interface DrumCreatorProps {
  onFinish: (newDrum: DrumType) => void;
}

const initialDrumInfo = {
  id: '',
  diameter: 10,
  height: 5,
  headColor: '#ffffff',
  shellColor: '#000000',
  snare: false,
  price: 1231212,
};

export const DrumCreator: React.FC<DrumCreatorProps> = ({ onFinish }) => {
  const classes = useStylesDrumCreator();

  const { id } = useParams<{ id?: string }>();
  const history = useHistory();

  const [ tab, setTab ] = React.useState<'size'|'colors'|'other'>('size');

  const [ drum, setDrum ] = React.useState<DrumType>({ ...initialDrumInfo });

  const getHandleChange = (key: keyof DrumType) => {
    return (value: any) => {
      setDrum((prev) => ({
        ...prev,
        [key]: value
      }));
    }
  }

  React.useEffect(() => {
    if(!id) return;

    const unsubscribe = DRUMS_COLLECTION.doc(id).onSnapshot(snapshot => {
      console.log(snapshot.data());
      if(snapshot.exists) {
        setDrum(snapshot.data()! as DrumType);
      } else {
        history.push('/new-drum');
      }
    });

    return () => {
      unsubscribe();
    }
  }, [ id, history ]);

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

  const handleFinish = () => {
    onFinish(drum);
    history.push('/drum-kit');
  }

  return <div className={classes.root}>

    <Typography variant="h3">{tab}</Typography>

    {tab === 'size' && <div>
      {!id && <RangeField
        min={10} max={18} value={drum.diameter}
        onChange={getHandleChange('diameter')}
        label="Diameter"
        />}
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

        <Btn>Prueba</Btn>
    {tab !== 'size' && <Button variant="contained" color="primary" onClick={handleBack}>Back</Button>}
    {tab !== 'other' && <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>}
    {tab === 'other' && <Button variant="contained" color="primary" onClick={handleFinish}>Finish</Button>}

    <Drum
      diameter={drum.diameter}
      height={drum.height}
      headColor={drum.headColor}
      shellColor={drum.shellColor}
      snare={drum.snare} />
  </div>;
}