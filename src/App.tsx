import { Route, Routes } from 'react-router-dom';
import Game from './components/Game';
import Apresentation from './components/Apresentation';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Apresentation />}/>
      <Route path='/games' element={<Game />}/>
    </Routes>
  );
}

export default App;
