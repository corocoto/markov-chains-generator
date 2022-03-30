export const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const pickRandom = (list) => list[random(0, list.length - 1)];