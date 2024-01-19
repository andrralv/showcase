export const getRandomRange = (max: number) => {
  return Math.floor(Math.random() * max) + 1;
}

export const getRow = (i: number) => {
  if (0 <= i && i <= 4) {
    return 0;
  }
  if (4 < i && i <= 8) {
    return 1;
  }
  if (8 < i && i <= 12) {
    return 2;
  }
}