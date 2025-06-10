<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import Square from "./Square.vue";
import axios from "axios";
import MyButton from "./MyButton.vue";

const ground = ref([])
const currentGround = ref([])

const currentPlayer = ref(1)
const firstSquare = ref([0,0])
const lastSquare = ref([0,0])
const hasPick = ref(false)

const currentCountSquareVertical = ref(5)
const currentCountSquareHorizontal = ref(5)

const countSquareVertical = ref(5)
const countSquareHorizontal = ref(5)

const freeMode = ref(false)
const currentMove = ref(1)

console.log([] == ![])


console.log(null == false)

async function makeMove() {
  const response = await fetch('/api/game', {
    method: 'POST',  // Используем метод POST
    headers: {
      'Content-Type': 'application/json',  // Указываем, что данные будут в формате JSON
    },
    body: JSON.stringify({
      action: 'makeMove',  // Указываем действие
      ground: currentGround.value,
      player: currentPlayer.value,              // Игрок, который делает ход
    }),
  });

  // Обработка ответа от сервера (например, обновление состояния)
  const data = await response
  console.log(data);  // Выводим текущее состояние игры
}
async function selectSquare(x: number, y: number) {

  currentGround.value[x][y] = currentPlayer.value;

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
  currentGround.value = data
  console.log(data);  // Выводим текущее состояние игры

}

async function getMap() {
  const response = await fetch('/api/getMap', {
    method: 'GET',  // Используем метод POST
  });

  // Обработка ответа от сервера (например, обновление состояния)
  const data = await response.json()
  ground.value = data
  currentGround.value = data
  console.log(data)
}


function changePlayer() {
 currentPlayer.value = currentPlayer.value == 2 ? 1 : 2
}
const message = ref('')
const socket = ref(null)

const currentMoveBackground = computed( () => {

  return currentMove.value === 1 ? 'background: #989dff;' : 'background: crimson;'

})
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
      currentGround.value = answer.state

      currentMove.value = currentMove.value === 1 ? 2 : 1
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

    <div class="home-page__settings">
      <div class="home-page__settings__block home-page__settings__block--with-bg">
        <div class="home-page__settings__block__content--flex">
          <span class="home-page__settings__block__content__label"><b>Вы: {{currentPlayer == 1 ? 'Игрок 1 ' : 'Игрок 2 '}}</b></span> <div :class="{'color-player':true,'color-player--1': currentPlayer == 1, 'color-player--2': currentPlayer == 2}"></div>
        </div>
      </div>

      <div class="home-page__settings__block home-page__settings__block--with-bg">
        <div class="home-page__settings__block__content">
          <div class="home-page__settings__block__content__header">
            <span>Настройки игрового поля</span>
          </div>


          <p class="home-page__settings__block__content__label">клеток по горизонтали  <b>{{countSquareHorizontal}}</b></p>
          <input class="home-page__settings__block__content__input--range" v-model="countSquareHorizontal" type="range" min="3" max="20">
          <p class="home-page__settings__block__content__label">клеток по вертикали <b> {{countSquareVertical}}</b></p>
          <input class="home-page__settings__block__content__input--range" v-model="countSquareVertical" type="range" min="3" max="20">

          <div>
            <span>Сделать доступными все клетки</span>
            <input v-model="freeMode" type="checkbox">
          </div>
        </div>


      </div>

      <div class="home-page__settings__block">
        <my-button @click="mapCreate()" text="создать карту заново"></my-button>
      </div>

      <div class="home-page__settings__block">
        <my-button @click="changePlayer()" text="поменять цвет"></my-button>
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

    <div class="home-page__panel">
      <div :style="currentMoveBackground" class="home-page__panel__block home-page__panel__current-move">
        <p> {{currentMove === 1 ? 'ваш ход' : 'ход соперника'}}</p>
      </div>

      <div class="home-page__panel__block">
        <my-button :disabled="currentMove === 2" @click="makeMove()" text="завершить ход"></my-button>
      </div>


      <div class="home-page__panel__block">
        <my-button :disabled="true" @click="mapCreate()" text="отменить ход"></my-button>
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

    margin-right: 1.5vh;

    &__block {
      border-radius: 10px;
      margin-top: 1.5vh;

      &:first-of-type {
        margin-top: 0;
      }

      &--with-bg {
        background: rgb(55,107,66);
      }

      &__content {
        padding: 15px;

        &__header {
          text-align: center;
          font-weight: 600;
          font-size: 1.2em;
        }

        &__input--range {
          width: 100%;
        }

        &__label {
          margin: 1vh;
        }

        &--flex {
          display: flex;
          align-items: center;
        }
      }

    }
  }

  &__panel {
    margin-left: 1.5vh;
    display: flex;
    //justify-content: center;
    //align-items: top;
    flex-direction: column;

    &__block {
      border-radius: 10px;
      margin-top: 1.5vh;

      &:first-of-type {
        margin-top: 0;
      }
    }

    &__current-move {
      text-align: center;

      p {
        margin: 1vh;
        font-size: 1.2em;
        font-weight: 600;
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

.color-player {
  border-radius: 5px;
  width: 20px;
  height: 20px;

  &--1 {
    background: rgb(239, 210, 85);
  }

  &--2 {
    background: rgb(217, 251, 196);
  }
}
</style>
