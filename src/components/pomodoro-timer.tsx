import React, { useState } from 'react';
import { useInterval } from '../hooks/use-interval';
import { segundosParaTempo } from '../utils/segundos-para-tempo';

interface Props {
  tempoPadraoPomodoro: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [tempoPrincipal, setTempoPrincipal] = useState(props.tempoPadraoPomodoro);

  useInterval(() => {
    setTempoPrincipal(tempoPrincipal - 1);
  }, 1000);

  return <>{segundosParaTempo(tempoPrincipal)}</>;
}
