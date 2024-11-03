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
  const [graus, setGraus] = useState(360);
  const [contagemTempo, setContagemTempo] = useState(false);
  const [trabalhando, setTrabalhando] = useState(false);
  const circulo = document.querySelector('.circulo') as HTMLDivElement;

  useInterval(
    () => {
      setTempoPrincipal((prevTempo) => prevTempo - 1);
      const qtdePDiminuir = 360 / props.tempoPomodoro;
      setGraus(graus - qtdePDiminuir);
    },
    contagemTempo ? 1000 : null,
  );

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
        circulo.style.transition = `background 300ms ease-in-out`;
      } else {
        circulo.style.background = `conic-gradient( #41e1ba ${graus}deg, #e5e7eb 0deg)`;
        circulo.style.transition = `background 300ms ease-in-out`;
      }
    }
  }, [tempoPrincipal, graus, circulo, trabalhando]);

  const configurarTrabalhar = () => {
    setTrabalhando(!trabalhando);
    setContagemTempo(true);
  };

  return (
    <div className="pomodoro">
      <h2>Você está: {trabalhando ? 'Trabalhando' : 'Descansando'}</h2>
      <Timer tempoPrincipal={tempoPrincipal} />

      <div className="controls">
        <Button
          className="btn"
          texto="Trabalhar"
          onClick={() => configurarTrabalhar()}
        />
        <Button className="btn" texto="teste" onClick={() => console.log('teste')} />
        {trabalhando ? (
          <Button
          className="btn"
          texto={contagemTempo ? 'Pausar' : 'Continuar'}
          onClick={() => setContagemTempo(!contagemTempo)}
        />
        ) : ""}
      </div>

      <div className="details">
        <p>teste</p>
      </div>
    </div>
  );
}
