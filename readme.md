# Mário Kart Desafio JS - Node.JS

## Players

Disputas de 2 em 2 com  as opções de personagnes

- Martchelou
- Felipão
- Luigi
- Mário
- Peach
- Yoshi
- Donkey Kong
- Bowser

## Cenários

Desafios: reta, curva, confronto

## Jogabilidade

[reta=>velocidade]
[curva=>manobrabiliadde]
[confronto=>poder]

o card soma os pontos do dado arremessado pelo player alternadamente

Jogadores:

- [X] O Computador deve receber dois personagens aleatŕios baseados nos cards para disputar a corrida em um objeto cada
- [X] Os personagens irão correr em uma pista aleatória de 5 rodadas
- [X] A cada rodada, será sorteado um bloco da pista que pode ser uma reta, curva ou confronto
- [X] Caso o bloco da pista seja uma RETA, o jogador deve jogar um dado de 6 lados e somar o atributo VELOCIDADE, quem vencer ganha um ponto
- [X] Caso o bloco da pista seja uma CURVA, o jogador deve jogar um dado de 6 lados e somar o atributo MANOBRABILIDADE, quem vencer ganha um ponto
- [X] Caso o bloco da pista seja um CONFRONTO, o jogador deve jogar um dado de 6 lados e somar o atributo PODER, quem perder, perde um ponto
- [X] Nenhum jogador pode ter pontuação negativa (valores abaixo de 0)
- [X] boostPoints pela diferença dos dados somando ao vencedor do confronto e subtraindo do perdedor
- [ ] Desacoplar rodada das corridas para permitir um desempate no final executando mais uma rodada separada
- [X] Implementar relatorio de cartas a cada rodada para tornar o resultado de cada rodada mais transparente
- [X] Mostrar as cartas no inicio como super trunfo.

Condição de vitória:

Ao final, vence quem acumulou mais pontos
