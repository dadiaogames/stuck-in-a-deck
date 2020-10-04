import React, { useState } from 'react';
import { ICONS } from './icons';

import './Board.css';

function Card(props) {
  return <div className="card" style={{border:(props.selected)?"3px solid blue":undefined}} onClick={props.handleClick}>
    <div className="card-desc">{props.desc}</div>
    <div className="card-container" >
      <img className="card-img" src={props.src}></img>
    </div>

  </div>
}

export function Board(props) {
  let use_card = "Use Card";

  let [show_shop, set_show_shop] = useState(false);
  let [hand_selected, set_hand_selected] = useState(-1);
  let [shop_selected, set_shop_selected] = useState(-1);

  let cards = show_shop?props.G.shop:props.G.hand;
  let selected = (idx) => show_shop?(shop_selected == idx):(hand_selected == idx);
  let select = (idx) => show_shop?set_shop_selected(idx):set_hand_selected(idx);

  return <div className="board">
    <button className="game-button show-shop" onClick={() => set_show_shop(!show_shop)}>Show Shop</button>
    <div className="cardrow">
      {cards.map((card,idx) => <Card desc={card.desc} src={card.src} selected={selected(idx)} handleClick={() => select(idx)} price={show_shop?card.price:undefined} />)}
    </div>
    <button className="game-button use-card">{use_card}</button>
    <button className="game-button search">Search</button>
    <button className="game-button end-turn">End Turn</button>
  <div className="data">{ICONS.power}:{props.G.power} &nbsp;&nbsp;{ICONS.hp}:{props.G.hp} &nbsp;&nbsp;{ICONS.knowledge}:{props.G.knowledge} &nbsp;&nbsp;{ICONS.search}:{props.G.search} &nbsp;&nbsp;{ICONS.atk}:{props.G.atk} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ICONS.thread}:{props.G.threads}/{props.G.goal}</div>
    
  </div>;
}
