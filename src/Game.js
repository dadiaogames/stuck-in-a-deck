import _ from 'lodash';
import { BASIC_CARDS, CARDS, YOU } from "./cards";
import { MOBS, PORTAL } from './enemies';

function setup(ctx) {
  const G = {};

  G.hp = 20;
  G.threads = 0;
  G.goal = 10;
  G.anger_threshold = 4;
  refresh_data(G);

  G.deck = ctx.random.Shuffle([..._.times(5, ()=>BASIC_CARDS.k1), BASIC_CARDS.k2, BASIC_CARDS.atk1, BASIC_CARDS.atk1, BASIC_CARDS.search1, BASIC_CARDS.search1, PORTAL, YOU]);
  G.hand = [];
  G.discard = [];
  G.shop = [...ctx.random.Shuffle(CARDS).slice(0, 7), ...Object.values(BASIC_CARDS)].filter(x => x.price > 0);

  return G;
}

export function draw(G, ctx) {
  if (G.deck.length > 0) {
    console.log("Draw card");
    let card = G.deck.splice(0, 1)[0];
    card.onPlay && card.onPlay(G, ctx, card);
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
  refresh_data(G);
  if (G.deck.length < 5) {
    G.deck = ctx.random.Shuffle([...G.deck, ...G.discard]);
    G.discard = [];
  }
  for (let i=0; i<5; i++) {
    draw(G, ctx);
  }
}

export function use_power(G, ctx) {
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
  if (G.threads >= G.goal && G.hp > 0) {
    alert("You have successfully escaped the loop!");
  }
}

export function use_knowledge(G, ctx, price) {
  if (G.knowledge >= price) {
    G.knowledge -= price;
    return true;
  }
  else{return false;}
}

function end_turn(G, ctx) {
  G.discard = [...G.hand, ...G.discard];
  G.hand = [];

  ctx.events.endTurn();
}

function buy(G, ctx, idx) {
  let card = G.shop[idx];
  if (card && use_knowledge(G, ctx, card.price)) {
    G.discard.push({...card});
  }
}

function use(G, ctx, idx) {
  let card = G.hand[idx];
  card && card.onUse && card.onUse(G, ctx, card);
  // No exhaust, use infinite times if you like so
}

function tweak(G, ctx, tweakers) {
  for (let key in tweakers) {
    G[key] = tweakers[key];
  }
}

export function deal_damage(G, ctx, amount) {
  G.hp -= amount;
  if (G.hp <= 0) {
    alert("You lose the game!");
    reset_and_tweak(G, ctx, G.tweakers);
  }
}

export function reset_and_tweak(G, ctx, tweakers) {
  G = setup(ctx);
  if (tweakers) {
    G.tweakers = tweakers;
    G = {...G, ...tweakers};
  }
}

export function discard(G, card) {
  G.hand = G.hand.filter(x => x != card);
  G.discard.push(card);
}

export const LDDBG = {
  setup,
  moves: {
    reset_and_tweak,
    tweak,
    end_turn,
    buy,
    use,
    search,
  },
  turn: {
    onBegin: onTurnBegin,
  },
};