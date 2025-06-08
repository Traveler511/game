// server/api/move.post.ts
export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event); // Получаем данные из тела запроса
        const { move, player } = body;  // Достаем данные о ходе и игроке

        if (!move || !player) {
            throw new Error('Missing required parameters');
        }

        let board = await getBoard(); // Получаем текущую доску

        if (!isValidMove(board, move)) { // Проверяем, является ли ход допустимым
            throw new Error('Invalid move');
        }

        // Применяем ход
        board = applyMove(board, move, player);

        return { success: true, board }; // Возвращаем обновленную доску
    } catch (error) {
        console.error(error);  // Логируем ошибку на сервере
        return { success: false, error: error.message }; // Отправляем ошибку в ответе
    }
});

