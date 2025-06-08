// server/api/game.js
import { readBody } from 'h3';
import { gameState } from '~/server/gameState';

export default defineEventHandler(async (event) => {
    return gameState.grid;
});
