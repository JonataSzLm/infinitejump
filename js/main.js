const gameBoard = document.querySelector('.game-board');
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const msgGO = document.querySelector('.mensage-game-over');
const msgContinue = document.querySelector('.mensage-continue');
const score = document.querySelector('[data-score]');
const record  = document.querySelector('[data-record]');
let endGame = false;
let time = 0;
score.innerText = '00';


const clonePipe = (timeDelay) => {
    const pipeClone = pipe.cloneNode(true);
    gameBoard.appendChild(pipeClone);
    pipeClone.style.right = '-80px' 
    pipeClone.style.animation = `pipe-animation 1.5s ${timeDelay}s infinite linear`;
    return pipeClone;
}

const pipe2 = clonePipe(20.5); 

const jump = () => {
    if (endGame) {
        document.location.reload(true); 
    } else {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
}

const gameOver = (marioPosition, pipePosition, pipe2Position) => {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;
    pipe2.style.animation = 'none';
    pipe2.style.left = `${pipe2Position}px`;

    mario.style.bottom = `${marioPosition}px`;
    mario.src = './img/game-over.png';

    mario.classList.add('game-over');
    setTimeout(() => {
        saveRecord();  
        mario.classList.remove('game-over');
        pipe.style.display = 'none';
        pipe2.style.display = 'none';
        mario.style.display = 'none';
        msgGO.style.display = 'flex';
        msgContinue.style.display = 'flex';
        endGame = true;
    }, 1000);
}

const saveRecord = () => {
    if (+score.innerText > +record.innerText) {
        localStorage.setItem('record-time', +score.innerText); 
    }
}

const loadRecord = () => {
    const  rec = localStorage.getItem('record-time');

    if (rec) {
        record.innerText = rec; 
    } else {
        record.innerText = '00';
    }
}

const checkGameOver = (marioPosition, pipePosition) => {
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 120) {
        return true;
    }
    return false;
}

loadRecord();

const loop = setInterval(() => {

    time++;
    if (time === 100) {
        score.innerText = +score.innerText + 1;
        time = 0;
    }    
    const pipePosition = pipe.offsetLeft;
    const pipe2Position = pipe2.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    
    if (checkGameOver(marioPosition, pipePosition) || checkGameOver(marioPosition, pipe2Position)) {
        
        gameOver(marioPosition, pipePosition, pipe2Position);
        clearInterval(loop);
    
    }

}, 10);

document.addEventListener('keydown', jump);