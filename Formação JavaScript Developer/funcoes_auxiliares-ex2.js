// Funções auxiliares (CommonJS) para o Exercício 2
// Uso no arquivo principal:
// const { gets, print } = require('./funcoes_auxiliares-ex2');
//
// Simulação de entrada (exemplo do enunciado):
// 5
// 2
// 5
// 8
// -4
// 11

// Atenção: o primeiro valor é o `n` (quantidade de números que serão lidos depois).
// Se você quer considerar os valores: 1, 2, 5, 10, -4, 11
// então `n` precisa ser 6.
const entradas = ['6', '1', '2', '5', '10', '-4', '11'];
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
