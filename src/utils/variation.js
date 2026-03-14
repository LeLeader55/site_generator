export function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function pickVariant(list, seed) {
  const index = Math.floor(seededRandom(seed) * list.length);
  return list[index];
}

export function shuffleArray(array, seed) {
  const arr = [...array];
  let random = seededRandom(seed);

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
    random = seededRandom(random * 1000);
  }

  return arr;
}