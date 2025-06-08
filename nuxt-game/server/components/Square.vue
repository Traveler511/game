<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {watchOnce} from "@vueuse/core";

const props = defineProps<{
  squareValue: number
  x: number
  y: number
  player: number
  size: number
}>()


const emit = defineEmits(['select'])
const hasValue = ref(false)

const currentPlayer = ref("")

const sizeStyle = computed(() => ({
  width:  (2000 / props.size + 20 ) + 'px',
  height: (2000 / props.size + 20 ) + 'px',
  borderRadius: 1 / Math.sqrt(props.size) * 20 + 'px'
}))


//217,251,196
//94,157,94

</script>

<template>

<div @click="$emit('select', x,y)" :style="sizeStyle" :class="{'square':true,'square--empty': squareValue === 0,'square--selected--first-player': squareValue === 1,
 'square--selected--second-player': squareValue === 2}">
<!--  {{x}}-->
<!--  {{y}}-->
<!--  {{squareValue}}-->
<!--  {{isSelected}}-->
</div>

</template>

<style scoped lang="scss">
.square {
  background: rgb(55,107,66);
  box-sizing: border-box;
  cursor: pointer;

  &--empty {
    background: rgb(80,139,90);
  }
  &--selected {

    &--first-player {
      background: rgb(239, 210, 85);
    }

    &--second-player {
      background: rgb(217, 251, 196);
    }
  }
}
</style>
