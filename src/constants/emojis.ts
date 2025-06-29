/*
source: https://github.com/jesselpalmer/node-emojis/blob/main/lib/emojis/animal-emojis.js
into Array.from(new Set(Object.values(animalEmojis)));
*/

//for animal name in aria label
const animalEmojis = {
  ant: '🐜',
  bear_face: '🐻',
  bird: '🐦',
  blowfish: '🐡',
  boar: '🐗',
  bug: '🐛',
  camel: '🐪',
  cat: '🐈',
  cat_face: '🐱',
  chicken: '🐔',
  chipmunk: '🐿️',
  cow: '🐄',
  cow_face: '🐮',
  crocodile: '🐊',
  dog_face: '🐶',
  dogface: '🐶',
  dog: '🐕',
  doggo: '🐕',
  domestic_cat: '🐈',
  domesticcat: '🐈',
  dove: '🕊',
  elephant: '🐘',
  ewe: '🐑',
  feline: '🐈',
  frog_face: '🐸',
  frogface: '🐸',
  goat: '🐐',
  hamster_face: '🐹',
  hamsterface: '🐹',
  honeybee: '🐝',
  horse: '🐎',
  horse_face: '🐴',
  housecat: '🐈',
  koala: '🐨',
  leopard: '🐆',
  lion_face: '🦁',
  monkey: '🐒',
  monkey_face: '🐵',
  monkeyface: '🐵',
  mouse: '🐁',
  mouse_face: '🐭',
  octopus: '🐙',
  ox: '🐂',
  panda_face: '🐼',
  penguin: '🐧',
  pig: '🐖',
  pig_face: '🐷',
  pig_nose: '🐽',
  rabbit: '🐇',
  rabbit_face: '🐰',
  rabbitface: '🐰',
  ram: '🐏',
  rat: '🐀',
  roster: '🐓',
  scorpion: '🦂',
  snake: '🐍',
  snail: '🐌',
  spider: '🕷️',
  tiger: '🐅',
  tiger_face: '🐯',
  two_hump_camel: '🐫',
  turkey: '🦃',
  turtle: '🐢',
  unicorn: '🦄',
  water_buffalo: '🐃',
  wolf_face: '🐺',
  whale: '🐋'
} as const;
type AnimalEmoji = keyof typeof animalEmojis;

export const uniqueAnimalEmojis = [
  '🐜',
  '🐻',
  '🐦',
  '🐡',
  '🐗',
  '🐛',
  '🐪',
  '🐈',
  '🐱',
  '🐔',
  '🐿️',
  '🐄',
  '🐮',
  '🐊',
  '🐶',
  '🐕',
  '🕊',
  '🐘',
  '🐑',
  '🐸',
  '🐐',
  '🐹',
  '🐝',
  '🐎',
  '🐴',
  '🐨',
  '🐆',
  '🦁',
  '🐒',
  '🐵',
  '🐁',
  '🐭',
  '🐙',
  '🐂',
  '🐼',
  '🐧',
  '🐖',
  '🐷',
  '🐽',
  '🐇',
  '🐰',
  '🐏',
  '🐀',
  '🐓',
  '🦂',
  '🐍',
  '🐌',
  '🕷️',
  '🐅',
  '🐯',
  '🐫',
  '🦃',
  '🐢',
  '🦄',
  '🐃',
  '🐺',
  '🐋'
];

export const MAXIMUM_ALLOWED_PAIRS = uniqueAnimalEmojis.length;

export const getAnimalNameByEmojiId = (animalId: number): string => {
  const emoji = uniqueAnimalEmojis[animalId];
  const animalName = Object.keys(animalEmojis).find(
    (key) => animalEmojis[key as AnimalEmoji] === emoji
  );
  return animalName ? animalName.replace(/_/g, ' ') : 'Unknown Animal';
};
