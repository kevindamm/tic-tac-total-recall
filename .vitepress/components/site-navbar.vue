<script lang="ts" setup>
import { useData } from 'vitepress';
import VPNavBarMenuLink from 'vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue';
import VPNavBarMenuGroup from 'vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue';
import { useNav } from 'vitepress/dist/client/theme-default/composables/nav.js';
import { onMounted, ref } from 'vue'

const { theme } = useData();

const versionList = ref([])
const { openScreen } = useNav()
onMounted(() => {
  openScreen()
})
</script>

<template>
    <nav v-if="theme.nav" aria-labelledby="main-nav-aria-label" class="VPNavBarMenu">
        <span id="main-nav-aria-label" class="visually-hidden">Main Navigation</span>
        <template v-for="item in theme.nav" :key="item.text">
            <VPNavBarMenuLink v-if="'link' in item" :item="item" />
            <VPNavBarMenuGroup v-else :item="item" />
        </template>
        
    </nav>
</template>

<style scoped>
.VPNavBarMenu {
    display: none;
}

.VPNavBarMenu svg {
    align-self: center;
    margin-right: -6px;
}

@media (min-width: 768px) {
    .VPNavBarMenu {
        display: flex;
    }
}
</style>