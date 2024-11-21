import React, { useEffect, useState, useCallback } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

//CSS
import '../styles/pomodoro.css';
import { segundosParaTempo } from '../utils/segundos-para-tempo';
// Efeitos sonoros
const bellStart = require('../sounds/bell-start.mp3');
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartTrabalhando = new Audio(bellStart);
const audioStopTrabalhando = new Audio(bellFinish);

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
  const [ciclos, setCiclos] = useState(1);
  const [grausPdiminuir, setGrausPDiminuir] = useState(360 / props.tempoPomodoro);
  const [pomodoroCompletados, setPomodoroCompletados] = useState(0);
  const [totalDeHorasTrabalhadas, setTotalDeHorasTrabalhadas] = useState(0);
  const [ciclosCompletados, setCiclosCompletados] = useState(0);

  const circulo = document.querySelector('.circulo') as HTMLDivElement;

  useInterval(
    () => {
      setTempoPrincipal((prevTempo) => prevTempo - 1);
      if (trabalhando) setTotalDeHorasTrabalhadas(totalDeHorasTrabalhadas + 1);
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

  // REGRAS POMODORO
  useEffect(() => {
    if (tempoPrincipal === 0 && trabalhando && ciclos <= props.ciclos) {
      configurarDescansar(false);
      setPomodoroCompletados(pomodoroCompletados + 1);
      setCiclos(ciclos + 1);
    }

    if (tempoPrincipal === 0 && descansando && ciclos <= props.ciclos) {
      configurarTrabalhar();
    }
    if (ciclos > props.ciclos) {
      setCiclosCompletados(ciclosCompletados + 1);
      setCiclos(1);
      configurarDescansar(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tempoPrincipal,
    trabalhando,
    descansando,
    ciclos,
    props.ciclos,
    props.tempoPomodoro,
    ciclosCompletados,
    totalDeHorasTrabalhadas,
    pomodoroCompletados,
  ]);

  function notificarTrabalho() {
    return new Notification('Pomodoro timer', {
      body: 'Você deve ir trabalhar!',
      requireInteraction: true
    });
  }

  function notificarDescansar() {
    return new Notification('Pomodoro timer', {
      body: 'Você deve descansar!',
      requireInteraction: true
    });
  }

  const configurarTrabalhar = useCallback(() => {
    setTrabalhando(true);
    setDescansando(false);
    setContagemTempo(true);
    setTempoPrincipal(props.tempoPomodoro);
    setGraus(360);
    setGrausPDiminuir(360 / props.tempoPomodoro);
    audioStartTrabalhando.play();
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        notificarTrabalho();
      } else {
        window.alert('Você precisa permitir notificações para continuar.');
      }
    });
  }, [props.tempoPomodoro]);

  const configurarDescansar = useCallback(
    (longo: boolean) => {
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

      audioStopTrabalhando.play();
      Notification.requestPermission().then((result) => {
        if (result === 'granted') {
          notificarDescansar();
        } else {
          window.alert('Você precisa permitir notificações para continuar.');
        }
      });
    },
    [props.tempoDeDescansoCurto, props.tempoDeDescansoLongo],
  );

  return (
    <div className="pomodoro">
      <h2>Você está: {trabalhando ? 'Trabalhando' : 'Descansando'}</h2>
      <Timer tempoPrincipal={tempoPrincipal} />

      <div className="controls">
        <Button
          className="btn"
          texto="Trabalhar"
          icone="bx bxs-briefcase-alt-2"
          onClick={() => configurarTrabalhar()}
        />
        <Button
          className="btn"
          texto="Descansar"
          icone="bx bx-alarm-snooze"
          onClick={() => configurarDescansar(false)}
        />
        <Button
          className={trabalhando || descansando ? 'btn' : 'hidden'}
          texto={contagemTempo ? 'Pausar' : 'Continuar'}
          icone={contagemTempo ? 'bx bx-pause' : 'bx bx-play'}
          onClick={() => setContagemTempo(!contagemTempo)}
        />
      </div>

      <div className="details">
        <p>
          Ciclos finalizados: <strong>{ciclosCompletados}</strong>
        </p>
        <p>
          Pomodoros finalizados: <strong>{pomodoroCompletados}</strong>
        </p>
        <p>
          Total de horas trabalhadas: <strong>{segundosParaTempo(totalDeHorasTrabalhadas)}</strong>
        </p>
      </div>
    </div>
  );
}
