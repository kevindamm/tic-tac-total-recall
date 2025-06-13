<template>
  <div></div>
</template>


<script lang="ts" setup>
import { CardSurface, Empty } from './cards-xo';

const { card = Empty } = defineProps<{
  card?: CardSurface
}>()
</script>

<style>
</style>
