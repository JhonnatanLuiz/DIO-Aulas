// Funções auxiliares para simular entrada/saída no Node.js (CommonJS)
//
// Como usar em outro arquivo:
// const { gets, print } = require('./funcoes_auxiliares-ex1');
// const media = Number(gets());
// print(media);

// Simula as linhas de entrada (como se viessem do teclado)
const entradas = ['-4'];
let index = 0;

function gets() {
	// Retorna a próxima entrada e avança o índice
	return entradas[index++];
}

function print(texto) {
	console.log(texto);
}

module.exports = {
	gets,
	print,
};
