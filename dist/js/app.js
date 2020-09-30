const btnGameRules = document.getElementById('game_rules');
const WiewRules = document.querySelector('.game-rules-wiew');
btnGameRules.onclick = function () {
    document.querySelector('.game-rules-wiew').classList.add("open")
}
WiewRules.onclick = function () {
    WiewRules.classList.remove('open')
}
document.querySelector('.btn_play_again').onclick = function () {
    document.querySelector('.pos_center').classList.remove("hide")
    document.querySelector('.game_chossed').classList.add("hide")
    pl.classList.remove('animate')
    cp.classList.remove('animate')
}
const item = document.querySelectorAll('.s');
item.forEach(item => {
    item.onclick = function () {
        document.querySelector('.pos_center').classList.add("hide")
        document.querySelector('.game_chossed').classList.remove("hide")
        let playerPicked = item.getAttribute('value');
        showPickItem(playerPicked, 'player');
        let cumputePicked = computePicked();
        checkWinter(playerPicked, cumputePicked)
    }
})

const pl = document.querySelector('.player_picked_item');
const cp = document.querySelector('.compute_picked_item');
const Color = {
    'paper': ['#506cf4', 'linear-gradient(#4865f4, #5671f5)', '0px 8px 0px -1px #2642bf'],
    'rock': ['#dc3853', 'linear-gradient(#dc2e4e, #dd405d)', '0px 8px 0px -1px #991635'],
    'scissors': ['#eaa81e', 'linear-gradient(#ec9e0e, #eca922)', '0px 8px 0px -1px #cc6d1b']
};

function showPickItem(item, type) {
    if (type === 'player') {
        pl.innerHTML = `<img src="./images/icon-${item}.svg" alt="" srcset="">`
        pl.style.setProperty("border-color", Color[item][0])
        pl.style.setProperty('background-image', Color[item][1])
        pl.style.setProperty('box-shadow', Color[item][2])

    } else {
        cp.innerHTML = `<img src="./images/icon-${item}.svg" alt="" srcset="">`
        cp.style.setProperty("border-color", Color[item][0])
        cp.style.setProperty('background-image', Color[item][1])
        cp.style.setProperty('box-shadow', Color[item][2])
    }
}
const itemNames = ['paper', 'rock', 'scissors'];
let score = 0,
    computeScore = 0;

function computePicked() {
    let randomItem = Math.floor(Math.random() * itemNames.length)
    showPickItem(itemNames[randomItem], '')
    return itemNames[randomItem];
}
//paper > rock > scissors 
const checks = {
    'paper': 'rock',
    'rock': 'scissors',
    'scissors': 'paper'
}

function checkWinter(play, compute) {
    let status = '';
    if (play === compute) {
        status = 'Draw';
    } else if (checks[play] === compute) {
        status = 'You Win';
        document.getElementById('score').innerText = ++score
        pl.classList.add('animate')
    } else {
        status = "You Lose"
        document.getElementById('computer_score').innerText = ++computeScore;
        cp.classList.add('animate')
    }
    document.querySelector('.btn_status').classList.remove('hide')
    document.querySelector('.status').innerText = status

}