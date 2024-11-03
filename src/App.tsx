import React from 'react';
import './styles/app.css';
import { PomodoroTimer } from './components/pomodoro-timer';

function App() {
  return (
    <div className="container">
      <PomodoroTimer tempoPomodoro={30} tempoDeDescansoCurto={300} tempoDeDescansoLongo={900} ciclos={4} />
    </div>
  );
}

export default App;
