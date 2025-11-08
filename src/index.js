// Personagens
const cardsArr =
[
    {"name": "Martchelou", "speed": 8, "handling": 6, "power": 4, "src": "martchelou.gif"},
    {"name": "Felipão","speed": 10, "handling": 8, "power": 6, "src": "felipão.gif"},
    {"name": "Luigi", "speed": 6, "handling": 4, "power": 2, "src": "luigi.gif"},
    {"name": "Mario", "speed": 4, "handling": 3, "power": 3, "src": "mario.gif"},
    {"name": "Peach", "speed": 3, "handling": 5, "power": 1, "src": "peach.gif"},
    {"name": "Yoshi", "speed": 2, "handling": 1, "power": 5, "src": "yoshi.gif"},
    {"name": "DonkeyKong", "speed": 1, "handling": 2, "power": 9, "src": "donkeykong.gif"},
    {"name": "Bowser", "speed": 9, "handling": 9, "power": 7, "src": "bowser.gif"},
];
const chalengerArr = ['Straight','Corner','Fight'];
// seleciona duas opções nos cardsArr
function getPlayers()
{
    // Cria um array com as opções em cardsArr
    const numeros = [];
    for (let i = 0; i < cardsArr.length; i++)
    {
        numeros.push(i);
    }
    // Embaralha o array
    for (let i = numeros.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
    }
    // Seleciona os dois primeiros números do array embaralhado
    const numerosSelecionados = numeros.slice(0, 2);
    return numerosSelecionados;
}
// desestrutura array para cada player
const [p1, p2] = getPlayers();
// define o card para cada player
const player_01 = cardsArr[p1];
const player_02 = cardsArr[p2];
delete player_01.src;
delete player_02.src;
// inicia o placar do jogo para cada player
player_01.pontos = 0;
player_02.pontos = 0;
// mostra cartas
let raceResult;
// rola os dados
async function rollDice() { return Math.floor(Math.random() * 6) + 1; }
// define o desafio
async function chalenger() { return chalengerArr[Math.floor(Math.random() * chalengerArr.length)]; }
// executa a rodada
async function racing()
{
    let boostPoints = 0;
    let dado_01 = await rollDice();
    let dado_02 = await rollDice();
    let race = await chalenger();        
    // soma os pontos dos dados para cada player
    player_01.pontos+=dado_01;
    player_02.pontos+=dado_02;    
    if (dado_01 > dado_02)
    {
         boostPoints = dado_01 - dado_02;
    } else {
        boostPoints = dado_02 - dado_01;
    }
    // verifica o card vencedor da rodada incrementando os pontos do vencedor
    switch(race)
    {
        case 'Straight':
            if (player_01.speed > player_02.speed) { player_01.pontos++; } else { player_02.pontos++; }
            raceResult = `Speed ${player_01.name}:${player_01.speed} vs ${player_02.name}:${player_02.speed}`;
        break;
        case 'Corner':
            if (player_01.handling > player_02.handling) { player_01.pontos++; } else { player_02.pontos++; }
            raceResult = `Handling ${player_01.name}:${player_01.handling} vs ${player_02.name}:${player_02.handling}`;
        break;
        case 'Fight':
            if (player_01.power > player_02.power) { player_01.pontos+=boostPoints; if (player_02.pontos > 0) player_02.pontos-=boostPoints; } else { player_02.pontos+=boostPoints; if (player_01.pontos > 0) player_01.pontos-=boostPoints; }
            raceResult = `Power ${player_01.name}:${player_01.power} vs ${player_02.name}:${player_02.power}`;
        break;
    }
    return [dado_01, dado_02, race];
}
// executa a corrida
async function playRaceEngine(player_01, player_02, dado_01, dado_02, race)
{
    console.log('Cards')
    console.table(player_01);
    console.table(player_02);
    for (let i = 1; i <=5; i++)
    {
        const [dado_01, dado_02, race] = await racing();
        console.log(`### Rodada ${i} ###
### Desafio: ${race} ###            
Dado ${dado_01} para ${player_01.name}
Dado ${dado_02} para ${player_02.name}
Atributo: ${raceResult}
### Placar: [${player_01.name}: ${player_01.pontos}] X [${player_02.name}: ${player_02.pontos}] ###
--------------------------------------------------------------------------------`)
    }
    if (player_01.pontos > player_02.pontos)
    {
        console.log(`### O vencedor é ${player_01.name} com ${player_01.pontos} pontos! ###`);
    } else if (player_01.pontos < player_02.pontos) {
        console.log(`### O vencedor é ${player_02.name} com ${player_02.pontos} pontos! ###`);
    } else {
        console.log(`### Empate! Anotado ###`);
    }
}
(async function main()
{
    console.log(`A corrida entre [${player_01.name}: ${player_01.pontos}] X [${player_02.name}: ${player_02.pontos}] começou!!!
++++++++++++++++++++++++++++++++++++++++++++++++++`);
    await playRaceEngine(player_01, player_02);
})()