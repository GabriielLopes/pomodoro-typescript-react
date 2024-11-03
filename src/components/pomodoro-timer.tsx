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
  const [contagemTempo, setContagemTempo] = useState(false);
  const [trabalhando, setTrabalhando] = useState(false);
  const circulo = document.querySelector('.circulo') as HTMLDivElement;

  useEffect(() => {
    if (trabalhando) {
      document.body.classList.add('working');
    } else {
      document.body.classList.remove('working');
    }
  }, [trabalhando]);

  useEffect(() => {
    if (circulo) {
      if (document.querySelectorAll('.working').length > 0) {
        circulo.style.background = `conic-gradient( #EF5D50 ${graus}deg, #e5e7eb 0deg)`;
      } else {
        circulo.style.background = `conic-gradient( #41e1ba ${graus}deg, #e5e7eb 0deg)`;
      }
    }
  }, [circulo, graus, trabalhando]);

  useInterval(
    () => {
      setTempoPrincipal((prevTempo) => prevTempo - 1);
      setGraus((tempoPrincipal / props.tempoPomodoro) * 360);
    },
    contagemTempo ? 1000 : null,
  );

  const configurarTrabalhar = () => {
    setTrabalhando(!trabalhando);
    setContagemTempo(!contagemTempo);
  };

  return (
    <div className="pomodoro">
      <h2>Você está: {trabalhando ? 'Trabalhando' : 'Descansando'}</h2>
      <Timer tempoPrincipal={tempoPrincipal} />

      <div className="controls">
        <Button
          className="btn"
          texto={!contagemTempo ? 'Trabalhar' : 'Pausar'}
          onClick={() => configurarTrabalhar()}
        />
        <Button className="btn" texto="teste" onClick={() => console.log('teste')} />
        <Button className="btn" texto="teste" onClick={() => console.log('teste')} />
      </div>

      <div className="details">
        <p>teste</p>
      </div>
    </div>
  );
}
