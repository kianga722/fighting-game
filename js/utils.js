function rectangularCollision({
    rectangle1,
    rectangle2
}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function determineWinner({ player1, player2, timerId }) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player1.health === player2.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (player1.health > player2.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    } else if (player1.health < player2.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
    }
}

function decreaseTimer() {
    if (gameOver) {
        return
    }

    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000) 
        timer -= 1
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
        determineWinner({ player1, player2, timerId })
        gameOver = true
        document.querySelector('#restartModal').style.display = "block"
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255, 255,255, 0.15)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player1.update()
    player2.update()

    player1.velocity.x = 0;
    player2.velocity.x = 0;

    // player 1 movement
    if (keys.a.pressed && player1.lastKey === 'a') {
        player1.velocity.x = -5
        player1.switchSprite('run')
    } else if (keys.d.pressed && player1.lastKey === 'd') {
        player1.velocity.x = 5
        player1.switchSprite('run')
    } else {
        player1.switchSprite('idle')
    }

    // jumping
    if (player1.velocity.y < 0) {
        player1.switchSprite('jump')
    } else if (player1.velocity.y > 0) {
        player1.switchSprite('fall')
    }

    // player 2 movement
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
        player2.velocity.x = -5
        player2.switchSprite('run')
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 5
        player2.switchSprite('run')
    } else {
        player2.switchSprite('idle')
    }

    // jumping
    if (player2.velocity.y < 0) {
        player2.switchSprite('jump')
    } else if (player2.velocity.y > 0) {
        player2.switchSprite('fall')
    }


    // detect for collision & player 2 gets hit
    if (
        rectangularCollision({
            rectangle1: player1,
            rectangle2: player2
        })
        && player1.isAttacking && player1.framesCurrent === 4
    ) {
        player2.takeHit()
        player1.isAttacking = false;
        // document.querySelector('#player2Health').style.width = player2.health + '%';
        gsap.to('#player2Health', {
            width: player2.health + '%'
        })
    }

    // if player 1 misses
    if (player2.isAttacking && player2.framesCurrent === 4) {
        player2.isAttacking = false;
    }
    
    // player 1 gets hit
    if (
        rectangularCollision({
            rectangle1: player2,
            rectangle2: player1
        })
        && player2.isAttacking && player2.framesCurrent === 2
    ) {
        player1.takeHit()
        player2.isAttacking = false;
        // document.querySelector('#player1Health').style.width = player1.health + '%';
        gsap.to('#player1Health', {
            width: player1.health + '%'
        })
    }

    // if player 2 misses
    if (player2.isAttacking && player2.framesCurrent === 2) {
        player2.isAttacking = false;
    }

    if (gameOver) {
        return
    }
    // end game based on health
    if (player2.health <= 0 || player1.health <= 0) {
        determineWinner({ player1, player2, timerId })
        gameOver = true
        document.querySelector('#restartModal').style.display = "block"
    }
}

function restartGame() {
    player1.dead = false
    player1.isAttacking = false
    player1.position = {
        x: 300,
        y: 0
    } 
    player1.velocity = {
        x: 0,
        y: 0
    }
    player1.image = player1.sprites.idle.image
    player1.health = 100
    document.querySelector('#player1Health').style.width = '100%'

    player2.dead = false
    player2.isAttacking = false
    player2.position = {
        x: 700,
        y: 100
    } 
    player2.velocity = {
        x: 0,
        y: 0
    }
    player2.image = player2.sprites.idle.image
    player2.health = 100
    document.querySelector('#player2Health').style.width = '100%'

    document.querySelector('#displayText').style.display = 'none'
    timer = 60
    document.querySelector('#timer').innerHTML = timer
    document.querySelector('#restartModal').style.display = "none"
    gameOver = false
    decreaseTimer()
}