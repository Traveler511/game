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
    await fetch('http://192.168.1.181:3001/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameState.grid)
    })

    return gameState;
});
