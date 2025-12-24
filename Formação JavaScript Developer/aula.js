// Cálculo do valor gasto em uma viagem de carro

/*const precoGasolina = 5.49; // preço da gasolina por litro
const precoEtanol = 4.19; // preço do etanol por litro
const kmPorLitros = 10; // consumo médio do veículo em km por litro
const DistanciaEmKm = 100; // distância da viagem em km
const tipoCombustivel = 'Gasolina'; // tipo de combustível utilizado na viagem

const litrosConsumidos = DistanciaEmKm / kmPorLitros; // cálculo dos litros consumidos na viagem  

if (tipoCombustivel === 'Etanol') {
    const valorGasto = litrosConsumidos * precoEtanol; // cálculo do valor gasto com combustível
    console.log(valorGasto.toFixed(2));
} else if (tipoCombustivel === 'Gasolina') {
    const valorGasto = litrosConsumidos * precoGasolina; // cálculo do valor gasto com combustível
    console.log(valorGasto.toFixed(2));
}*/

// Cálculo de média dos alunos

/*const nota1 = 7; 
const nota2 = 7;
const nota3 = 7;
const media = (nota1 + nota2 + nota3) / 3; // cálculo da média das notas
console.log(media.toFixed(2));

if (media < 5) {
    console.log('Reprovado');
} else if (media >= 5 && media < 7) {
    console.log('Recuperação');
} else {
    console.log('Aprovado');
}
console.log(media);*/

/*classclass caCarrocarroCarro {}
    
contrstructor)()marca,cor, gast    constructor(marca,cor, gastoPorKm) {
         thisthis.marca = marca/;        this.marca = marca;
        this.cor = cor;
        this.gastoPorKm = gastoPorKm; // gasto de combustível por km
    }
}
const carro1 = new Carro('Uno', 'branco', 0.1); // 0.1 litros por km
const distanciaEmKm = 100;
const precoCombustivel = 5.49; // preço do combustível por litro

const calcularCustoViagem = (carro, distancia, precoCombustivel) => {
    const litrosConsumidos = carro.gastoPorKm * distancia;
    return litrosConsumidos * precoCombustivel;
}

const custoViagem = calcularCustoViagem(carro1, distanciaEmKm, precoCombustivel);
console.log(`O custo da viagem com o meu carro ${carro1.marca} ${carro1.cor} é R$ ${custoViagem.toFixed(2)}`);*/

//

/*class Pessoa {
    constructor(nome, peso, altura) {
        this.nome = nome;
        this.peso = peso;
        this.altura = altura;
    }
}

const pessoa1 = new Pessoa('Jhonnatan', 90, 1.75);

const calcularIMC = (pessoa) => {
    const imc = pessoa.peso / (pessoa.altura ** 2);
    return imc;
}

const imcPessoa1 = calcularIMC(pessoa1);

console.log(`${pessoa1.nome} tem IMC de ${imcPessoa1.toFixed(2)} e está classificado como:`);

if (imcPessoa1 < 18.5) {
    console.log('Abaixo do peso');
} else if (imcPessoa1 >= 18.5 && imcPessoa1 < 25) {
    console.log('Peso normal');
} else if (imcPessoa1 >= 25 && imcPessoa1 < 30) {
    console.log('Acima do peso');
} else if (imcPessoa1 >= 30 && imcPessoa1 < 40) {
    console.log('Obeso');
} else {
    console.log('Obesidade grave');
}
*/

// ========================================

// percorrendo arrays com for

/*const notas = [];

notas.push(7);
notas.push(8);
notas.push(6);
notas.push(9);
notas.push(5);

let soma = 0;

for (let i = 0; i < notas.length; i++) {
    const nota = notas[i];
    soma = soma + nota;
}

const media = soma / notas.length;

console.log(`A média das notas é ${media.toFixed(2)}`);*/

// ========================================

// Crie um programa que dado um número imprima a sua tabuada de multiplicação de 1 a 10

/*for (let i = 1; i <= 10; i++) { // loop de 1 a 10
    const numero = 5; // número para o qual queremos a tabuada
    const resultado = numero * i; // cálculo do resultado da multiplicação
    console.log(`${ numero } x ${ i } = ${ resultado }`); // exibição do resultado
}*/

// ========================================

// Crie um programa que seja capaz de percorrer uma lista de números e imprima cada número par encontrado na lista

/*const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // lista de números

for (let i = 0; i < numeros.length; i++) { // loop para percorrer a lista
    const numero = numeros[i]; // obtém o número atual da lista

    if (numero % 2 === 0) { // verifica se o número é par
        console.log(numero); // imprime o número par
    }
}   */

// ========================================

// Funções auxiliares gets e print

/*function gets() {
    return 10; // Retorna um valor fixo para simular a entrada do usuário
}*/

/*function print(texto) {
    console.log(texto); // Imprime o texto no console
}*/

// Exemplo de como importar e exportar funções em JavaScript
/*export { gets, print }; // Exporta as funções para serem usadas em outros arquivos
import { gets, print } from './aula.js'; // Importa as funções de outro arquivo*/

// ========================================

// Uma sala contém 5 alunos e para cada aluno foi sorteado um número de 1 a 100.
// Faça um programa que receba os 5 números sorteados para os alunos e mostre o maior número sorteado.

// Dados de entrada: 5, 50, 10, 98, 23
// Saída esperada: 98

/*const entradas = [5, 50, 10, 98, 23]; // Números sorteados para os alunos
let i = 0; // Índice para percorrer as entradas

function gets() {
    const valor = entradas[i];
    i++;
    return valor;
}

let maiorNumero = 0; // Variável para armazenar o maior número

for (let j = 0; j < 5; j++) { // Loop para ler os 5 números

    const numeroSorteado = gets(); // Lê o número sorteado

    if (numeroSorteado > maiorNumero) { // Verifica se o número atual é maior que o maior número armazenado
        maiorNumero = numeroSorteado; // Atualiza o maior número
    }
}

console.log(maiorNumero); // Imprime o maior número sorteado */

// ========================================


const { gets, print } = require('./funcoes_auxiliares-ex1');

const media = gets();

if (media < 5) {
    print('Reprovado');
} else if (media >= 5 && media < 7) {
    print('Recuperação');
} else {
    print('Aprovado');
}




