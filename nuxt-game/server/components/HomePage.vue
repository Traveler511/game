<script setup lang="ts">
import {onMounted, ref} from 'vue'
import Square from "./Square.vue";
import axios from "axios";

const ground = ref([])

const currentPlayer = ref(1)
const firstSquare = ref([0,0])
const lastSquare = ref([0,0])
const hasPick = ref(false)

const currentCountSquareVertical = ref(5)
const currentCountSquareHorizontal = ref(5)

const countSquareVertical = ref(5)
const countSquareHorizontal = ref(5)

const freeMode = ref(false)

console.log([] == ![])

console.log(null == false)

async function selectSquare(x: number, y: number) {


  const response = await fetch('/api/game', {
    method: 'POST',  // Используем метод POST
    headers: {
      'Content-Type': 'application/json',  // Указываем, что данные будут в формате JSON
    },
    body: JSON.stringify({
      action: 'makeMove',  // Указываем действие
      row: x,                 // Координаты строки
      col: y,                 // Координаты колонки
      player: currentPlayer.value,              // Игрок, который делает ход
    }),
  });

  // Обработка ответа от сервера (например, обновление состояния)
  const data = await response
  console.log(data);  // Выводим текущее состояние игры


  // await getMap()

  // if(!hasPick.value) {
  //
  //   firstSquare.value = [x,y]
  //   hasPick.value = true
  //   return
  // }
  // else {
  //   lastSquare.value = [x,y]
  //
  //
  //   if (firstSquare.value[0] === lastSquare.value[0]) {
  //     // Вертикальная линия (одинаковый x → столбец)
  //     const [yStart, yEnd] = [firstSquare.value[1], lastSquare.value[1]].sort((a, b) => a - b)
  //     for (let y = yStart; y <= yEnd; y++) {
  //       if (ground.value[firstSquare.value[0]][y] === 0) {
  //         ground.value[firstSquare.value[0]][y] = currentPlayer.value
  //       }
  //     }
  //   } else if (firstSquare.value[1] === lastSquare.value[1]) {
  //     // Горизонтальная линия (одинаковый y → строка)
  //     const [xStart, xEnd] = [firstSquare.value[0], lastSquare.value[0]].sort((a, b) => a - b)
  //     for (let x = xStart; x <= xEnd; x++) {
  //       if (ground.value[x][firstSquare.value[1]] === 0) {
  //         ground.value[x][firstSquare.value[1]] = currentPlayer.value
  //       }
  //     }
  //   } else {
  //     alert('жульничаем?')
  //   }

    // currentPlayer.value = currentPlayer.value === 1 ? 2 : 1
    hasPick.value = false
  // }

  // player.value = player.value === 1 ? 2 : 1
  // console.log(x)
  // console.log(y)
  // ground.value[x][y] = !ground.value[x][y]
}

async function mapCreate() {

  // currentCountSquareHorizontal.value = countSquareHorizontal.value
  // currentCountSquareVertical.value = countSquareVertical.value
  //
  // ground.value = Array.from({ length: currentCountSquareVertical.value }, () =>
  //     Array.from({ length: currentCountSquareHorizontal.value }, () => freeMode.value ? 0 : Math.random() < 0.5 ? 0 : -1)
  // )

  const response = await fetch('/api/createMap', {
    method: 'POST',  // Используем метод POST
    headers: {
      'Content-Type': 'application/json',  // Указываем, что данные будут в формате JSON
    },
    body: JSON.stringify({
      vertical: countSquareVertical.value,
      horizontal: countSquareHorizontal.value,
      freeMode: freeMode.value
    }),
  });

  // Обработка ответа от сервера (например, обновление состояния)
  const data = await response.json()
  ground.value = data
  console.log(data);  // Выводим текущее состояние игры

}

async function getMap() {
  const response = await fetch('/api/getMap', {
    method: 'GET',  // Используем метод POST
  });

  // Обработка ответа от сервера (например, обновление состояния)
  const data = await response.json()
  ground.value = data
  console.log(data)
}


function changePlayer() {
 currentPlayer.value = currentPlayer.value == 2 ? 1 : 2
}
const message = ref('')
const socket = ref(null)

onMounted(() => {
  // getMap()

  // const response = fetch('/api/wsServer', {
  //   method: 'GET',  // Используем метод POST
  // });


  // const socket = new WebSocket('https://wsserver-u583.onrender.com/ws')
  // const socket = new WebSocket('ws://localhost:3001/ws')
  const socket = new WebSocket('https://wsserver-u583.onrender.com/ws')



  socket.onopen = () => {
    console.log('✅ Соединение установлено')
    socket.send('Привет, сервер!')
  }

  socket.onmessage = (event) => {
    const answer = JSON.parse(event.data)
    console.log(answer)
    if(answer.type === 'update') {
      console.log('type - update')
      ground.value = answer.state
    }

    if(answer.type === 'setPlayer') {
      console.log('type - update')
      currentPlayer.value = answer.player
    }
  }

  // socketTwo.onopen = () => {
  //   console.log('✅ Соединение установлено')
  //   socket.send('Привет, сервер!')
  // }
  //
  // socketTwo.onmessage = (event) => {
  //   const answer = JSON.parse(event.data)
  //   console.log(answer)
  //   if(answer.type === 'update') {
  //     console.log('type - update')
  //     ground.value = answer.state
  //   }
  //
  //   if(answer.type === 'setPlayer') {
  //     console.log('type - update')
  //     currentPlayer.value = answer.player
  //   }
  // }

  // mapCreate()
})

onBeforeMount( () => {
  getMap()
})


</script>

<template>

  <div class="home-page">


    <button @click="changePlayer()"> Поменять игрока</button>



    <div class="home-page__settings">
      <h1>настройки</h1>
      <div>
        <p>Клеток по горизонтали:</p>
        <input v-model="countSquareHorizontal" type="number">
        <p>Клеток по вертикали:</p>
        <input v-model="countSquareVertical" type="number">
        <br>
        <button @click="mapCreate">Создавать карту заново</button>

        <br>
        <span>Свободный режим</span>
        <input v-model="freeMode" type="checkbox">
      </div>
    </div>

<!--    <button class="home-page__button&#45;&#45;refresh">Заново</button>-->

    <div class="home-page__ground">
    <div class="home-page__ground__row" v-for="(row, indexRow) in ground">
      <div class="home-page__ground__column" v-for="(column, indexColumn) in row">
      <Square @select="selectSquare" :size="currentCountSquareVertical * currentCountSquareHorizontal" :player="Number(currentPlayer)" :squareValue="ground[indexRow][indexColumn]" :x="indexRow" :y="indexColumn"></Square>
      </div>
    </div>
    </div>
  </div>

</template>

<style scoped lang="scss">


.home-page {

  margin-top:20vh;
  width: 100%;
  display: flex;
  justify-content: center;

  &__settings {
    background: rgb(55,107,66);
    border-radius: 10px;
    padding: 10px;
    margin-right: 5%;
  }

  &__button {

    &--refresh {
      background: rgb(55,107,66);
      border-radius: 10px;
      padding: 5px 10px;
      cursor: pointer;
      font-size: 1.75em;
      font-weight: 600;
      margin-bottom: 10px;
      transition: 0.15s;

      &:hover {
        background: rgb(80,139,90);
      }
    }
  }
  &__ground {
    background: rgb(55,107,66);
    //height: 400px;
    //width: 400px;
    border-radius: 10px;
    padding: 10px;

    &__row {
      display: flex;
      justify-content: space-between;

      margin-bottom: 13px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    &__column {
      margin-right: 13px;

      &:last-of-type {
        margin-right: 0;
      }
    }

    // 80,139,90
  }
}
</style>
