// Personagens
const cards =
[
    {"name": "Martchelou", "velocidade": 7, "manobrabiliadde": 7, "poder": 7, "src": "martchelou.gif"},
    {"name": "Felipão","velocidade": 10, "manobrabiliadde": 8, "poder": 10, "src": "felipão.gif"},
    {"name": "Luigi", "velocidade": 3, "manobrabiliadde": 4, "poder": 4, "src": "luigi.gif"},
    {"name": "Mario", "velocidade": 4, "manobrabiliadde": 3, "poder": 3, "src": "mario.gif"},
    {"name": "Peach", "velocidade": 3, "manobrabiliadde": 4, "poder": 2, "src": "peach.gif"},
    {"name": "Yoshi", "velocidade": 2, "manobrabiliadde": 4, "poder": 3, "src": "yoshi.gif"},
    {"name": "DonkeyKong", "velocidade": 2, "manobrabiliadde": 2, "poder": 5, "src": "donkeykong.gif"},
    {"name": "Bowser", "velocidade": 5, "manobrabiliadde": 2, "poder": 5, "src": "bowser.gif"},
];
const desafios = ['Reta','Curva','Confronto'];
// seleciona duas opções nos cards
function getPlayers()
{
    // Cria um array com as opções em cards
    const numeros = [];
    for (let i = 0; i < cards.length; i++)
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
const player_01 = cards[p1];
const player_02 = cards[p2];
// inicia o placar do jogo para cada player
player_01.pontos = 0;
player_02.pontos = 0;
// rola os dados
async function rollDice()
{
    return Math.floor(Math.random() * 6) + 1;
}
// define o desafio
async function chalenger()
{
    return desafios[Math.floor(Math.random() * desafios.length)];
}
// executa a rodada
async function racing(race, dado_01, dado_02)
{
    let boostPoints = 0;
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
        case 'Reta':
            if (player_01.velocidade > player_02.velocidade)
            {
                player_01.pontos++;
            } else {
                player_02.pontos++;
            }
            break;
        case 'Curva':
            if (player_01.manobrabiliadde > player_02.manobrabiliadde)
            {
                player_01.pontos++;
            } else {
                player_02.pontos++;
            }
            break;
        case 'Confronto':
            if (player_01.poder > player_02.poder)
            {
                player_01.pontos+=boostPoints;
                if (player_02.pontos > 0) player_02.pontos-=boostPoints;
            } else {
                player_02.pontos+=boostPoints;
                if (player_01.pontos > 0) player_01.pontos-=boostPoints;
            }
            break;
    }
}
// executa a corrida
async function playRaceEngine(player_01, player_02)
{
    for (let i = 1; i <=5; i++)
    {
        let dado_01 = await rollDice();
        let dado_02 = await rollDice();
        let race = await chalenger();        
        await racing(race, dado_01, dado_02);
        console.log(`### Rodada ${i} ###
### Desafio: ${race} ###            
Dado ${dado_01} para ${player_01.name}
Dado ${dado_02} para ${player_02.name}
### Placar: [${player_01.name}: ${player_01.pontos}] X [${player_02.name}: ${player_02.pontos}] ###
::::::::::::::::::::::::::::::::::::::::::::::::::`)
    }
    if (player_01.pontos > player_02.pontos)
    {
        console.log(`### O vencedor é ${player_01.name} com ${player_01.pontos} pontos! ###`);
    } else if (player_01.pontos < player_02.pontos) {
        console.log(`### O vencedor é ${player_02.name} com ${player_02.pontos} pontos! ###`);
    } else {
        console.log(`### Empate! ###`);
    }
}
(async function main()
{
    console.log(`A corrida entre [${player_01.name}: ${player_01.pontos}] X [${player_02.name}: ${player_02.pontos}] começou!!!
++++++++++++++++++++++++++++++++++++++++++++++++++`);
    await playRaceEngine(player_01, player_02);
})()