// server/api/game.js
import { readBody } from 'h3';
import { gameState } from '~/server/gameState';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { action, ground, player } = body || {};

    if (!action) {
        return gameState;
    }

    if (action === 'makeMove') {


        for (let i = 0; i < ground.length; i++) {
            for (let j = 0; j < ground.length; j++) {
                if(ground[i][j] === 3)
                    ground[i][j] = 1
                if(ground[i][j] === 4)
                    ground[i][j] = 2
            }
        }


        for (let i = 0; i < gameState.grid.length; i++) {
            for (let j = 0; j < gameState.grid.length; j++) {
                if(gameState.grid[i][j] === 3)
                    gameState.grid[i][j] = 1
                if(gameState.grid[i][j] === 4)
                    gameState.grid[i][j] = 2
            }
        }


        console.log('ground')
        console.log(ground)
        // Заменяем каждый элемент target на соответствующий из source
        for (let i = 0; i < ground.length; i++) {
            for (let j = 0; j < ground[i].length; j++) {
                if(gameState.grid[i][j] !== ground[i][j])
                    gameState.grid[i][j] = ground[i][j] + 2
            }
        }




        // gameState.grid[row][col] = player;
    }

    // Отправим обновлённую карту WebSocket-серверу
    await fetch(`https://wsserver-u583.onrender.com/broadcast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameState.grid)
    })

    return gameState;
});
