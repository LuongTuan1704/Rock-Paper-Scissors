
const boardV1 = document.querySelector('.game_body--board-v1 .options');
const items =Array.from(boardV1.children) 
const player = document.querySelector('.player_picked_item');
const computer = document.querySelector('.compute_picked_item');
const itemNames = ['paper', 'rock', 'scissors'];
let score = 0,computeScore = 0;
const board = document.querySelector('.game_body--board-v1');
const boardCheck = document.querySelector('.game_chossed');
items.forEach(element => {
    element.onclick= function(){      
        board.classList.add("hide");
        boardCheck.classList.remove("hide");
        let playerPicked = element.getAttribute('value');
            showItem(playerPicked, 'player');
           let cumputePicked = computePicked();
           checkWiner(playerPicked, cumputePicked)
        
    }
});

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
        setTimeout(function(){
            computer.classList.remove('slide-right')
        },500)
        
    }
}


function computePicked() {
    let randomItem = Math.floor(Math.random() * itemNames.length);
    showItem(itemNames[randomItem]);
    return itemNames[randomItem];
}
const checks = {
    'paper': 'rock',
    'rock': 'scissors',
    'scissors': 'paper'
}
const status = document.querySelector('.status');
function checkWiner(play, compute) {
    let str = '';
    if (play === compute) {
        str = 'Draw';
        setTimeout(function () {
            player.classList.add('rotate')
            computer.classList.add('rotate');
            document.querySelector('.btn_status').classList.remove('hide');
        }, 500)
    } else if (checks[play] === compute) {
        str = 'You Win';
        document.querySelector('#player #score').innerText = ++score;
        setTimeout(function(){player.children.item(0).classList.add('animate');
        document.querySelector('.btn_status').classList.remove('hide');
    },500)
        
    } else {
        str = "You Lose"
        document.querySelector('#compute  #score').innerText = ++computeScore; 
        setTimeout(function () { computer.children.item(0).classList.add('animate');
        document.querySelector('.btn_status').classList.remove('hide');
     }, 500)
    }
   
    status.innerHTML = str.includes('Win') ? `<span class ='wincl'>${str}</span>` : str.includes('Lose') ? `<span  class ='losecl'>${str}</span>` : `<span  class ='drawcl'>${str}</span>`;

}

 document.querySelector('.btn_play_again').onclick = function () {
     board.classList.remove("hide")
     boardCheck.classList.add("hide")
     player.classList = 'player_picked_item';
     computer.classList ='compute_picked_item';
     document.querySelector('.btn_status').classList.add('hide')
}


const btnGameRules = document.getElementById('game_rules');
const WiewRules = document.querySelector('.game-rules-wiew');
btnGameRules.onclick = function () {
    document.querySelector('.game-rules-wiew').classList.add("open")
}
WiewRules.onclick = function () {
    WiewRules.classList.remove('open')
}