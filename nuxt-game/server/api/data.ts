// server/api/submit.js

export default defineEventHandler(async (event) => {

    const body = await readBody(event);  // Читаем тело запроса

    // Пример обработки данных из запроса
    console.log('Полученные данные:', body);

    // Возвращаем успешный ответ
    return { success: true, message: 'Данные успешно приняты!' };
});

