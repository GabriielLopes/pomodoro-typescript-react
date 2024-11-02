import React, { useEffect, useState } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

//CSS
import '../styles/pomodoro.css';

interface Props {
  tempoPomodoro: number;
  tempoDeDescansoCurto: number;
  tempoDeDescansoLongo: number;
  ciclos: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [tempoPrincipal, setTempoPrincipal] = useState(props.tempoPomodoro);
  const [graus, setGraus] = useState((tempoPrincipal / props.tempoPomodoro) * 360);
  const circulo = document.querySelector('.circulo') as HTMLDivElement;

  useEffect(() => {
    if (circulo) {
      if (document.querySelectorAll('.working').length > 0) {
        circulo.style.background = `conic-gradient( #EF5D50 ${graus}deg, #e5e7eb 0deg)`;
      } else {
        circulo.style.background = `conic-gradient( #41e1ba ${graus}deg, #e5e7eb 0deg)`;
      }
    }
  }, [circulo, graus]);

  useInterval(() => {
    setTempoPrincipal((prevTempo) => prevTempo - 1);
    setGraus((tempoPrincipal / props.tempoPomodoro) * 360);
  }, 1000);

  return (
    <div className="pomodoro">
      <h2>Você está: trabalhando</h2>
      <Timer tempoPrincipal={tempoPrincipal} />

      <div className="controls">
        <Button className="btn" texto="teste" onClick={() => console.log('teste')} />
        <Button className="btn" texto="teste" onClick={() => console.log('teste')} />
        <Button className="btn" texto="teste" onClick={() => console.log('teste')} />
      </div>

      <div className="details">
        <p>teste</p>
      </div>
    </div>
  );
}
