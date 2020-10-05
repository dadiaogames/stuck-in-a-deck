import React, { useEffect, useState } from 'react';
import { ICONS } from './icons';
import { TUTORIAL } from './tutorial';
import { useShaker } from './Shaker';
import { Ripple } from './Ripple';
import { animated } from 'react-spring';

import './Board.css';

function show_tutorial() {
  alert(TUTORIAL);
}

function Card(props) {
  let shaker = useShaker(props.shaker.shaking, props.shaker.set_shaking, -30, -30, {duration:125});

  return <animated.div className="card" style={{border:(props.selected)?"3px solid blue":undefined, ...shaker}} onClick={props.handleClick}>
    <div className="card-desc">{(props.price>=0)?["(",ICONS.knowledge,props.price,")", <br/>]:undefined}{props.desc}{props.card.is_mob?[<br/>,"(",ICONS.hp,props.card.hp,"/4)"]:undefined}{props.card.is_portal?["(",ICONS.skull,props.card.anger,"/",props.G.anger_threshold,")"]:undefined}</div>
    <div className="card-container" >
      <img className="card-img" src={props.src}></img>
    </div>
    <Ripple playing={props.ripple.rippling} setPlaying={props.ripple.set_rippling} variants={{top: "-5%", left: "-5%"}}></Ripple>

  </animated.div>
}

export function Board(props) {
  let [show_shop, set_show_shop] = useState(false);
  let [hand_selected, set_hand_selected] = useState(-1);
  let [shop_selected, set_shop_selected] = useState(-1);
  let [tweakers, set_tweakers] = useState({goal:10, hp:20});
  let [shakers, set_shakers] = useState({});
  let [ripples, set_ripples] = useState({});
  let [score_ripple, set_score_ripple] = useState(true);

  let use_card = "Use Card";
  if (show_shop) {
    use_card = "Buy Card";
  }
  else {
    let selected_card = props.G.hand[hand_selected]
    if (selected_card && selected_card.is_mob) {
      use_card = <span>Attack({ICONS.atk})</span>;
    }
  }

  let card = props.G.hand[hand_selected];
  let item = props.G.shop[shop_selected];

  let handle_use_card = () => {
    if (show_shop) {
      props.moves.buy(shop_selected);
      set_ripples({...ripples, [shop_selected]: true})
      set_shop_selected(-1);
      if ((!item) || props.G.knowledge - item.price < 3) { 
        set_show_shop(false);
      }
    }
    else {
      props.moves.use(hand_selected);
      if (card.is_mob) {
        set_shakers({...shakers, [hand_selected]: true});
      }
      if (card.is_action) {
        set_ripples({...ripples, [hand_selected]: true})
      }
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
    props.moves.refresh_shop(Math.floor(Math.random()*100));
  };

  useEffect(() => set_score_ripple(true), [props.G.threads]);

  return <div className="board">
    <button className="game-button show-shop" onClick={() => set_show_shop(!show_shop)}>{show_shop?"Show Hand":"Show Shop"}</button>
    <div className="cardrow" style={{borderColor: (show_shop)?"#00cd00":undefined}}>
      {cards.map((card,idx) => <Card desc={card.desc} src={card.src} selected={selected(idx)} handleClick={() => select(idx)} price={show_shop?card.price:undefined} card={card} G={props.G} shaker={{shaking:shakers[idx], set_shaking:(value)=>set_shakers({...shakers, [idx]:value})}} ripple={{rippling: ripples[idx], set_rippling:(value)=>set_ripples({...ripples, [idx]:value})}} />)}
    </div>
    <button className="game-button use-card" onClick={handle_use_card}>{use_card}</button>
    <button className="game-button search" onClick={props.moves.search}>Search({ICONS.power})</button>
    <button className="game-button end-turn" onClick={props.moves.end_turn}>End Turn</button>
    <div className="data">{ICONS.power}:{props.G.power} &nbsp;&nbsp;{ICONS.hp}:{props.G.hp} &nbsp;&nbsp;{ICONS.knowledge}:{props.G.knowledge} &nbsp;&nbsp;{ICONS.search}:{props.G.search} &nbsp;&nbsp;{ICONS.atk}:{props.G.atk} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ICONS.thread}:{props.G.threads}/{props.G.goal}</div>
    <Ripple variants={{top:"55%", left:"38%"}} playing={score_ripple} setPlaying={set_score_ripple} />
    <button className="game-button use-card" onClick={show_tutorial}>How to play</button>
    <button className="game-button" onClick={() => tune_difficulty(-1)}>Easier</button>
    <button className="game-button" onClick={() => tune_difficulty(1)}>Harder</button>
  </div>;
}
