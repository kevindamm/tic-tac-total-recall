---
layout: home

hero:
  name: "Tic-Tac-Total Recall"
  tagline: What if you didn't know?
---

# play the solitaire version

<t3-board>
</t3-board>

Rules:

Gameplay proceeds much as with regular Tic-Tac-Toe, except you don't know
whether the position is being marked with an `X` or an `O` until all the
cards are down and ready to be revealed.

Choose which position to deal to next, or allow them all to be dealt randomly.

<script lang="ts" setup>
import T3Board from './t3-board.vue'
</script>
