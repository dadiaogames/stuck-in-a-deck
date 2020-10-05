import React, { useState } from 'react';
import { ICONS } from './icons';
import { TUTORIAL } from './tutorial';

import './Board.css';

function show_tutorial() {
  alert(TUTORIAL);
}

function Card(props) {
  return <div className="card" style={{border:(props.selected)?"3px solid blue":undefined}} onClick={props.handleClick}>
    <div className="card-desc">{(props.price>=0)?["(",ICONS.knowledge,props.price,")", <br/>]:undefined}{props.desc}{props.card.is_mob?[<br/>,"(",ICONS.hp,props.card.hp,")"]:undefined}{props.card.is_portal?["(",ICONS.skull,props.card.anger,"/",props.G.anger_threshold,")"]:undefined}</div>
    <div className="card-container" >
      <img className="card-img" src={props.src}></img>
    </div>

  </div>
}

export function Board(props) {
  let [show_shop, set_show_shop] = useState(false);
  let [hand_selected, set_hand_selected] = useState(-1);
  let [shop_selected, set_shop_selected] = useState(-1);
  let [tweakers, set_tweakers] = useState({goal:10, hp:20});

  let use_card = "Use Card";
  if (show_shop) {
    use_card = "Buy Card";
  }
  else {
    let selected_card = props.G.hand[hand_selected]
    if (selected_card && selected_card.is_mob) {
      use_card = <span>Attack({ICONS.power})</span>;
    }
  }

  let handle_use_card = () => {
    if (show_shop) {
      props.moves.buy(shop_selected);
      set_shop_selected(-1);
      if (props.G.knowledge - props.G.shop[shop_selected].price < 3) { 
        set_show_shop(false);
      }
    }
    else {
      props.moves.use(hand_selected);
      set_hand_selected(-1);
    }
  };

  let cards = show_shop?props.G.shop:props.G.hand;
  let selected = (idx) => show_shop?(shop_selected == idx):(hand_selected == idx);
  let select = (idx) => show_shop?set_shop_selected(idx):set_hand_selected(idx);

  let tune_difficulty = (direction) => {
    let score_diff = Math.ceil(Math.random() * 3);
    let hp_diff = Math.ceil(Math.random() * 3);
    let new_tweakers = Object.assign({}, tweakers);
    if (direction < 0) {
      new_tweakers.goal -= score_diff;
      new_tweakers.hp += hp_diff;
    }
    else {
      new_tweakers.goal += score_diff;
      new_tweakers.hp -= hp_diff;
    }
    props.reset();
    props.moves.tweak(new_tweakers);
    set_tweakers(new_tweakers);
  };

  return <div className="board">
    <button className="game-button show-shop" onClick={() => set_show_shop(!show_shop)}>{show_shop?"Show Hand":"Show Shop"}</button>
    <div className="cardrow">
      {cards.map((card,idx) => <Card desc={card.desc} src={card.src} selected={selected(idx)} handleClick={() => select(idx)} price={show_shop?card.price:undefined} card={card} G={props.G} />)}
    </div>
    <button className="game-button use-card" onClick={handle_use_card}>{use_card}</button>
    <button className="game-button search" onClick={props.moves.search}>Search({ICONS.power})</button>
    <button className="game-button end-turn" onClick={props.moves.end_turn}>End Turn</button>
    <div className="data">{ICONS.power}:{props.G.power} &nbsp;&nbsp;{ICONS.hp}:{props.G.hp} &nbsp;&nbsp;{ICONS.knowledge}:{props.G.knowledge} &nbsp;&nbsp;{ICONS.search}:{props.G.search} &nbsp;&nbsp;{ICONS.atk}:{props.G.atk} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ICONS.thread}:{props.G.threads}/{props.G.goal}</div>
    <button className="game-button use-card" onClick={show_tutorial}>How to play</button>
    <button className="game-button" onClick={() => tune_difficulty(-1)}>Easier</button>
    <button className="game-button" onClick={() => tune_difficulty(1)}>Harder</button>
  </div>;
}
