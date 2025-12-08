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

// Elabore um algoritmo que calcule o IMC e mostre sua classificação

/*const peso = 90; // peso em kg
const altura = 1.75; // altura em metros

const imc = peso / (Math.pow(altura, 2)); // cálculo do IMC

if (imc < 18.5) {
    console.log('Abaixo do peso');
} else if (imc >= 18.5 && imc < 25) {
    console.log('Peso normal');
} else if (imc >= 25 && imc < 30) {
    console.log('Acima do peso');
} else if (imc >= 30 && imc < 40) {
    console.log('Obeso');
} else {
    console.log('Obesidade grave');
}
console.log(imc.toFixed(2));*/

// Cálculo do valor final de um produto baseado na forma de pagamento

const precoEtiqueta = 100; // preço original do produto
const formaDePagamento = 4; // forma de pagamento escolhida

if (formaDePagamento === 1) {
    const valorFinal = precoEtiqueta * 0.9; // 10% de desconto à vista no débito
    console.log(valorFinal.toFixed(2));
} else if (formaDePagamento === 2) {
    const valorFinal = precoEtiqueta * 0.85; // 15% de desconto à vista no dinheiro ou pix
    console.log(valorFinal.toFixed(2));
} else if (formaDePagamento === 3) {
    const valorFinal = precoEtiqueta; // preço normal em até 2x no cartão
    console.log(valorFinal.toFixed(2));
} else if (formaDePagamento === 4) {
    const valorFinal = precoEtiqueta * 1.1; // 10% de juros em 3x ou mais no cartão
    console.log(valorFinal.toFixed(2));
}