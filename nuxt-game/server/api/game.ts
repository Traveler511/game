// server/api/game.js
import { readBody } from 'h3';
import { gameState } from '~/server/gameState';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { action, row, col, player } = body || {};

    if (!action) {
        return gameState;
    }

    if (action === 'makeMove') {
        gameState.grid[row][col] = player;
    }

    // Отправим обновлённую карту WebSocket-серверу
    await fetch('http://game-1-m4qh.onrender.com/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameState.grid)
    })

    return gameState;
});
