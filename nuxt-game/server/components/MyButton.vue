<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {watchOnce} from "@vueuse/core";

const props = withDefaults(defineProps<{
  text: string
  disabled: boolean
}>(), {
  text: '',
  disabled: false
})


const emit = defineEmits(['click'])

</script>

<template>

<div :class="{'my-button':true,'my-button--disabled': disabled}" @click="emit('click')">
  <p>{{text}}</p>
</div>

</template>

<style scoped lang="scss">
.my-button {
  background: $color-pine;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 10px;
  transition: 0.15s;
  width: 100%;

  &:hover {
    background: $color-sage;
  }

  &--disabled {
    pointer-events: none;
    background: darkgray;
  }
  
  p {
    padding: 0;
    margin: 0;
    font-weight: 600;
    font-size: 1.2em;
  }
}
</style>
