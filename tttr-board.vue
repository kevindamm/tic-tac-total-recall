<template>
  <div class="board">
    <template v-for="row of 3">
      <board-position v-for="col of 3"
        :key="`cell_${row}_${col}`"
        :row="row" :col="col"
        :card="board.at(row, col)"
        @select="handleSelect"
        />
    </template>
  </div>
</template>

<script lang="ts" setup>
import BoardPosition from './tttr-cell.vue'
import { CardBoard3x3 } from './cardboard'

const { board } = defineProps<{
  board: CardBoard3x3
}>()

function handleSelect() {
  // TODO
}
</script>
