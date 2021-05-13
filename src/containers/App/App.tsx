import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { DrumCreator } from '../../components/DrumCreator/DrumCreator';
import { DrumKit } from '../../components/DrumKit/DrumKit';
import { DrumContext } from '../../utils/DrumContext';
import { DrumType } from '../../utils/DrumType';
import { DRUMS_COLLECTION } from '../../utils/firebase';

function App() {

  console.log('hola');
  const [ drums, setDrums ] = React.useState<DrumType[]>([]);

  const handleDrumCreationFinish = (newOrEditedDrum: DrumType) => {
    DRUMS_COLLECTION.add(newOrEditedDrum);
    setDrums((prev) => {
      const editIndex = prev.findIndex(drum => drum.id === newOrEditedDrum.id);
      if(editIndex >= 0) {
        const copy = [ ...prev ];
        copy[editIndex] = newOrEditedDrum;
        return copy;
        /* return [
          ...prev.slice(0, edit),
          newDrum,
          ...prev.slice(edit + 1)
        ]; */
      }
      return [ ...prev, newOrEditedDrum ];
    });
    // setDrums((prev) => [ ...prev, newDrum ]);
  }

  return (
    <div>
      <DrumContext.Provider value={{ drums }}>
        <BrowserRouter>

          <Switch>
            <Route path="/drum-kit" render={() => <DrumKit drums={drums} />} />
            <Route path={["/new-drum", "/edit-drum/:id"]} render={() => <DrumCreator onFinish={handleDrumCreationFinish} />} />
            <Redirect to="/drum-kit" />
          </Switch>

        </BrowserRouter>
      </DrumContext.Provider>
    </div>
  );
}

export default App;
