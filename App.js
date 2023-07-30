import "./style/themes.css";
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import ListRoutine from './components/Routine/ListRoutine';
import { useState } from 'react';
import "./style/routine.css";

function App() {
  const [listRoutine, setListRoutine] = useState([]);
  const [intervals, setIntervals] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const currentInterval = (interval) => {
    setIntervals(interval)
  }

  return (
    <Router>
      <div className={`App ${isDarkMode ? 'dark-theme' : ''}`}>
        <nav className='nav'>
          <ul className='nav__link'>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/routine">Routine</Link>
            </li>

          </ul>
          <div class="switch__block">
            light
            <label class="switch" >
              <input type="checkbox" onClick={handleToggleTheme} />
              <span class="slider round"></span>
            </label>
            dark
          </div>
        </nav>
        <Routes>
          <Route path="/" element={
            <Home listRoutine={listRoutine}
              changeListRoutine={setListRoutine}
              intervals={intervals}
              setIntervals={setIntervals} />} />
          <Route path="/routine" element={
            <ListRoutine listRoutine={listRoutine} 
            currentInterval={currentInterval}
            />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
