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
  const [descansando, setDescansando] = useState(false);
  const [grausPdiminuir, setGrausPDiminuir] = useState(360 / props.tempoPomodoro);

  const circulo = document.querySelector('.circulo') as HTMLDivElement;

  useInterval(
    () => {
      setTempoPrincipal((prevTempo) => prevTempo - 1);
      setGraus(graus - grausPdiminuir);
    },
    contagemTempo ? 1000 : null,
  );

  useEffect(() => {
    if (trabalhando) document.body.classList.add('working');
    if (descansando) document.body.classList.remove('working');
  }, [trabalhando, descansando]);

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
  }, [tempoPrincipal, graus, circulo, trabalhando, descansando, contagemTempo]);

  const configurarTrabalhar = () => {
    setTrabalhando(true);
    setDescansando(false);
    setContagemTempo(true);
    setTempoPrincipal(props.tempoPomodoro);
    setGraus(360);
    setGrausPDiminuir(360 / props.tempoPomodoro);
  };

  const configurarDescansar = (longo: boolean) => {
    setDescansando(true);
    setTrabalhando(false);
    setContagemTempo(true);

    if (longo) {
      setTempoPrincipal(props.tempoDeDescansoLongo);
      setGraus(360);
      setGrausPDiminuir(360 / props.tempoDeDescansoLongo);
    } else {
      setTempoPrincipal(props.tempoDeDescansoCurto);
      setGraus(360);
      setGrausPDiminuir(360 / props.tempoDeDescansoCurto);
    }
  };

  return (
    <div className="pomodoro">
      <h2>Você está: {trabalhando ? 'Trabalhando' : 'Descansando'}</h2>
      <Timer tempoPrincipal={tempoPrincipal} />

      <div className="controls">
        <Button className="btn" texto="Trabalhar" onClick={() => configurarTrabalhar()} />
        <Button className="btn" texto="Descansar" onClick={() => configurarDescansar(false)} />
          <Button
            className={trabalhando || descansando ? "btn" : "hidden"}
            texto={contagemTempo ? 'Pausar' : 'Continuar'}
            onClick={() => setContagemTempo(!contagemTempo)}
          />
      </div>

      <div className="details">
        <p>teste</p>
      </div>
    </div>
  );
}
