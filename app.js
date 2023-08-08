console.log("Nomor 1");

const in_a1 = [10, 20, 20, 10, 10, 30, 50, 10, 20];
const in_a2 = [6, 5, 2, 3, 5, 2, 2, 1, 1, 5, 1, 3, 3, 3, 5];
const in_a3 = [1, 1, 3, 1, 2, 1, 3, 3, 3, 3];
const getPairs = (arr) => {
  const pair = {};
  arr.forEach((i) => (pair[i] ? pair[i]++ : (pair[i] = 1)));
  return Object.values(pair)
    .map((i) => Math.floor(i / 2))
    .reduce((a, b) => a + b, 0);
};
console.log(getPairs(in_a1));
console.log(getPairs(in_a2));
console.log(getPairs(in_a3));

console.log("Nomor 2");

const in_b1 = "Saat meng*ecat tembok, Agung dib_antu oleh Raihan.";
const in_b2 = "Berapa u(mur minimal[ untuk !mengurus ktp?";
const in_b3 = "Masing-masing anak mendap(atkan uang jajan ya=ng be&rbeda.";

const wordCounter = (str) => {
  const text = str.slice(0, str.length - 1);
  const arr = [];
  text.split(" ").forEach((i) => {
    if (!/[^a-zA-Z,-]/.test(i)) arr.push(i);
  });
  return arr.length;
};

console.log(wordCounter(in_b1));
console.log(wordCounter(in_b2));
console.log(wordCounter(in_b3));
