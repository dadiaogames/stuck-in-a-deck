import React from 'react';
import { deal_damage, draw, use_power } from './Game';
import { ICONS } from './icons';

function attack(G, ctx, card) {
  let hit_points = Math.min(G.atk, card.hp);
  G.atk -= hit_points;
  card.hp -= hit_points;
  if (card.hp <= 0) {
    G.hand = G.hand.filter(x => x != card);
    card.onOut(G, ctx, card);
  }
}

export const MOBS = [
  {
    desc: <span>-2{ICONS.hp} &nbsp;({ICONS.out}: +3{ICONS.search})</span>,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/microsoft/209/imp_1f47f.png",
    max_hp: 4,
    onPlay(G, ctx) {
      deal_damage(G, ctx, 2);
    },
    onOut(G, ctx) {
      G.search += 3;
    },
  },
  {
    desc: <span>-2{ICONS.hp} &nbsp;({ICONS.out}: +1{ICONS.card})</span>,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/microsoft/209/imp_1f47f.png",
    max_hp: 2,
    onPlay(G, ctx) {
      deal_damage(G, ctx, 2);
    },
    onOut(G, ctx) {
      draw(G, ctx);
    },
  },
  {
    desc: <span>-2{ICONS.hp} &nbsp;({ICONS.out}: +1{ICONS.power})</span>,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/microsoft/209/imp_1f47f.png",
    max_hp: 3,
    onPlay(G, ctx) {
      deal_damage(G, ctx, 2);
    },
    onOut(G, ctx) {
      G.power += 1;
    },
  },
].map(mob => ({...mob, hp:mob.max_hp, is_mob:true, onUse:attack}));

export const PORTAL = {
  desc: "PORTAL",
  src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/mozilla/36/door_1f6aa.png",
  hp: 999,
  // is_mob: true,
  is_portal: true,
  anger: 0,
  onPlay(G, ctx, card) {
    G.discard.push({...ctx.random.Shuffle(MOBS)[0]});
    card.anger += 1;
    if (card.anger >= G.anger_threshold) {
      card.anger = 0;
      G.discard.push({...PORTAL});
    }
  }
};