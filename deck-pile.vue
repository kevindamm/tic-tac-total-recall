<template>
  <div>
    <img v-if="!deck.exhausted()"
      class="deck-pile"
      src="/img/card-back.png"
      >
  </div>
</template>

<script lang="ts" setup>
import { Deck } from './cards-xo'

const { deck } = defineProps<{
  deck: Deck
}>()

</script>

<style>
.deck-pile {
  width: 3.5em;
  height: 5em;
}
</style>
