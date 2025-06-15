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
  <div draggable="true">
    <img v-if="!deck.exhausted()"
      class="deck-pile"
      src="/img/card-back.png"
      @click="$emit('draw', deck)"
      @dragstart="isDragging = true;"
      @dragend="isDragging = false;"
    />
    <img v-else
      class="deck-empty"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Deck } from '../composables/deck-xo'

const isDragging = ref(false)

const { deck } = defineProps<{
  deck: Deck
}>()

const emit = defineEmits<{
  draw: [deck: Deck]
}>()
</script>

<style>
.deck-pile {
  /* padding: 3em 0 0 3em; */
  width: 5em;
  height: 7em;
}

.deck-empty {
  border: darkgrey dashed 2px;
  border-radius: 3em;
}
</style>
