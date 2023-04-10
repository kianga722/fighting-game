// IDEAS:
// CHARACTER SELECTION
// CHANGE CHARACTER SPRITES
// CHANGE BACKGROUND
// LIMIT JUMPS




// Create Background and Fighters
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
})


const player1 = new Fighter({
    position: {
        x: 300,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: './img/wizard/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 284,
        y: 267
    },
    sprites: {
        idle: {
            imageSrc: './img/wizard/Idle.png',
            framesMax: 8,
        },
        run: {
            imageSrc: './img/wizard/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/wizard/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/wizard/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './img/wizard/Attack1.png',
            framesMax: 8,
        },
        takeHit: {
            imageSrc: './img/wizard/Take hit.png',
            framesMax: 3,
        },
        death: {
            imageSrc: './img/wizard/Death.png',
            framesMax: 7,
        },
    },
    attackBox: {
        offset: {
            x: 100,
            y: -60
        },
        width: 160,
        height: 150
    }
})

const player2 = new Fighter({
    position: {
        x: 700,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 167
    },
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4,
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4,
        },
        takeHit: {
            imageSrc: './img/kenji/Take hit.png',
            framesMax: 3,
        },
        death: {
            imageSrc: './img/kenji/Death.png',
            framesMax: 7,
        },
    },
    attackBox: {
        offset: {
            x: -170,
            y: 20
        },
        width: 170,
        height: 110
    }
})



// Initialize state
let gameOver = false
let timer = 60
let timerId 
const gravity = 0.7
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

// Event Listeners
window.addEventListener('keydown', (event) => {
    if (gameOver) {
        if (event.key === 'r') {
            restartGame()
        }
    }

    if (!player1.dead) {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true;
                player1.lastKey = 'd'
                break
            case 'a':
                keys.a.pressed = true;
                player1.lastKey = 'a'
                break
            case 'w':
                player1.velocity.y = -20
                break
            case ' ' :
                player1.attack()
                break     
        }
    }

    if (!player2.dead) {
        switch(event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                player2.lastKey = 'ArrowRight'
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                player2.lastKey = 'ArrowLeft'
                break
            case 'ArrowUp':
                player2.velocity.y = -20
                break
            case 'ArrowDown' :
                player2.attack()
                break  
        }
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
    }

    // enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break
    }
})

// Create Canvas
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height)

// Begin game
decreaseTimer()
animate()