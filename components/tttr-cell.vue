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
    class="grid-cell"
    :class="[`cell_${row}_${col}`, `${highlit ? 'highlit' : ''}`]"
    @dragenter="highlit = !card.card"
    @dragleave="highlit = false"
    @dragend="highlit = false"
    @dragover.prevent=""
    @drop.prevent="dropCard"
    @click="$emit('select-cell', row, col)"
    >
    <game-card 
      :draggable
      :card
    />
  </div>
</template>


<script lang="ts" setup>
import { computed, ref } from 'vue'
import GameCard from './tttr-card.vue'
import { CardSurface, Empty } from '../composables/deck'
import { CardXO } from '../composables/deck-xo';

const { row, col, card = Empty } = defineProps<{
  row: number
  col: number
  card?: CardSurface<CardXO>
}>()

const highlit = ref(false)
const draggable = computed(() => !!card?.card )

const emit = defineEmits<{
  'select-cell': [i: number, j: number]
  'reveal': [selected: number[]]
}>()


function dropCard() {
  highlit.value = false
  emit('select-cell', row, col)
}


/*
DiscriminatedUnion from an actions metatype to IIMT?

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

type coord = {
  i: number
  j: number
}

// Inclusive collection of available actions.
// Could also construct this out of &-union of subtypes.
type GameplayActions = {
  filled: {}
  select: coord
  deal: coord & {
    deck: Deck
  }
  reveal: {
    selected: coord[]
  }
}

// This gives us a proper discriminated union from the above set-like mapping of
// actions, and this can be used in .
type ActionsUnion = {
  [K in keyof GameplayActions]: Prettify<
    {
      type: K
    } & GameplayActions[K]>
}[keyof GameplayActions]

// Then, defineEmits can take a different transform of GameplayActions
type EmittedActions = {
  [K in keyof GameplayActions]: //...? list of argument key-values
}
// if we can't get the full typing this way,
// just the list of keys of GameplayActions will provide that
// but won't provide typing to the language server.


Although this could help reduce re-typing across client/server and connected
protocol, it belongs in more general abstraction and not in this toy.
*/
</script>


<style>
.highlit {
  background-color: magenta;
  opacity: 0.5;
}
</style>
