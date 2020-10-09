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
};

export const YOU = {
  desc: <span>YOU(+1{ICONS.power})<br/>{ICONS.power}: +3{ICONS.knowledge}</span>,
  src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/older-man_1f474.png",
  is_action: true,
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
    cost_type: "discard",
    onUse(G, ctx, card) {
      draw(G, ctx);
      draw(G, ctx);
    }
  },
  {
    desc: <span>{ICONS.power}: +3{ICONS.card}</span>,
    price: 4,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/263/memo_1f4dd.png",
    cost_type: "power",
    onUse(G, ctx, card) {
        draw(G, ctx);
        draw(G, ctx);
        draw(G, ctx);
    }
  },
  {
    desc: <span>{ICONS.discard}: +1{ICONS.power}, +1{ICONS.card}</span>,
    price: 3,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/horse-racing_1f3c7.png",
    cost_type: "discard",
    onUse(G, ctx, card) {
      G.power += 1;
      draw(G, ctx);
    }
  },
  {
    desc: <span>{ICONS.power}: Put an [+2{ICONS.knowledge}] into your {ICONS.deck} </span>,
    price: 2,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/bearded-person_emoji-modifier-fitzpatrick-type-1-2_1f9d4-1f3fb_1f3fb.png",
    cost_type: "power",
    onUse(G, ctx, card) {
        G.deck.unshift(BASIC_CARDS.k2);
    }
  },
  {
    desc: <span>{ICONS.power}: Purge an [+1{ICONS.knowledge}] card, +3{ICONS.knowledge} </span>,
    price: 4,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/whatsapp/238/black-scissors_2702.png",
    cost_type: "power",
    onUse(G, ctx, card) {
        let copper = G.hand.find(x => x.price == 0);
        G.hand = G.hand.filter(x => x != copper);
        G.knowledge += 3;
    }
  },
  {
    desc: <span>{ICONS.discard}: +1{ICONS.power}, +2{ICONS.knowledge}</span>,
    price: 4,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/dancer_1f483.png",
    cost_type: "discard",
    onUse(G, ctx, card) {
      G.power += 1;
      G.knowledge += 2;
    }
  },
  {
    desc: <span>{ICONS.power}: Turn one of your [+X{ICONS.knowledge}] card into [+(X+1){ICONS.knowledge}]</span>,
    price: 5,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/263/orange-book_1f4d9.png",
    cost_type: "power",
    onUse(G, ctx, card) {
        let treasure = ctx.random.Shuffle(G.hand.filter(x => x.is_treasure))[0];
        if (treasure) {
          treasure.desc = [treasure.desc, <span> ,+1 {ICONS.knowledge}</span>];
          let previews_onplay = treasure.onPlay;
          treasure.onPlay = (G, ctx) => {previews_onplay(G, ctx); G.knowledge += 1;};
        }
    }
  },
  {
    desc: <span>{ICONS.discard},{ICONS.atk}2: +4{ICONS.search}</span>,
    price: 3,
    cost_type: "discard",
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/263/man-running_1f3c3-200d-2642-fe0f.png",
    onUse(G, ctx, card) {
      if (G.atk >= 2) {
        G.atk -= 2;
        G.search += 4;
      }
    }
  },
  {
    desc: <span>{ICONS.discard},{ICONS.search}2: +4{ICONS.atk}</span>,
    price: 3,
    cost_type: "discard",
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/bow-and-arrow_1f3f9.png",
    onUse(G, ctx, card) {
      if (G.search >= 2) {
        G.search -= 2;
        G.atk += 4;
      }
    }
  },
  // {
  //   desc: <span>{ICONS.discard}, {ICONS.knowledge}3: +2{ICONS.atk}</span>,
  //   price: 3,
  //   src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/fencer_1f93a.png",
  //   onUse(G, ctx, card) {
  //     if (use_knowledge(G, ctx, 3)) {
  //       discard(G, card);
  //       G.atk += 2;
  //     }
  //   }
  // },
  {
    desc: <span>{ICONS.discard}, {ICONS.knowledge}2: +2{ICONS.search}</span>,
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
    price: 6,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/hourglass-with-flowing-sand_23f3.png",
    onUse(G, ctx, card) {
      discard(G, card);
      G.power += 2;
    }
  },
  {
    desc: <span>{ICONS.knowledge}2: Purge the cheapest card from your hand</span>,
    price: 2,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/emojidex/112/black-scissors_2702.png",
    onUse(G, ctx, card) {
      if (use_knowledge(G, ctx, 2)) {
        let purged = G.hand.filter(x => x.price >= 0).sort((a,b) => a.price - b.price)[0];
        G.hand = G.hand.filter(x => x != purged);
      }
    }
  },
  // {
  //   desc: <span>{ICONS.discard}: +1{ICONS.card}, then +1{ICONS.knowledge} per card in your hand that priced 3</span>,
  //   price: 3,
  //   src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/leopard_1f406.png",
  //   cost_type: "discard",
  //   onUse(G, ctx, card) {
  //     draw(G, ctx);
  //     G.knowldge += G.hand.filter(x => x.price == 3).length;
  //   }
  // },
  {
    desc: <span>{ICONS.discard}: +1{ICONS.search} per 8{ICONS.card} in your overall deck</span>,
    price: 4,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/sunflower_1f33b.png",
    cost_type: "discard",
    onUse(G, ctx, card) {
      G.search += Math.floor([...G.deck, ...G.hand, ...G.discard].length / 8);
    }
  },
  {
    desc: <span>{ICONS.power}: Upgrade 1{ICONS.card} in your hand, let it +1{ICONS.search}, +2{ICONS.atk}, or +2{ICONS.knowledge}</span>,
    price: 3,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/263/pen_1f58a.png",
    cost_type: "power",
    onUse(G, ctx) {
      let card = ctx.random.Shuffle(G.hand.filter(x => x.onPlay))[0];
      let upgrade = ctx.random.Shuffle([
        [<span>, +1{ICONS.search}</span>, (G, ctx) => {G.search += 1;}],
        [<span>, +2{ICONS.atk}</span>, (G, ctx) => {G.atk += 2;}],
        [<span>, +2{ICONS.knowledge}</span>, (G, ctx) => {G.knowledge += 2;}],
      ])[0];
      card.desc = [card.desc, upgrade[0]];
      let previews_onplay = card.onPlay;
      card.onPlay = (G, ctx) => {previews_onplay(G, ctx, card); upgrade[1](G, ctx);};
    }
  },
  {
    desc: <span>Purge this: Add a copy of your most expensive {ICONS.card} in hand to your discard</span>,
    price: 3,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/263/ticket_1f3ab.png",
    onUse(G, ctx, card) {
      G.hand = G.hand.filter(x => x != card);
      let expensive_card = G.hand.filter(x => x.price >= 0).sort((a,b) => b.price - a.price)[0];
      if (expensive_card) {
        G.discard.push({...expensive_card});
      }
    }
  },
  {
    desc: <span>{ICONS.discard}: +2{ICONS.knowledge}, if {ICONS.power} is more than 2, then +1{ICONS.power} and +1{ICONS.card}</span>,
    price: 4,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/battery_1f50b.png",
    cost_type: "discard",
    onUse(G, ctx, card) {
      G.knowledge += 2;
      if (G.power >= 2) {
        G.power += 1;
        draw(G, ctx);
      }
    }
  },
  {
    desc: <span>{ICONS.discard}, {ICONS.atk}2: +2{ICONS.power}</span>,
    price: 2,
    src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/soccer-ball_26bd.png",
    cost_type: "discard",
    onUse(G, ctx, card) {
      if (G.atk >= 2) {
        G.atk -= 2;
        G.power += 2;
      }
    }
  },
  // {
  //   desc: <span>{ICONS.power}: +1{ICONS.knowledge} per {ICONS.card}[+1{ICONS.knowledge}] in your hand</span>,
  //   price: 3,
  //   src: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/ledger_1f4d2.png",
  //   cost_type: "power",
  //   onUse(G, ctx, card) {
  //     G.knowledge += G.hand.filter(x => x.price == 0).length;
  //   }
  // },
].map(x => ({...x, is_action:true}));