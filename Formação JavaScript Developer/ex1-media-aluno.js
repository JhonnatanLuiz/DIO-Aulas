// faça um programa que receba a media de um aluno.
// caso a média seja < 5, imprima "Reprovado"
// caso a média seja >= 5 e < 7, imprima "Recuperação"
// caso a média seja >= 7, imprima "Aprovado"
// Exemplo igual ao da imagem: importar gets/print de um módulo auxiliar
const { gets, print } = require('./funcoes_auxiliares-ex1');

const media = Number(gets());

if (media < 0 && media > 10) {
  print('Média inválida');
} else if (media > 0 && media < 5) {
  print('Reprovado');
} else if (media >= 5 && media < 7) {
  print('Recuperação');
} else if (media >= 7 && media <= 10) {
  print('Aprovado');
} else {
  print('Média inválida');
}
