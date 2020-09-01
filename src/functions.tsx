import { CONFIG } from "./config";
import * as renderHTML from "react-render-html";
import Nogizaka46Members from "./nogizaka46-members";
import { animateScroll } from "react-scroll";

// Todo trim html in name, avatar
const useGif =
  (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) ||
  navigator.userAgent.indexOf("Macintosh; Intel Mac") >= 0 ||
  navigator.userAgent.indexOf("VivoBrowser") >= 0;

// const nogizakaEmojChansPngRepoHoshino: any = {
//   hoshinohide: '/emoj-members/hoshino-minami/png/hoshinohide.png',
//   hoshinoangry: '/emoj-members/hoshino-minami/png/hoshinoangry.png',
//   hoshinoshock: '/emoj-members/hoshino-minami/png/hoshinoshock.png',
//   hoshino: '/emoj-members/hoshino-minami/png/hoshino.png',
//   hoshinobulgingcheek: '/emoj-members/hoshino-minami/png/hoshinobulgingcheek.png',
//   hoshinodisgusting: '/emoj-members/hoshino-minami/png/hoshinodisgusting.png',
//   hoshinoflirt: '/emoj-members/hoshino-minami/png/hoshinoflirt.png',
//   hoshinohi: '/emoj-members/hoshino-minami/png/hoshinohi.png',
//   hoshinolike: '/emoj-members/hoshino-minami/png/hoshinolike.png',
//   hoshinolook2: '/emoj-members/hoshino-minami/png/hoshinolook2.png',
//   hoshinolookforwark: '/emoj-members/hoshino-minami/png/hoshinolookforwark.png',
//   hoshinolook: '/emoj-members/hoshino-minami/png/hoshinolook.png',
//   hoshinopoint2: '/emoj-members/hoshino-minami/png/hoshinopoint2.png',
//   hoshinopoint: '/emoj-members/hoshino-minami/png/hoshinopoint.png',
//   hoshinopray: '/emoj-members/hoshino-minami/png/hoshinopray.png',
//   hoshinothink: '/emoj-members/hoshino-minami/png/hoshinothink.png',
//   hoshinowa: '/emoj-members/hoshino-minami/png/hoshinowa.png',
//   hoshinowink: '/emoj-members/hoshino-minami/png/hoshinowink.png',
//   hoshinoze: '/emoj-members/hoshino-minami/png/hoshinoze.png',
//   hoshinozukun: '/emoj-members/hoshino-minami/png/hoshinozukun.png'
// }

const nogizakaEmojChansPngRepo: any = {

  ashlaughalpha: '/emojV2/ashlaughalpha.png',
  AshuPout: '/emojV2/AshuPout.png',
  ashshock: '/emojV2/ashshock.png',
  ashmurder: '/emojV2/ashmurder.png',
  ashjudge: '/emojV2/ashjudge.png',
  // hoshinohide: '/emoj-members/hoshino-minami/png/hoshinohide.png',
  // hoshinoangry: '/emoj-members/hoshino-minami/png/hoshinoangry.png',
  // hoshinoshock: '/emoj-members/hoshino-minami/png/hoshinoshock.png',
  // hoshino: '/emoj-members/hoshino-minami/png/hoshino.png',
  ew: '/emojV2/ew.png',
  himetanbeam: '/emojV2/himetanbeam.png',
  himuface: '/emojV2/himuface.png',
  ijiri: '/emojV2/ijiri.png',
  nanaroger: '/emojV2/nanaroger.png',
  nanapout: '/emojV2/nanapout.png',
  nanaminthink: '/emojV2/nanaminthink.png',
  nanahappy: '/emojV2/nanahappy.png',
  DISGUSTING: '/emojV2/DISGUSTING.png',
  kazulul2: '/emojV2/kazulul2.png',
  kazusniff: '/emojV2/kazusniff.png',
  kazuheart: '/emojV2/kazuheart.png',
  kanacool: '/emojV2/kanacool.png',
  kakidoubt: '/emojV2/kakidoubt.png',
  ringotrump: '/emojV2/ringotrump.png',
  ringopout: '/emojV2/ringopout.png',
  ringocry: '/emojV2/ringocry.png',
  momotongue: '/emojV2/momotongue.png',
  momothink: '/emojV2/momothink.png',
  momoshock2: '/emojV2/momoshock2.png',
  momoshock: '/emojV2/momoshock.png',
  momopop: '/emojV2/momopop.png',
  momolaugh: '/emojV2/momolaugh.png',
  momoheart2: '/emojV2/momoheart2.png',
  momoheart: '/emojV2/momoheart.png',
  momodoubtalpha: '/emojV2/momodoubtalpha.png',
  ikuteh: '/emojV2/ikuteh.png',
  ikutapog: '/emojV2/ikutapog.png',
  ikutacute: '/emojV2/ikutacute.png',
  ikushockalpha: '/emojV2/ikushockalpha.png',
  ikupalm: '/emojV2/ikupalm.png',
  ikuhigh: '/emojV2/ikuhigh.png',
  zukkilaugh: '/emojV2/zukkilaugh.png',
  zukimad: '/emojV2/zukimad.png',
  yodawink: '/emojV2/yodawink.png',
  yodasob: '/emojV2/yodasob.png',
  yodashock: '/emojV2/yodashock.png',
  yodapunch: '/emojV2/yodapunch.png',
  yodapout: '/emojV2/yodapout.png',
  yodahappy: '/emojV2/yodahappy.png',
  yodabeam: '/emojV2/yodabeam.png',
  yanchanstare: '/emojV2/yanchanstare.png',
  wakawat: '/emojV2/wakawat.png',
  triggered: '/emojV2/triggered.png',
  seirashy: '/emojV2/seirashy.png',
  seiraglare: '/emojV2/seiraglare.png',
  seira: '/emojV2/seira.png',
  sayushock: '/emojV2/sayushock.png',
  sayuheart: '/emojV2/sayuheart.png',
  sayufection: '/emojV2/sayufection.png',
  sayudoubt: '/emojV2/sayudoubt.png',
  sayuangery: '/emojV2/sayuangery.png',
  SayaPoggers: '/emojV2/SayaPoggers.png',
  ririblob: '/emojV2/ririblob.png',
  // ririasmile: '/emojV2/ririasmile.png',
  ririashh2: '/emojV2/ririashh2.png',
  // ririan: '/emojV2/ririan.png',
  rentanpop: '/emojV2/rentanpop.png',
  reikathink: '/emojV2/reikathink.png',
  reikalol: '/emojV2/reikalol.png',
  reikahmph: '/emojV2/reikahmph.png',
  ranzeshock: '/emojV2/ranzeshock.png',
  // nogi: '/emojV2/nogi.png',
  mionadoubt: '/emojV2/mionadoubt.png',
  minaminsalute: '/emojV2/minaminsalute.png',
  manatan: '/emojV2/manatan.png',
  maichunthink: '/emojV2/maichunthink.png',
  maichunahhh: '/emojV2/maichunahhh.png',
  kya: '/emojV2/kya.png',
  kotosmile: '/emojV2/kotosmile.png',
  kiigun: '/emojV2/kiigun.png',
  ikomasour: '/emojV2/ikomasour.png',
  horihigh: '/emojV2/horihigh.png',
  himedespair: '/emojV2/himedespair.png',
  // gekikara: '/emojV2/gekikara.png',
  ayamethonk: '/emojV2/ayamethonk.png',
  ayamenthink: '/emojV2/ayamenthink.png',
  ayameblush: '/emojV2/ayameblush.png',
  aya: '/emojV2/aya.png',
  angermoon: '/emojV2/angermoon.png',
  // wakaHUH: '/emojV2/wakaHUH.png',
  // wakahappy: '/emojV2/wakahappy.png',
  // TOOS: '/emojV2/TOOS.png',
  // paripidoubt: '/emojV2/paripidoubt.png',
  // paripicry: '/emojV2/paripicry.png',
  // nibuyikes: '/emojV2/nibuyikes.png',
  // nibujudge: '/emojV2/nibujudge.png',
  // nibufection: '/emojV2/nibufection.png',
  // nibublind: '/emojV2/nibublind.png',
  // naouhhh: '/emojV2/naouhhh.png',
  // mireishook: '/emojV2/mireishook.png',
  // mireilaugh: '/emojV2/mireilaugh.png',
  // mireidisgust: '/emojV2/mireidisgust.png',
  // mireibaffled: '/emojV2/mireibaffled.png',
  // mikuhappy: '/emojV2/mikuhappy.png',
  // mihowince: '/emojV2/mihowince.png',
  // mihoglare: '/emojV2/mihoglare.png',
  // mihodespair: '/emojV2/mihodespair.png',
  // memiwink: '/emojV2/memiwink.png',
  // manamokek: '/emojV2/manamokek.png',
  // manamodisgust: '/emojV2/manamodisgust.png',
  // manamoderp: '/emojV2/manamoderp.png',
  // kyokoyikes: '/emojV2/kyokoyikes.png',
  // kyokothink: '/emojV2/kyokothink.png',
  // kyokoanticipation: '/emojV2/kyokoanticipation.png',
  // kyokoah: '/emojV2/kyokoah.png',
  // kumipout: '/emojV2/kumipout.png',
  // kumidoubt: '/emojV2/kumidoubt.png',
  // kumiah: '/emojV2/kumiah.png',
  // konokajudge: '/emojV2/konokajudge.png',
  // katoshistare: '/emojV2/katoshistare.png',
  // kasuvictory: '/emojV2/kasuvictory.png',
  // kasuglare: '/emojV2/kasuglare.png',
  // kagedoom: '/emojV2/kagedoom.png',
  // hiyohehe: '/emojV2/hiyohehe.png',
  // h46: '/emojV2/h46.png'
};

// const nogizakaEmojChansPngRepo: any = {
//   asukalaugh: "/emo/asukalaugh.png",
//   asukamurder: "/emo/asukamurder.png",
//   asukashock: "/emo/asukashock.png",
//   ew: "/emo/ew.png",
//   himetanbeam: "/emo/himetanbeam.png",
//   himura: "/emo/himura.png",
//   ijiri: "/emo/ijiri.png",
//   ikupalm: "/emo/ikupalm.png",
//   ikupog: "/emo/ikupog.png",
//   ikushock: "/emo/ikushock.png",
//   ikute: "/emo/ikute.png",
//   ikuteh: "/emo/ikuteh.png",
//   kakidoubt: "/emo/kakidoubt.png",
//   kazuheart: "/emo/kazuheart.png",
//   kazulol: "/emo/kazulol.png",
//   kazusniff: "/emo/kazusniff.png",
//   maichunthink: "/emo/maichunthink.png",
//   manatan: "/emo/manatan.png",
//   minaminthink: "/emo/minaminthink.png",
//   mionadoubt: "/emo/mionadoubt.png",
//   mionahigh: "/emo/mionahigh.png",
//   momoheart: "/emo/momoheart.png",
//   momoshock: "/emo/momoshock.png",
//   momothink: "/emo/momothink.png",
//   momotongue: "/emo/momotongue.png",
//   nanahappy: "/emo/nanahappy.png",
//   nanapout: "/emo/nanapout.png",
//   reikalol: "/emo/reikalol.png",
//   reikathink: "/emo/reikathink.png",
//   rentanpop: "/emo/rentanpop.png",
//   ringopout: "/emo/ringopout.png",
//   ringotrump: "/emo/ringotrump.png",
//   ririblob: "/emo/ririblob.png",
//   sayapoggers: "/emo/sayapoggers.png",
//   sayudoubt: "/emo/sayudoubt.png",
//   sayushock: "/emo/sayushock.png",
//   triggered: "/emo/triggered.png",
//   yodapunch: "/emo/yodapunch.png",
//   yodashock: "/emo/yodashock.png",
//   yodasob: "/emo/yodasob.png",
//   yodawink: "/emo/yodawink.png",
//   zukilaugh: "/emo/zukilaugh.png",
//   zukimad: "/emo/zukimad.png",
// };

const nogizakaEmojChans = Object.keys(nogizakaEmojChansPngRepo);

// "uoa": `/emoj-gif/uoa${useGif ? '.gif' : '.webp'}`,
// const nogizakaEmojGifRepo: any = {
//   hoshinoangry: '/emoj-members/hoshino-minami/gif/hoshinoangry.gif',
//   hoshinobyebye: '/emoj-members/hoshino-minami/gif/hoshinobyebye.gif',
//   hoshinodamedesu: '/emoj-members/hoshino-minami/gif/hoshinodamedesu.gif',
//   hoshinogat: '/emoj-members/hoshino-minami/gif/hoshinogat.gif',
//   hoshinohigif: '/emoj-members/hoshino-minami/gif/hoshinohigif.gif',
//   hoshinohizukun: '/emoj-members/hoshino-minami/gif/hoshinohizukun.gif',
//   hoshinolacdau: '/emoj-members/hoshino-minami/gif/hoshinolacdau.gif',
//   hoshinolike: '/emoj-members/hoshino-minami/gif/hoshinolike.gif',
//   hoshinonande: '/emoj-members/hoshino-minami/gif/hoshinonande.gif',
//   hoshinosorry: '/emoj-members/hoshino-minami/gif/hoshinosorry.gif',
//   hoshinostrong: '/emoj-members/hoshino-minami/gif/hoshinostrong.gif',
//   hoshinoyeuko: '/emoj-members/hoshino-minami/gif/hoshinoyeuko.gif'
// };

const nogizakaEmojGifRepo: any = {
  hi: `/emoj-gif/hi${useGif ? ".gif" : ".webp"}`,
  like: `/emoj-gif/like${useGif ? ".gif" : ".webp"}`,
  nono: `/emoj-gif/nono${useGif ? ".gif" : ".webp"}`,
  love: `/emoj-gif/love${useGif ? ".gif" : ".webp"}`,
  hoshinoangry: '/emoj-members/hoshino-minami/gif/hoshinoangry.gif',
  hoshinobyebye: '/emoj-members/hoshino-minami/gif/hoshinobyebye.gif',
  hoshinodamedesu: '/emoj-members/hoshino-minami/gif/hoshinodamedesu.gif',
  hoshinogat: '/emoj-members/hoshino-minami/gif/hoshinogat.gif',
  hoshinohigif: '/emoj-members/hoshino-minami/gif/hoshinohigif.gif',
  hoshinohizukun: '/emoj-members/hoshino-minami/gif/hoshinohizukun.gif',
  hoshinolacdau: '/emoj-members/hoshino-minami/gif/hoshinolacdau.gif',
  hoshinonande: '/emoj-members/hoshino-minami/gif/hoshinonande.gif',
  hoshinosorry: '/emoj-members/hoshino-minami/gif/hoshinosorry.gif',
  hoshinostrong: '/emoj-members/hoshino-minami/gif/hoshinostrong.gif',
  hoshinoyeuko: '/emoj-members/hoshino-minami/gif/hoshinoyeuko.gif',
  likeminami: `/emoj-gif/likeminami${useGif ? ".gif" : ".webp"}`,
  kawaii: `/emoj-gif/kawaii${useGif ? ".gif" : ".webp"}`,
  votay: `/emoj-gif/votay${useGif ? ".gif" : ".webp"}`,
  matmeu: `/emoj-gif/matmeu${useGif ? ".gif" : ".webp"}`,
  boiroi: `/emoj-gif/boiroi${useGif ? ".gif" : ".webp"}`,
  sad: `/emoj-gif/sad${useGif ? ".gif" : ".webp"}`,
  uizoi: `/emoj-gif/uizoi${useGif ? ".gif" : ".webp"}`,
  hethon: `/emoj-gif/hethon${useGif ? ".gif" : ".webp"}`,
  lol: `/emoj-gif/lol${useGif ? ".gif" : ".webp"}`,
  leuleu: `/emoj-gif/leuleu${useGif ? ".gif" : ".webp"}`,
  chumoi: `/emoj-gif/chumoi${useGif ? ".gif" : ".webp"}`,
  banbo: `/emoj-gif/banbo${useGif ? ".gif" : ".webp"}`,
  dongvien: `/emoj-gif/dongvien${useGif ? ".gif" : ".webp"}`,
  yeah: `/emoj-gif/yeah${useGif ? ".gif" : ".webp"}`,
  look: `/emoj-gif/look${useGif ? ".gif" : ".webp"}`,
  lala: `/emoj-gif/lala${useGif ? ".gif" : ".webp"}`,
  tamtia: `/emoj-gif/tamtia${useGif ? ".gif" : ".webp"}`,
  ohmy: `/emoj-gif/ohmy${useGif ? ".gif" : ".webp"}`,
  uhthi: `/emoj-gif/uhthi${useGif ? ".gif" : ".webp"}`,
  uuuu: `/emoj-gif/uuuu${useGif ? ".gif" : ".webp"}`,
  done: `/emoj-gif/done${useGif ? ".gif" : ".webp"}`,
  dance: `/emoj-gif/dance${useGif ? ".gif" : ".webp"}`,
  landau: `/emoj-gif/landau${useGif ? ".gif" : ".webp"}`,
  clame: `/emoj-gif/clame${useGif ? ".gif" : ".webp"}`,
  giananha: `/emoj-gif/giananha${useGif ? ".gif" : ".webp"}`,
  nup: `/emoj-gif/nup${useGif ? ".gif" : ".webp"}`,
  oo: `/emoj-gif/oo${useGif ? ".gif" : ".webp"}`,
  quay: `/emoj-gif/quay${useGif ? ".gif" : ".webp"}`,
  xinchao: `/emoj-gif/xinchao${useGif ? ".gif" : ".webp"}`,
  quaythoi: `/emoj-gif/quaythoi${useGif ? ".gif" : ".webp"}`,
  ringochanh: `/emoj-gif/ringochanh${useGif ? ".gif" : ".webp"}`,
  momoleuleu: `/emoj-gif/momoleuleu${useGif ? ".gif" : ".webp"}`,
  kakiwink: `/emoj-gif/kakiwink${useGif ? ".gif" : ".webp"}`,
  bye: `/emoj-gif/bye${useGif ? ".gif" : ".webp"}`,
};

export const emojTextRegistry: any = {
  ":votay": "[votay]",
  ":votay:": "[votay]",
  yoyo: "[yoyo]",
  Yoyo: "[yoyo]",
  ":)": "😀",
  ":D": "😊",
  ":d": "😊",
  ";)": "😉",
  ">:(": "😆",
  ":'(": "😅",
  "B|": "😎",
  ":|": "😐",
  "=]]": "🤣",
  ":]]": "🤣",
  ":))": "🤣",
  "=))": "🤣",
  ">.<": "😆",
  ":(": "🙁",

  " momo ": " 🍑🍑 ",
  " Momo ": " 🍑🍑 ",
  "momo ": "🍑🍑 ",
  "Momo ": "🍑🍑 ",
  " momo": " 🍑🍑",
  " Momo": " 🍑🍑",

  " đào ": " 🍑 ",
  " Đào ": " 🍑 ",
  "đào ": "🍑 ",
  "Đào ": "🍑 ",
  " đào": " 🍑",
  " Đào": " 🍑",

  " táo ": " 🍎 ",
  " Táo ": " 🍎 ",
  "táo ": "🍎 ",
  "Táo ": "🍎 ",
  " táo": " 🍎",
  " Táo": " 🍎",

  " chim ": " 🐧 ",
  " Chim ": " 🐧 ",
  "chim ": "🐧 ",
  "Chim ": "🐧 ",
  " chim": " 🐧",
  " Chim": " 🐧",

  " cú ": " 🦉 ",
  " Cú ": " 🦉 ",
  "cú ": " 🦉 ",
  // 'Cú': '🦉 ',
  // ' cú': ' 🦉',
  // ' Cú': ' 🦉',

  " mì ": " 🥖 ",
  " Mì ": " 🥖 ",
  "mì ": "🥖 ",
  "Mì ": "🥖 ",
  // ' mì': ' 🥖',
  // ' Mì': ' 🥖',
};

const emojSpecialRegistry: any = {
  momo: "🍑🍑",
  Momo: "🍑🍑",
  đào: "🍑",
  Đào: "🍑",
  táo: "🍎",
  Táo: "🍎",
  cú: "🦉",
  Cú: "🦉",
  mì: "🥖",
  Mì: "🥖",
  chim: "🐧",
  Chim: "🐧",
};

const topFanIcons: any = {
  yoyo: "/top-fan/yo-yo.png",
};

const emojTextTopFanTextRegistry: any = {
  cmc: "🐧🥖🦉🍎",
  Cmc: "🐧🥖🦉🍎",
  // fbi: "Ikuchan's fan boi",
  FBI: "Ikuchan's fan boi",
  Fbi: "Ikuchan's fan boi",
};

const emojSpecial = Object.keys(emojSpecialRegistry);

function escapeRegExp(str: string) {
  return str.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function replaceAll(str: string, find: string, replace: string) {
  return str ? str.replace(new RegExp(escapeRegExp(find), "g"), replace) : '';
}

const emojTexts = Object.keys(emojTextRegistry);
const emojTextTopFans = Object.keys(emojTextTopFanTextRegistry);

const emojIcons = [
  "🐧",
  "🥖",
  "🦉",
  "🍑",
  "🍎",
  "🐐",
  "😀",
  "😁",
  "😂",
  "🤣",
  "😃",
  "😄",
  "😅",
  "😆",
  "😉",
  "😊",
  "😋",
  "😎",
  "😍",
  "😘",
  "😗",
  "😙",
  "😚",
  "🙂",
  "🤗",
  "🤩",
  "🤔",
  "🤨",
  "😐",
  "😑",
  "😶",
  "🙄",
  "😏",
  "😣",
  "😥",
  "😮",
  "🤐",
  "😯",
  "😪",
  "😫",
  "😴",
  "😌",
  "😛",
  "😜",
  "😝",
  "🤤",
  "😒",
  "😓",
  "😔",
  "😕",
  "🙃",
  "🤑",
  "😲",
  "🙁",
  "😖",
  "😞",
  "😟",
  "😤",
  "😢",
  "😭",
  "😦",
  "😧",
  "😨",
  "😩",
  "🤯",
  "😬",
  "😰",
  "😱",
  "🤪",
  "😳",
  "😵",
  "😡",
  "😠",
  "🤬",
  "😷",
  "🤒",
  "🤕",
  "🤢",
  "🤮",
  "🤧",
  "😇",
  "🤠",
  "🤡",
  "🤥",
  "🤫",
  "🤭",
  "🧐",
  "🤓",
];

const nogizakaEmojGif = Object.keys(nogizakaEmojGifRepo);

function youtubeParser(url: string) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
}

const scrollToBottomMessage = (time = 200, force = false) => {
  const e = document.getElementById("messages");
  if (e) {
    const isBottom = isBottomOfMessageList();
    if (isBottom || force) {
      setTimeout(() => {
        animateScroll.scrollToBottom({
          containerId: "messages",
          duration: 200,
        });
      }, time);
    }
  }
};

const replaceEmoticons = (text: string, showGif = false) => {
  for (let i = 0; i < emojSpecial.length - 1; i++) {
    if (text === emojSpecial[i]) {
      return emojSpecialRegistry[emojSpecial[i]];
    }
  }

  emojTexts.forEach((emojKey) => {
    text = replaceAll(text, emojKey, emojTextRegistry[emojKey] as any);
  });

  emojTextTopFans.forEach((emojKey) => {
    text = replaceAll(text, emojKey, emojTextTopFanTextRegistry[emojKey]);
  });

  var tmp = JSON.parse(JSON.stringify(text)).replace(/<[^>]*>?/gm, "");

  text.replace(/[^[(.*)\]]+/g, function (match) {
    if (!match.trim()) {
      return match;
    }

    var emoj = match.replace("[", "").replace("]", "");
    if (nogizakaEmojGifRepo[emoj]) {
      tmp = tmp.replace(
        `[${match}]`,
        `<img class="nogizaka-chan-message messageIncludeGif" alt="${emoj}" src="${nogizakaEmojGifRepo[emoj]}"></li>`
      );
    } else if (nogizakaEmojChansPngRepo[emoj]) {
      tmp = tmp.replace(
        `[${match}]`,
        `<img class="nogizaka-chan-message" src="${nogizakaEmojChansPngRepo[emoj]}" alt="${match}" height="42" width="42"></li>`
      );
    } else if (topFanIcons[emoj]) {
      tmp = tmp.replace(
        `[${match}]`,
        `<img class="nogizaka-chan-message" src="${topFanIcons[emoj]}" alt="${match}" height="42" width="42"></li> Yoyo`
      );
    }

    return match;
  });

  text.replace(
    /(https|http)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#!=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#!?&//=]*)?/gi,
    function (match) {
      const regexImg = RegExp(
        /((https|http)?:\/\/[^ ]+?(?:\.jpeg|\.jpg|\.png|\.gif|\.webp)).*$/,
        "gi"
      );
      if (regexImg.test(match)) {
        tmp = tmp.replace(
          match,
          `<a href="${match}" target="_blank" rel="noopener noreferrer" title="Share link"><img class="nogizaka-chan-message" src="${match}" alt="Message Image"></a>`
        );
      } else {
        tmp = tmp.replace(
          match,
          `<a href="${match}" target="_blank" rel="noopener noreferrer" title="Share link">${match}</a>`
        );
      }

      return match;
    }
  );

  return renderHTML(tmp);
};

const checkIsMobile = () => {
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  ) {
    return true;
  }

  return false;
};

const getUserFullName = () => {
  return localStorage.getItem(CONFIG.USER_FULL_NAME);
};

const getUserAvatar = () => {
  return localStorage.getItem(CONFIG.USER_FULL_AVATAR);
};

const setUserFullName = (fullName: string) => {
  return localStorage.setItem(CONFIG.USER_FULL_NAME, fullName);
};

const setUserAvatar = (avatar: string) => {
  return localStorage.setItem(CONFIG.USER_FULL_AVATAR, avatar);
};

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// const updateLastActive = () => {
//   return localStorage.setItem(CONFIG.LAST_ACTIVE, Date.now().toString());
// }
// const getLastActive = () => {
//   try {
//     return parseInt(localStorage.getItem(CONFIG.COME_BACK) as any, 10);
//   } catch (error) {
//     return 0;
//   }
// }

const updateComeback = () => {
  return localStorage.setItem(CONFIG.COME_BACK, Date.now().toString());
};

const getLastComeback = () => {
  try {
    const time = parseInt(localStorage.getItem(CONFIG.COME_BACK) as any, 10);
    updateComeback();
    return time;
  } catch (error) {
    return 0;
  }
};

const checkShowHelloComeback = () => {
  const lastComeBack = getLastComeback();
  const current = Date.now();
  if (current - lastComeBack > 10 * 60 * 1000) {
    // if ((current - lastComeBack) > 10) {
    return true;
  }

  return false;
};

const hiMessages = [
  "chúc bạn một ngày tốt lành!",
  "mừng bạn đã trở lại!",
  "lâu rồi không gặp!",
];

const getRandomHiMessage = () => {
  return hiMessages[getRandomInt(0, hiMessages.length - 1)];
};

const topIdols = Nogizaka46Members.filter((item) => item.isTop);
const getRandomIdol = () => {
  const randomMemberInt = getRandomInt(0, topIdols.length - 1);

  return topIdols[randomMemberInt];
};

const removeUserFullName = () => {
  return localStorage.removeItem(CONFIG.USER_FULL_NAME);
};

const removeUserAvatar = () => {
  return localStorage.removeItem(CONFIG.USER_FULL_AVATAR);
};

const setMasterPassword = (password: string) => {
  return localStorage.setItem(CONFIG.MASTER_PASSWORD, password);
};

const removeMasterPassword = () => {
  return localStorage.removeItem(CONFIG.MASTER_PASSWORD);
};

const getMasterPassword = () => {
  return localStorage.getItem(CONFIG.MASTER_PASSWORD);
};

const capitalizeFirstLetter = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

function isURL(str: string) {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
}

const isBottomOfMessageList = () => {
  const e = document.getElementById('messages');
  if (e) {
    return e.scrollHeight - e.scrollTop <= e.clientHeight + 300;
  };

  return false;
};

const getIframeHeight = () => {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  if (screenWidth < screenHeight) {
    return `${screenWidth / 1.64}px`;
  }

  return "100%";
};

function strDateToYMD(date: Date, prefix: string = '/') {
  const d = date.getDate();
  const m = date.getMonth() + 1; //Month from 0 to 11
  const y = date.getFullYear();

  return '' + y + prefix + (m <= 9 ? '0' + m : m) + prefix + (d <= 9 ? '0' + d : d);
}

function strDateToMD(date: Date, prefix: string = '/') {
  const d = date.getDate();
  const m = date.getMonth() + 1; //Month from 0 to 11

  return (m <= 9 ? '0' + m : m) + prefix + (d <= 9 ? '0' + d : d);
}

function getMembersBirthTodayBirthday() {
  const todayMD = strDateToMD(new Date(Date.now() - 7200000));

  return Nogizaka46Members.filter(item => todayMD === strDateToMD(new Date(item.birthday)));
}

export {
  getMembersBirthTodayBirthday,
  strDateToYMD,
  getIframeHeight,
  getUserAvatar,
  getUserFullName,
  setUserAvatar,
  setUserFullName,
  removeUserFullName,
  removeUserAvatar,
  nogizakaEmojChans,
  replaceEmoticons,
  setMasterPassword,
  removeMasterPassword,
  getMasterPassword,
  checkIsMobile,
  youtubeParser,
  capitalizeFirstLetter,
  nogizakaEmojGif,
  nogizakaEmojGifRepo,
  nogizakaEmojChansPngRepo,
  updateComeback,
  checkShowHelloComeback,
  isURL,
  getRandomInt,
  getRandomIdol,
  getRandomHiMessage,
  replaceAll,
  emojTexts,
  emojIcons,
  isBottomOfMessageList,
  scrollToBottomMessage,
  // UserAvatar,
};
