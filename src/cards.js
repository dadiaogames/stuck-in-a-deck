import React from 'react';
import { discard, draw, use_power, use_knowledge } from './Game';
import { ICONS } from './icons';

export const BASIC_CARDS = {
  k1: {
    desc: <span>+1 {ICONS.knowledge}</span>,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/docomo/205/electric-light-bulb_1f4a1.png",
    price: 0,
    is_treasure: true,
    onPlay(G, ctx) {
      G.knowledge += 1;
    }
  },
  k2: {
    desc: <span>+2 {ICONS.knowledge}</span>,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/docomo/205/electric-light-bulb_1f4a1.png",
    price: 3,
    is_treasure: true,
    onPlay(G, ctx) {
      G.knowledge += 2;
    }
  },
  k3: {
    desc: <span>+3 {ICONS.knowledge}</span>,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/docomo/205/electric-light-bulb_1f4a1.png",
    price: 6,
    is_treasure: true,
    onPlay(G, ctx) {
      G.knowledge += 3;
    }
  },
  atk1: {
    desc: <span>+1 {ICONS.atk}</span>,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/crossed-swords_2694.png",
    price: 2,
    onPlay(G, ctx) {
      G.atk += 1;
    }
  },
  atk2: {
    desc: <span>+2 {ICONS.atk}</span>,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/crossed-swords_2694.png",
    price: 5,
    onPlay(G, ctx) {
      G.atk += 2;
    }
  },
  search1: {
    desc: <span>+1 {ICONS.search}</span>,
    price: 2,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/samsung/265/magnifying-glass-tilted-right_1f50e.png",
    onPlay(G, ctx) {
      G.search += 1;
    }
  },
  search2: {
    desc: <span>+2 {ICONS.search}</span>,
    price: 5,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/samsung/265/magnifying-glass-tilted-right_1f50e.png",
    onPlay(G, ctx) {
      G.search += 2;
    }
  },
  search3: {
    desc: <span>+3 {ICONS.search}</span>,
    price: 8,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/samsung/265/magnifying-glass-tilted-right_1f50e.png",
    onPlay(G, ctx) {
      G.search += 3;
    }
  },
};

export const YOU = {
  desc: <span>YOU(+1{ICONS.power})<br/>{ICONS.power}: +3{ICONS.knowledge}</span>,
  src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/older-man_1f474.png",
  onPlay(G, ctx, card) {
    G.power += 1;
  },
  onUse(G, ctx) {
    if (use_power(G, ctx)) {
      G.knowledge += 3;
    }
  }
};

export const CARDS = [
  {
    desc: <span>{ICONS.discard}: +2{ICONS.card}</span>,
    price: 5,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/test-tube_1f9ea.png",
    onUse(G, ctx, card) {
      discard(G, card);
      draw(G, ctx);
      draw(G, ctx);
    }
  },
  {
    desc: <span>{ICONS.power}: +3{ICONS.card}</span>,
    price: 4,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/263/memo_1f4dd.png",
    onUse(G, ctx, card) {
      if (use_power(G, ctx)) {
        draw(G, ctx);
        draw(G, ctx);
        draw(G, ctx);
      }
    }
  },
  {
    desc: <span>{ICONS.power}: Put an [+2{ICONS.knowledge}] into your {ICONS.deck} </span>,
    price: 4,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/bearded-person_emoji-modifier-fitzpatrick-type-1-2_1f9d4-1f3fb_1f3fb.png",
    onUse(G, ctx, card) {
      if (use_power(G, ctx)) {
        G.deck.unshift(BASIC_CARDS.k2);
      }
    }
  },
  {
    desc: <span>{ICONS.power}: Purge an [+1{ICONS.knowledge}] card, +3{ICONS.knowledge} </span>,
    price: 4,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/whatsapp/238/black-scissors_2702.png",
    onUse(G, ctx, card) {
      if (use_power(G, ctx)) {
        let copper = G.hand.find(x => x.price == 0);
        G.hand = G.hand.filter(x => x != copper);
        G.knowledge += 3;
      }
    }
  },
  {
    desc: <span>{ICONS.discard}: +1{ICONS.power}, +2{ICONS.knowledge}</span>,
    price: 5,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/dancer_1f483.png",
    onUse(G, ctx, card) {
      discard(G, card);
      G.power += 1;
      G.knowledge += 2;
    }
  },
  {
    desc: <span>{ICONS.power}: Turn one of your [+X{ICONS.knowledge}] card into [+(X+1){ICONS.knowledge}]</span>,
    price: 5,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/263/orange-book_1f4d9.png",
    onUse(G, ctx, card) {
      if (use_power(G, ctx)) {
        let treasure = ctx.random.Shuffle(G.hand.filter(x => x.is_treasure))[0];
        if (treasure) {
          treasure.desc = [treasure.desc, <span> ,+1 {ICONS.knowledge}</span>];
          treasure.onPlay = (G, ctx) => {treasure.onPlay(G, ctx); G.knowledge += 1;};
        }
      }
    }
  },
  {
    desc: <span>{ICONS.atk}2: +4{ICONS.search}</span>,
    price: 3,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/263/man-running_1f3c3-200d-2642-fe0f.png",
    onUse(G, ctx, card) {
      if (G.atk >= 2) {
        G.atk -= 2;
        G.search += 4;
      }
    }
  },
  {
    desc: <span>{ICONS.search}2: +4{ICONS.atk}</span>,
    price: 3,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/bow-and-arrow_1f3f9.png",
    onUse(G, ctx, card) {
      if (G.search >= 2) {
        G.search -= 2;
        G.atk += 4;
      }
    }
  },
  {
    desc: <span>{ICONS.discard}, {ICONS.knowledge}3: +2{ICONS.atk}</span>,
    price: 3,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/fencer_1f93a.png",
    onUse(G, ctx, card) {
      if (use_knowledge(G, ctx, 3)) {
        discard(G, card);
        G.atk += 2;
      }
    }
  },
  {
    desc: <span>{ICONS.discard}, {ICONS.knowledge}3: +2{ICONS.search}</span>,
    price: 3,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/books_1f4da.png",
    onUse(G, ctx, card) {
      if (use_knowledge(G, ctx, 3)) {
        discard(G, card);
        G.search += 2;
      }
    }
  },
  {
    desc: <span>{ICONS.discard}: +2{ICONS.power}</span>,
    price: 5,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/hourglass-with-flowing-sand_23f3.png",
    onUse(G, ctx, card) {
      discard(G, card);
      G.power += 2;
    }
  },
].map(x => ({...x, is_action:true}));