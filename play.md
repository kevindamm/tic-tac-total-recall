---
author: Kevin Damm
---

<div class="fluid-container">
  <game-board />
  <deck-pile
    :deck=deck
    />
</div>

<script lang="ts" setup>
import GameBoard from './tttr-board.vue'
import DeckPile from './deck-pile.vue'

import { useStorage } from '@vueuse/core'
import { useCardBoard } from './cardboard.ts'
import { useDeck } from './cards-xo'

const history = useStorage('history', {
  outcomes: []
})

const board = useCardBoard()
const deck = useDeck(9)

</script>

<style module>
.wrapper {
  display: flex;
  justify-content: center;
}
</style>
