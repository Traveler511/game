// pages/index.vue
<template>
  <div>
    <HomePage></HomePage>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HomePage from "~/server/components/HomePage.vue";

const board = ref([
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
]);

// Функция для создания новой игры
const startNewGame = async () => {
  const response = await fetch('/api/new', {
    method: 'POST',
  });
  const data = await response.json();
  board.value = data.board;
};

// Функция для совершения хода
const makeMove = async (row, col) => {
  const response = await fetch('/api/move', {
    method: 'POST',
    body: JSON.stringify({
      move: { row, col },
      player: 'X', // В будущем можно сделать динамическим
    }),
  });
  const data = await response.json();
  board.value = data.board;
};
</script>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
}
.cell {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
