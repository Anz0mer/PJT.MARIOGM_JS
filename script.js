const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const scoreDisplay = document.querySelector('.score')

let score = 0;
let gameLoop; // Variável para armazenar o intervalo do loop do jogo

const start = document.querySelector('.start')
const gameOver = document.querySelector('.game-over')

audioStart = new Audio('./src/sound/audio_theme.mp3')
audioGameOver = new Audio('./src/sound/audio_gameover.mp3')

const startGame = () => {
  pipe.classList.add('pipe-animation')
  start.style.display = 'none'
  audioStart.play()
  loop()
}

const restartGame = () => {
  gameOver.style.display = 'none'
  pipe.style.left = ''
  pipe.style.right = '0'
  mario.src = './src/img/mario.gif'
  mario.style.width = '150px'
  mario.style.bottom = '0'
  start.style.display = 'none'
  audioGameOver.pause()
  audioGameOver.currentTime = 0;
  audioStart.play()
  audioStart.currentTime = 0;
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  loop()
}

const jump = () => {
  mario.classList.add('jump')
  setTimeout(() => {
    mario.classList.remove('jump')
  }, 800)
}

const loop = () => {
  gameLoop = setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = parseFloat(window.getComputedStyle(mario).bottom)

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      clearInterval(gameLoop);
      pipe.classList.remove('.pipe-animation')
      pipe.style.left = `${pipePosition}px`
      mario.classList.remove('.jump')
      mario.style.bottom = `${marioPosition}px`
      mario.src = './src/img/game-over.png'
      mario.style.width = '80px'
      mario.style.marginLeft = '50px'
      audioStart.pause()
      audioGameOver.play()
      setTimeout(() => {
        audioGameOver.pause()
        gameOver.style.display = 'flex'
      }, 7000)
    } else {
      if (pipePosition <= 0) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
      }
    }
  }, 10)
}

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === ' ') {
    jump()
  }
})

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump()
  }
})

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === 'Enter') {
    startGame()
  }
})

gameOver.addEventListener('click', restartGame)
