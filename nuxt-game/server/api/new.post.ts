// server/api/new.post.ts
export default defineEventHandler(async () => {
    const newGameBoard = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
    ];

    // Логика создания игры: возможно, хранение состояния в базе данных

    return { success: true, board: newGameBoard };
});
