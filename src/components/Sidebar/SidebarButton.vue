<script setup lang="ts">
import { RouterLink, RouteLocationRaw } from 'vue-router'

defineProps<{
  icon: string
  label: string
  to: RouteLocationRaw
  collapsed?: boolean
}>()
</script>

<template>
  <RouterLink 
    :to="to"
    custom v-slot="{ href, navigate, isActive }" 
  >
    <a
      :href="href"
      @click="navigate"
      class="sidebar-btn"
      :class="{ 
        'active': isActive, // Класс 'active' для подсветки текущего роута
        'collapsed': collapsed // Класс 'collapsed' для скрытия текста
      }"
      role="link" 
    >
      <span
        class="sidebar-btn__icon"
        v-html="icon"
      />
      <span
        v-if="!collapsed"
        class="sidebar-btn__label"
      >
        {{ label }}
      </span>
    </a>
  </RouterLink>
</template>

<style scoped>
/*
  Все стили из .sidebar-btn теперь применяются к тегу <a>.
  Нужно добавить стили :hover и text-decoration: none.
*/
.sidebar-btn {
  /* Унаследованные стили: */
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 20px 40px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--secondary-color);
  border-radius: 10px;
  transition:
    background 0.2s ease,
    color 0.2s ease;
  position: relative;
  text-decoration: none; 
}

.sidebar-btn:hover {
  color: var(--primary-color); 
  background: var(--background-color);
}

.sidebar-btn.active {
  color: var(--primary-color);
  font-weight: 500;
}

.sidebar-btn.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 60px;
  background: var(--primary-color);
  border-radius: 0 6px 6px 0;
}

/* SVG */
.sidebar-btn__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-btn__icon svg {
  width: 20px;
  height: 20px;
  display: block;
  color: inherit;
  fill: currentColor;
  transition: color 0.2s ease;
}

.sidebar-btn__label {
  font-size: 18px;
  white-space: nowrap;
}

.sidebar-btn.collapsed {
  justify-content: center;
  padding: 10px 0;
}

.sidebar-btn.collapsed .sidebar-btn__label {
  display: none;
}
</style>