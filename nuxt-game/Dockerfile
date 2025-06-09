# Используем базовый образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY nuxt-game/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY nuxt-game .

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "run", "dev"]
