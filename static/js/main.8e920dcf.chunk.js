(this["webpackJsonpstuck-in-a-deck"]=this["webpackJsonpstuck-in-a-deck"]||[]).push([[0],{45:function(e,a,t){e.exports=t(95)},50:function(e,a,t){},52:function(e,a,t){},89:function(e,a){},95:function(e,a,t){"use strict";t.r(a);var s=t(1),n=t.n(s),c=t(40),o=t.n(c),r=(t(50),t(43)),i=t(0),l=t(3),u=t(41),d=t.n(u),m={power:n.a.createElement("img",{src:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/high-voltage-sign_26a1.png",style:{height:"1.1em"}}),hp:n.a.createElement("img",{src:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/heavy-black-heart_2764.png",style:{height:"1.1em"}}),knowledge:n.a.createElement("img",{src:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/docomo/205/electric-light-bulb_1f4a1.png",style:{height:"1.1em"}}),search:n.a.createElement("img",{src:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/samsung/265/magnifying-glass-tilted-right_1f50e.png",style:{height:"1.1em"}}),atk:n.a.createElement("img",{src:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/crossed-swords_2694.png",style:{height:"1.1em"}}),thread:n.a.createElement("img",{src:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/hiking-boot_1f97e.png",style:{height:"1.1em"}})},h={k1:{desc:n.a.createElement("span",null,"+1 ",m.knowledge),src:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/docomo/205/electric-light-bulb_1f4a1.png",price:0,onPlay:function(e,a){e.knowledge+=1}},k2:{desc:n.a.createElement("span",null,"+2 ",m.knowledge),src:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/docomo/205/electric-light-bulb_1f4a1.png",price:3,onPlay:function(e,a){e.knowledge+=2}},atk1:{desc:n.a.createElement("span",null,"+1 ",m.atk),src:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/crossed-swords_2694.png",price:2,onPlay:function(e,a){e.atk+=1}},search1:{desc:n.a.createElement("span",null,"+1 ",m.search),price:2,src:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/samsung/265/magnifying-glass-tilted-right_1f50e.png",onPlay:function(e,a){e.search+=1}}};function p(e,a){if(e.deck.length>0){console.log("Draw card");var t=e.deck.splice(0,1)[0];t.onPlay(e,a,t),e.hand.unshift(t)}}function g(e){e.power=1,e.knowledge=0,e.search=0,e.atk=0}var k={setup:function(e){var a={hp:20,threads:0,goal:10};return g(a),a.deck=e.random.Shuffle([].concat(Object(l.a)(d.a.times(5,(function(){return h.k1}))),[h.k2,h.atk1,h.atk1,h.search1,h.search1])),a.hand=[],a.discard=[],a.shop=Object(l.a)(Object.values(h)),a},moves:{end_turn:function(e,a){e.hand=[],e.discard=[].concat(Object(l.a)(e.hand),Object(l.a)(e.discard)),a.events.endTurn()},buy:function(e,a,t){var s=e.shop[t];(function(e,a,t){return e.knowledge>=t&&(e.knowledge-=t,!0)})(e,0,s.price)&&e.discard.push(Object(i.a)({},s))}},turn:{onBegin:function(e,a){console.log("On turn begin"),g(e),e.deck.length<5&&(e.deck=a.random.Shuffle([].concat(Object(l.a)(e.deck),Object(l.a)(e.discard))),e.discard=[]);for(var t=0;t<5;t++)p(e,a)}}},b=t(8);t(52);function w(e){return n.a.createElement("div",{className:"card",style:{border:e.selected?"3px solid blue":void 0},onClick:e.handleClick},n.a.createElement("div",{className:"card-desc"},e.desc),n.a.createElement("div",{className:"card-container"},n.a.createElement("img",{className:"card-img",src:e.src})))}var f=Object(r.a)({game:k,board:function(e){var a=Object(s.useState)(!1),t=Object(b.a)(a,2),c=t[0],o=t[1],r=Object(s.useState)(-1),i=Object(b.a)(r,2),l=i[0],u=i[1],d=Object(s.useState)(-1),h=Object(b.a)(d,2),p=h[0],g=h[1],k=c?e.G.shop:e.G.hand,f=function(e){return c?p==e:l==e};return n.a.createElement("div",{className:"board"},n.a.createElement("button",{className:"game-button show-shop",onClick:function(){return o(!c)}},"Show Shop"),n.a.createElement("div",{className:"cardrow"},k.map((function(e,a){return n.a.createElement(w,{desc:e.desc,src:e.src,selected:f(a),handleClick:function(){return function(e){return c?g(e):u(e)}(a)},price:c?e.price:void 0})}))),n.a.createElement("button",{className:"game-button use-card"},"Use Card"),n.a.createElement("button",{className:"game-button search"},"Search"),n.a.createElement("button",{className:"game-button end-turn"},"End Turn"),n.a.createElement("div",{className:"data"},m.power,":",e.G.power," \xa0\xa0",m.hp,":",e.G.hp," \xa0\xa0",m.knowledge,":",e.G.knowledge," \xa0\xa0",m.search,":",e.G.search," \xa0\xa0",m.atk,":",e.G.atk," \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",m.thread,":",e.G.threads,"/",e.G.goal))}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[45,1,2]]]);
//# sourceMappingURL=main.8e920dcf.chunk.js.map