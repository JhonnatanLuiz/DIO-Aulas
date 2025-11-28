const precoMediaCombustivel = 5.79; // preço médio do combustível por litro
const kmPorLitros = 10; // consumo médio do veículo em km por litro
const DistanciaEmKm = 100; // distância da viagem em km

const litrosConsumidos = DistanciaEmKm / kmPorLitros; // cálculo dos litros consumidos na viagem    
const valorGasto = litrosConsumidos * precoMediaCombustivel; // cálculo do valor gasto com combustível

console.log(valorGasto.toFixed(2)); // exibe o valor gasto com combustível, formatado com 2 casas decimais