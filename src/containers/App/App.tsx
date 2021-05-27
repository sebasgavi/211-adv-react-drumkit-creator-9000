import { createMuiTheme, ThemeProvider, Switch as MuiSwitch, CssBaseline } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { DrumCreator } from '../../components/DrumCreator/DrumCreator';
import { DrumKit } from '../../components/DrumKit/DrumKit';
import { DrumContext } from '../../utils/DrumContext';
import { DrumType } from '../../utils/DrumType';
import { DRUMS_COLLECTION } from '../../utils/firebase';


const themeLight = createMuiTheme({
  palette: {
    primary: {
      main: '#ff1100'
    },
  },
});

const themeDark = createMuiTheme({
  palette: {
    primary: {
      main: '#0011ff'
    },
  },
});

function App() {

  console.log('hola');
  const [ drums, setDrums ] = React.useState<DrumType[]>([]);
  const history = useHistory();

  const handleDrumCreationFinish = (newOrEditedDrum: DrumType) => {
    const isEdit = newOrEditedDrum.id !== '';

    const newDrumRef = DRUMS_COLLECTION.doc( isEdit ? newOrEditedDrum.id : undefined );
    newDrumRef.set({
      ...newOrEditedDrum,
      id: newDrumRef.id,
    });
  }

  const [ isDarkTheme, setIsDarkTheme ] = React.useState(false);
  const handleThemeChange = () => setIsDarkTheme(prev => !prev);

  React.useEffect(() => {
    DRUMS_COLLECTION.onSnapshot(snapshot => {

      if(snapshot.docs.length === 0) {
        return history.push('/new-drum');
      }
      console.log(snapshot.docs.length);
      const list: DrumType[] = [];
      snapshot.forEach(doc => {
        list.push(doc.data() as DrumType);
      });
      setDrums(list);
    });
  }, [ history ]);

  return (
    <div>
      <ThemeProvider theme={{ ...(isDarkTheme ? themeDark : themeLight) }}>
        <CssBaseline />
        <DrumContext.Provider value={{ drums }}>

          <MuiSwitch
            value={isDarkTheme}
            onChange={handleThemeChange} />

          <Switch>
            <Route path="/drum-kit" render={() => <DrumKit drums={drums} />} />
            <Route path={["/new-drum", "/edit-drum/:id"]} render={() => <DrumCreator onFinish={handleDrumCreationFinish} />} />
            <Redirect to="/drum-kit" />
          </Switch>

        </DrumContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
