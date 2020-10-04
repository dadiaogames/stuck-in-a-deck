import { Client } from 'boardgame.io/react';
import { LDDBG } from './Game';
import { Board } from './Board';

// import 'antd/dist/antd.css';

const App = Client({ 
  game: LDDBG, 
  board: Board,
  // debug: false,
});

export default App;