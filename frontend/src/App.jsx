import './App.css';
import {HashRouter as Router,Route} from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat'

function App() {

  return (
    <div className="App">
      <Router>
        <Route path='/' exact component={Home} />
        <Route path='/:username/chat' exact component={Chat} />
      </Router>
    </div>
  );
}

export default App;
