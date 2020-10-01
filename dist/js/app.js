
const itemNames = ['paper', 'rock', 'scissors', 'lizard', 'spock'];
let score = 0, computeScore = 0;

const boards = document.querySelectorAll('div[class *="game_body--board"]');
const items = Array.from([[...boards[0].children[0].children], [...boards[1].children[0].children]]);

const boardCheck = document.querySelector('.game_chossed');
const player = boardCheck.querySelector('.player_picked_item');
const computer = boardCheck.querySelector('.compute_picked_item');
const status = document.querySelector('.status');

const ver = document.querySelectorAll('.set_version input[name="version"]');

const btnGameRules = document.getElementById('game_rules');
const WiewRules = document.querySelector('.game-rules-wiew');
btnGameRules.onclick = function () { WiewRules.classList.add("open") }
WiewRules.onclick = function () { WiewRules.classList.remove('open') }

setGameVersion('v1');
ver.forEach(item => {
    item.onchange = function () {
        setGameVersion(item.value);
    }
})

function setGameVersion(version) {
    setGameRulesVersion(version);
    run(version);
}
function setGameRulesVersion(version) {
    if (version === 'v1') {
        document.querySelector('.modal_body').innerHTML = `<img src="./../src/images/image-rules.svg" alt="rules">`
    } else {
        document.querySelector('.modal_body').innerHTML = `<img src="./../src/images/image-rules-bonus.svg" alt="rules">`
    }
}
function run(version) {
    let v = version === 'v1' ? 0 : 1;
    if (v) {
        boards[0].classList.add("hide");
        boards[1].classList.remove("hide");
        boardCheck.classList.add("hide");
    } else {
        boards[0].classList.remove("hide");
        boards[1].classList.add("hide");
        boardCheck.classList.add("hide");
    }
    items[v].forEach(element => {
        element.onclick = function () {
            let playerPicked = element.getAttribute('value');
            boards[v].classList.add("hide");
            boardCheck.classList.remove("hide");
            showItem(playerPicked, 'player');
            let cumputePicked = computePicked(v);
            checkWiner(playerPicked, cumputePicked);
        }
    });

    document.querySelector('.btn_play_again').onclick = function () {
        boards[v].classList.remove("hide");
        boardCheck.classList.add("hide");
        player.classList = 'player_picked_item';
        computer.classList = 'compute_picked_item';
        document.querySelector('.btn_status').classList.add('hide');
    }
};


function showItem(item, type) {
    if (type === 'player') {
        player.classList.add('slide-left')
        player.innerHTML = `<div class="box ${item}"> <img src="./../src/images/icon-${item}.svg" alt="fail load ${item}.svg file"></div>`;
        setTimeout(function () {
            player.classList.remove('slide-left')
        }, 500)
    } else {
        computer.classList.add('slide-right')
        computer.innerHTML = `<div class="box ${item}"> <img src="./../src/images/icon-${item}.svg" alt="fail load ${item}.svg file"></div>`;
        setTimeout(function () {
            computer.classList.remove('slide-right')
        }, 500)

    }
}

function computePicked(v) {
    let num = v == 1 ? 5 : 3;
    let randomItem = Math.floor(Math.random() * num);
    showItem(itemNames[randomItem]);
    return itemNames[randomItem];
}
const checks = {

    'scissors': ['paper', 'lizard'],
    'paper': ['rock', 'spock'],
    'rock': ['lizard', 'scissors'],
    'lizard': ['spock', 'paper'],
    'spock': ['scissors', 'rock'],
}

function checkWiner(play, compute) {
    let str = '';
    if (play === compute) {
        str = 'Draw';
        setTimeout(function () {
            player.classList.add('rotate');
            computer.classList.add('rotate');
            document.querySelector('.btn_status').classList.remove('hide');
        }, 500)
    } else if (checks[play].includes(compute)) {
        str = 'You Win';
        document.querySelector('#player #score').innerText = ++score;
        setTimeout(function () {
            player.children.item(0).classList.add('animate');
            document.querySelector('.btn_status').classList.remove('hide');
        }, 500)

    } else {
        str = "You Lose"
        document.querySelector('#compute  #score').innerText = ++computeScore;
        setTimeout(function () {
            computer.children.item(0).classList.add('animate');
            document.querySelector('.btn_status').classList.remove('hide');
        }, 500)
    }

    status.innerHTML = str.includes('Win') ? `<span class ='wincl'>${str}</span>` : str.includes('Lose') ? `<span  class ='losecl'>${str}</span>` : `<span  class ='drawcl'>${str}</span>`;

}
