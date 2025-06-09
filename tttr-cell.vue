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
    :class="['grid-cell', `cell_${row}_${col}`]"
    >
    {{ row }}, {{ col }}
    <p>{{ card.card }}</p>
  </div>
</template>



<script lang="ts" setup>
import { Empty, CardSurface, Deck } from './cards-xo' 

const { row, col, card = Empty } = defineProps<{
  row: number
  col: number
  card?: CardSurface
}>()

const emit = defineEmits<{
  select: [i: number, j: number]
  deal: [i: number, j: number, deck: Deck]
  filled: []
  reveal: [selected: number[]]
}>()




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

