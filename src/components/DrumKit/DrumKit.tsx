import React from 'react';
import { Link } from 'react-router-dom';
import { DrumType } from '../../utils/DrumType';
import { Drum } from '../Drum/Drum';

interface DrumKitProps {
  drums: DrumType[];
}

export const DrumKit: React.FC<DrumKitProps> = ({ drums }) => {

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