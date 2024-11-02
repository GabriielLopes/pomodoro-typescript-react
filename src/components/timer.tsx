import React from 'react';
import { segundosParaTempo } from '../utils/segundos-para-tempo';

// CSS
import '../styles/timer.css';

interface Props {
  tempoPrincipal: number;
}

export function Timer(props: Props): JSX.Element {
  return (
    <div className="containerTimer">
      <div className="circulo">
        <span className="valor">{segundosParaTempo(props.tempoPrincipal)}</span>
      </div>
    </div>
  );
}
