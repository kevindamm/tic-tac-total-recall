---
title: Play Tic-Tac-TOTAL-RECALL
author: Kevin Damm
navbar: false
sidebar: false
aside: false
outline: false
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
    :message
    :history="game.history"
    :board="game.board"
    :deck="game.deck"
  />
  <template v-if="game.phase === 'dealing'">
    <game-board 
      :board="game.board"
      @deal-card="deal"
    />
    <div class="cards">
      <game-deck
        :deck="game.deck"
      />
      <game-hand 
        :card="game.hand"
      />
    </div>
  </template>
</main>



<script lang="ts" setup>
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { useGameRules } from './game-rules'

import GameBoard from './tttr-board.vue'
import GameCard from './tttr-card.vue'
import GameDeck from './tttr-deck.vue'
import GameHand from './tttr-hand.vue'
import GameStatus from './tttr-status.vue'

const simplified = ref(false)

const message = ref('')
const rules = useGameRules()
const game = rules.init()

onMounted(() => {
  game.phase = 'dealing'
})

function deal(row: number, col: number) {
  if (rules.legal(game, {type: 'deal', })) {
    // ...
  }
}
</script>


<style>
.container {
  justify-items: center;
}
</style>
