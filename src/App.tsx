import React from 'react';
import './app.css';
import { PomodoroTimer } from './components/pomodoro-timer';

function App() {
  return (
    <div className="App">
      <h2>Olá mundo!</h2>
      <PomodoroTimer tempoPadraoPomodoro={1500} />
    </div>
  );
}

export default App;
