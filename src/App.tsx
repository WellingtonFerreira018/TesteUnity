import { Route, Routes } from 'react-router-dom';
import {Game } from './components/Game';
import Apresentation from './components/Apresentation';
import Community from './pages/community';
import Login from './pages/login';
import PageGame from './pages/game';
import CreateGame from './pages/createGame';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Apresentation />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/play' element={<Game/>}/>
      <Route path='/community' element={<Community />}/>
      <Route path='/games' element={<PageGame />}/>
      <Route path='/create' element={<CreateGame />}/>
    </Routes>
  );
}

export default App;
