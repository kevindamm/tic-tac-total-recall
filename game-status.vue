<template>
  <div>{{ statusMsg }}</div>
    <!-- TODO: -->
  <ul>
    <li>History</li>
    <li>Cash Out</li>
  </ul>
</template>

<script lang="ts" setup>
import { CardBoard3x3 } from './cardboard';
import { Deck } from './cards-xo';

defineProps<{
  statusMsg: string
  history: string[]
  board: CardBoard3x3
  deck: Deck
}>()

defineEmits<{
  resign: []
}>()
</script>
