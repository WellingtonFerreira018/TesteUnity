import { Route, Routes } from 'react-router-dom';
import Game from './components/Game';
import Apresentation from './components/Apresentation';
import CardHistory from './components/CardHistory';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Apresentation />}/>
      <Route path='/games' element={<Game />}/>
      <Route path='/history' element={<CardHistory />}/>
    </Routes>
  );
}

export default App;
