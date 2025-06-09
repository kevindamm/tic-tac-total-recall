---
title: Play Tic-Tac-TOTAL RECALL
author: Kevin Damm
---

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

<main class="container">
  <game-status
    :statusMsg
    :history
    :board
    :deck
  />
  <game-board 
    :board
  />
  <deck-pile
    :deck
    />
</main>



<script lang="ts" setup>
import GameBoard from './tttr-board.vue'
import DeckPile from './deck-pile.vue'
import GameStatus from './game-status.vue'

import { useStorage } from '@vueuse/core'
import { useCardBoard } from './cardboard.ts'
import { useDeck } from './cards-xo'

const history = useStorage('history', {
  outcomes: []
})

const statusMsg = ref('')
const board = useCardBoard()
const deck = useDeck(9)

// TODO game history, event handling, state updates
</script>



<style module>

</style>
