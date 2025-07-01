<template>
  <nav class="nav-menu">
    <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
      CSS Transitions
    </router-link>
    <router-link to="/keyframes" class="nav-link" :class="{ active: $route.path === '/keyframes' }">
      Keyframes/Animation
    </router-link>
  </nav>
</template>

<style scoped>
.nav-menu {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: #f5f5f5;
  border-radius: 999px;
  flex-wrap: wrap;
  max-width: fit-content;
  margin: 1rem auto;
  box-shadow: 0 0 0 1px #ccc inset;
}

.nav-link {
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  color: #444;
  background-color: white;
  transition: all 0.3s ease;
  box-shadow: 0 0 0 1px transparent;
}

.nav-link:hover {
  box-shadow: 0 0 0 1px #aaa;
}

.nav-link.active {
  background-color: #611818;
  color: white;
  box-shadow: 0 0 0 1px #611818;
}
</style>
