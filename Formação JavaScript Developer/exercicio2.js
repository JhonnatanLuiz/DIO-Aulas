//faça um programa que receba n (quantidade de números) e seus respectivos valores.
// Imprima o maior número par e o menor número impar.

// exemplo:
// entrada:
// 5
// 2
// 5
// 8
// -4
// 11
// saída:
// maior número par: 8
// menor número impar: 5

// Importa as funções auxiliares do arquivo de simulação.
// - gets(): devolve a próxima "linha" de entrada (como se o usuário tivesse digitado)
// - print(): imprime na tela (normalmente usa console.log)
const { gets, print } = require('./funcoes_auxiliares-ex2');

// IMPORTANTE: O PRIMEIRO VALOR DA ENTRADA É O `n`.
// Ou seja, a primeira chamada de gets() deve retornar a quantidade de números
// que serão lidos logo em seguida.
// Exemplo de entrada:
// 5  <- n
// 2
// 5
// 8
// -4
// 11
const n = Number(gets());

// Vamos guardar:
// - o MAIOR número PAR encontrado
// - o MENOR número ÍMPAR encontrado
//
// Usamos sentinelas (valores iniciais extremos) para facilitar:
// - maiorPar começa em -Infinity (qualquer número real é maior que isso)
// - menorImpar começa em Infinity (qualquer número real é menor que isso)
let maiorPar = -Infinity;
let menorImpar = Infinity;

// Loop para ler EXATAMENTE `n` números.
for (let i = 0; i < n; i++) {
    // Lê a próxima entrada e converte para número.
    // gets() geralmente retorna string, por isso usamos Number(...).
    const numero = Number(gets());

    // Verifica se é par:
    // numero % 2 é o resto da divisão por 2.
    // - se resto = 0 => número par
    // - senão => número ímpar
    if (numero % 2 === 0) {
        // Atualiza o maiorPar com o maior valor entre:
        // - o maiorPar atual
        // - o numero lido agora
        maiorPar = Math.max(maiorPar, numero);

        // Como já tratamos o caso do número par, podemos pular para a próxima
        // iteração do loop (evita usar um else).
        continue;
    }

    // Se não caiu no if, então é ímpar.
    // Atualiza o menorImpar com o menor valor entre:
    // - o menorImpar atual
    // - o numero lido agora
    menorImpar = Math.min(menorImpar, numero);
}

// Se maiorPar continuar em -Infinity, significa que nenhum número par apareceu.
if (maiorPar === -Infinity) {
    print('Nenhum número par foi informado.');
} else {
    print(`Maior número par: ${maiorPar}`);
}

// Se menorImpar continuar em Infinity, significa que nenhum número ímpar apareceu.
if (menorImpar === Infinity) {
    print('Nenhum número ímpar foi informado.');
} else {
    print(`Menor número ímpar: ${menorImpar}`);
}
