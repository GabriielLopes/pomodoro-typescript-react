import React from 'react';

// CSS
import '../styles/button.css'

interface Props {
  texto?: string;
  className: string;
  icone?: 'bx bx-pause' | 'bx bx-play' | 'bx bxs-briefcase-alt-2' | 'bx bx-alarm-snooze';
  onClick?: () => void;
}

export function Button(props: Props): JSX.Element {
  return (
    <button className={props.className} onClick={props.onClick}><i className={props.icone} /><p>{props.texto}</p></button>
  )
}
