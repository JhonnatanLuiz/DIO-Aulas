const entradas = ['3000', '450'];
let index = 0;

function gets() {
  return entradas[index++];
}

function print(texto) {
  console.log(texto);
}

module.exports = {
  gets,
  print,
};