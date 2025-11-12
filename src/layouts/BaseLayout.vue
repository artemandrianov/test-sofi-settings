<script setup lang="ts">
import Dashboard from '@/components/Dashboard/Dashboard.vue';
import SearchSettings from '@/components/Position/SearchPosition.vue'
import BaseSidebar from '@/components/Sidebar/BaseSidebar.vue'
import router from '@/router';
</script>

<template>
  <div class="layout">
    <BaseSidebar />
    <main class="layout__content">
      <router-view>
        <Dashboard />
        <SearchSettings /> 
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100svh;
  background: var(--background-color);
}
.layout__content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .layout {
    background: var(--color-white);
  }
  .layout__content {
    margin-left: 0; 
  }
}
</style>