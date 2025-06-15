<template>
  <div>{{ message }}</div>
    <!-- TODO: -->
  <ul>
    <li><button @click="showHistory">
      Show History
    </button></li>
    <li><button @click="$emit('complete')">
      Cash Out
    </button></li>
  </ul>
</template>

<script lang="ts" setup>
import { CardBoard3x3 } from '../composables/cardboard';
import { Deck } from '../composables/deck-xo';
import { GameOutcome } from '../composables/game-rules';

defineProps<{
  message: string
  history: GameOutcome[]
  board: CardBoard3x3
  deck: Deck
}>()

defineEmits<{
  reset: []
  complete: []
}>()

function showHistory(): void {
  alert('TBD visualization of match history')
  // TODO popout?  dynamic components for board/replay?  

  // each game can be summarized by its 3x3 board and a highlighting of the
  // lines which cause the win or loss.
  // A dedicated component and an overflowing div for showing them all together
  // A summary of the Win/Loss total counts and flair for winning records
  // Longest streak?  Count "streaks"?  Or win/loss runs in terms of wagers

}
</script>
