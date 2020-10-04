import React, { useState } from 'react';
import { ICONS } from './icons';

import './Board.css';

function Card(props) {
  return <div className="card" style={{borderColor:(props.selected)?"blue":undefined}} onClick={props.handleClick}>
    <div className="card-desc">{props.desc}</div>
    <div className="card-container" >
      <img className="card-img" src={props.src}></img>
    </div>

  </div>
}

export function Board(props) {
  let use_card = "Use Card";

  let power = 0;
  let hp = 20;
  let knowledge = 0;
  let search = 0;
  let atk = 0;

  return <div className="board">
    <button className="game-button show-shop">Show Shop</button>
    <div className="cardrow">
      
    </div>
    <button className="game-button use-card">{use_card}</button>
    <button className="game-button search">Search</button>
    <button className="game-button end-turn">End Turn</button>
    <div className="data">{ICONS.power}:{power} &nbsp;&nbsp;{ICONS.hp}:{hp} &nbsp;&nbsp;{ICONS.knowledge}:{knowledge} &nbsp;&nbsp;{ICONS.search}:{search} &nbsp;&nbsp;{ICONS.atk}:{atk}</div>
    
  </div>;
}
