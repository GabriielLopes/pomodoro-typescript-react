import React from 'react';

// CSS
import '../styles/button.css'

interface Props {
  texto: string;
  className: string;
  onClick?: () => void;
}

export function Button(props: Props): JSX.Element {
  return (
    <button className={props.className} onClick={props.onClick}>{props.texto}</button>
  )
}
