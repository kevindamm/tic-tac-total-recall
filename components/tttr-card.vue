<template>
  <div>
    <img
      v-if="card.type==='FaceDown'"
      src="/img/card-back.png"
    >
    <img
      v-if="card.type==='FaceUp'"
      :src="`/img/card-${card.card}.png`"
    >
    <div
      v-else
      class="card-empty"
    ></div>
  </div>
</template>


<script lang="ts" setup>
import { CardXO } from '../composables/deck-xo';
import { Empty, CardSurface } from '../composables/deck';

const { card = Empty } = defineProps<{
  card: CardSurface<CardXO>
}>()
</script>


<style>
.card-empty {
  border: 1px dotted var(--subtle-blue);
}
</style>
