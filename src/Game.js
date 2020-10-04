import _ from 'lodash';
import { BASIC_CARDS } from "./cards";

function setup(ctx) {
  const G = {};

  G.hp = 20;
  G.threads = 0;
  G.goal = 10;
  refresh_data(G);

  G.deck = ctx.random.Shuffle([..._.times(5, ()=>BASIC_CARDS.k1), BASIC_CARDS.k2, BASIC_CARDS.atk1, BASIC_CARDS.atk1, BASIC_CARDS.search1, BASIC_CARDS.search1]);
  G.hand = [];
  G.discard = [];
  G.shop = [...Object.values(BASIC_CARDS)];

  return G;
}

function draw(G, ctx) {
  if (G.deck.length > 0) {
    console.log("Draw card");
    let card = G.deck.splice(0, 1)[0];
    card.onPlay(G, ctx, card);
    G.hand.unshift(card);
  }
}

function refresh_data(G) {
  G.power = 1;
  G.knowledge = 0;
  G.search = 0;
  G.atk = 0;
}

function onTurnBegin(G, ctx) {
  console.log("On turn begin");
  refresh_data(G);
  if (G.deck.length < 5) {
    G.deck = ctx.random.Shuffle([...G.deck, ...G.discard]);
    G.discard = [];
  }
  for (let i=0; i<5; i++) {
    draw(G, ctx);
  }
}

function use_power(G, ctx) {
  if (G.power > 0) {
    G.power -= 1;
    return true;
  }
  else {
    return false;
  }
}

function search(G, ctx) {
  if (use_power(G, ctx)) {
    G.threads += G.search;
  }
}

function use_knowledge(G, ctx, price) {
  if (G.knowledge >= price) {
    G.knowledge -= price;
    return true;
  }
  else{return false;}
}

function end_turn(G, ctx) {
  G.hand = [];
  G.discard = [...G.hand, ...G.discard];
  ctx.events.endTurn();
}

function buy(G, ctx, idx) {
  let card = G.shop[idx];
  if (use_knowledge(G, ctx, card.price)) {
    G.discard.push({...card});
  }
}

function use(G, ctx, idx) {
  let card = G.hand[idx];
  card.onUse && card.onUse(G, ctx, card);
  // No exhaust, use infinite times if you like so
}

export const LDDBG = {
  setup,
  moves: {
    end_turn,
    buy,
  },
  turn: {
    onBegin: onTurnBegin,
  },
};