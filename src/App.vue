<template>
  <NavigationMenu />
  <router-view />
</template>

<script setup lang="ts">
import NavigationMenu from './components/NavigationMenu/NavigationMenu.vue'
import HomePage from '@/views/HomePage.vue'
</script>
