// Faça um programa que calcule e imprima o salário a ser tranferido á um funcionário.
// Pra realizar o cálculo receba o valor do salário bruto e o adicional dos benefícios.
// O salário a ser tranferido é calculado da seguinte forma:

// O valor bruto do salário - percentual de imposto mediante a faixa salarial + adicional dos benefícios.

// Faixa salarial        | Percentual de imposto
// Até R$ 1.500,00      | 5%
// De R$ 1.500,01 a R$ 2.500,00 | 10%
// Acima de R$ 2.500,00 | 15%

// Exemplo de entrada:
// 2500
// 250
// Exemplo de saída:
// 2250

// ==============================
// EXPLICAÇÃO (BEM SIMPLES)
// ==============================
// A entrada tem 2 números:
// 1) salário bruto
// 2) benefícios
//
// Passo a passo:
// 1) Ler salário bruto e benefícios
// 2) Descobrir a porcentagem do imposto (5%, 10% ou 15%) pela faixa
// 3) Calcular o valor do imposto
// 4) Calcular o salário final: salário bruto - imposto + benefícios

// Importa as funções auxiliares (simulam a leitura/saída como na plataforma):
// - gets(): pega a próxima "linha" de entrada
// - print(): mostra a saída
const { gets, print } = require('./funcoes_auxiliares-ex3');

// Lê a entrada (gets geralmente retorna string; Number converte para número)
const salarioBruto = Number(gets());
const beneficios = Number(gets());

// Guarda a porcentagem do imposto (em forma decimal)
// Ex.: 5% vira 0.05
let percentualImposto = 0;

// Escolhe a porcentagem do imposto pela faixa salarial
if (salarioBruto <= 1500) {
    percentualImposto = 0.05;
} else if (salarioBruto <= 2500) {
    percentualImposto = 0.10;
} else {
    percentualImposto = 0.15;
}

// Calcula o imposto em reais
const imposto = salarioBruto * percentualImposto;

// Calcula o salário final (transferido)
const salarioLiquido = salarioBruto - imposto + beneficios;

// Imprime com 2 casas decimais (padrão comum em exercícios de dinheiro)
print(salarioLiquido.toFixed(2));