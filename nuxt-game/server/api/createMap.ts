// server/api/game.js
import { readBody } from 'h3';
import { gameState } from '~/server/gameState';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { vertical = 5, horizontal = 5, freeMode = false} = body || {};

    gameState.grid = Array.from({ length: vertical }, () =>
        Array.from({ length: horizontal }, () => freeMode ? 0 : Math.random() < 0.5 ? 0 : -1)
    )

    await fetch('http://192.168.1.181:3001/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameState.grid)
    })

    return gameState.grid

});
