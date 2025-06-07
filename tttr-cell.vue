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
  <div
    draggable="true"
    :class="style()">
  oh hi!  
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'
import { Empty, CardSurface, Deck } from './cards-xo' 

const { row, col, card = Empty } = defineProps<{
  row: number
  col: number
  card: CardSurface
}>()

function style() {
  const classes = {
    "grid-cell": true
  }
  classes[`cell_${row}_${col}`] = true
  return classes
}

const emit = defineEmits<{
  (e: 'select', i: number, j: number): void
  (e: 'deal', i: number, j: number, deck: Deck): void
}>()
</script>
