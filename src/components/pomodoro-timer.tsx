import React, { useState } from 'react';
import { useInterval } from '../hooks/use-interval';

interface Props {
  tempoPadraoPomodoro: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [tempoPrincipal, setTempoPrincipal] = useState(props.tempoPadraoPomodoro);

  useInterval(() => {
    setTempoPrincipal(tempoPrincipal - 1);
  }, 1000);
  return <>{tempoPrincipal}</>;
}
