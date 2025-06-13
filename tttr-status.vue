<template>
  <div>{{ message }}</div>
    <!-- TODO: -->
  <ul>
    <li>History</li>
    <li><button @click="$emit('resign')">
      Cash Out
    </button></li>
  </ul>
</template>

<script lang="ts" setup>
import { CardBoard3x3 } from './cardboard';
import { Deck } from './cards-xo';
import { GameOutcome } from './game-outcome';

defineProps<{
  message: string
  history: GameOutcome[]
  board: CardBoard3x3
  deck: Deck
}>()

defineEmits<{
  resign: []
}>()
</script>
