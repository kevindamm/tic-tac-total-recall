<!--
Copyright (c) 2025 Kevin Damm
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
-->

<template>
  <div class="board-grid">
    <template v-for="row of 3">
      <board-position v-for="col of 3"
        :row :col
        :key="`cell_${row}_${col}`"
        :card="board.at(row, col)"
        @select="handleSelect"
        />
    </template>
  </div>
</template>



<script lang="ts" setup>
import BoardPosition from './tttr-cell.vue'
import { CardBoard3x3 } from './cardboard'
import { type Deck } from './cards-xo'

const { board } = defineProps<{
  board: CardBoard3x3
}>()

const emit = defineEmits<{
  deal: [i: number, j: number, deck: Deck]
  filled: []
}>()

function handleSelect() {
  // TODO
}
</script>



<style>
:root {
  --cell-width: clamp(80px, 25svmin, 160px);
}
.board-grid {
  display: grid;
  grid-template-columns: repeat(3, var(--cell-width));
  grid-template-rows: repeat(3, var(--cell-width));
  gap: 1svmin;
}
</style>
