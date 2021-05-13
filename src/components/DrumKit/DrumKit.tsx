import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { DrumType } from '../../utils/DrumType';
import { DRUMS_COLLECTION } from '../../utils/firebase';
import { Drum } from '../Drum/Drum';

interface DrumKitProps {
  drums: DrumType[];
}

export const DrumKit: React.FC<DrumKitProps> = ({ drums }) => {

  if(drums.length === 0) return <Redirect to="/new-drum" />;

  return <div>
    <Link to="/new-drum">Create new drum</Link>
    {drums.map(drum => {
      return <div key={drum.id}>
        <Drum
          diameter={drum.diameter}
          height={drum.height}
          headColor={drum.headColor}
          shellColor={drum.shellColor}
          snare={drum.snare} />
        <Link to={`/edit-drum/${drum.id}`}>Edit drum</Link>
      </div>
    })}
  </div>;
}