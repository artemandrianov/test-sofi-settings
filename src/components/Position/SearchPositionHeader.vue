<script setup lang="ts">
import BackSvg from '@/assets/svg/back.svg?raw'

import ActionButton from '../ActionButton.vue';
</script>

<template>
  <header class="position-header">
    <div class="header-left">
      <ActionButton 
        variant="icon"
        :icon="BackSvg"
        action-type="link"
        @click="$emit('back')"
      />
      <h1 class="position-title">
        Настройка поиска
      </h1>
    </div>
    <div class="header-right">
      <a
        href="#"
        class="help-link"
      >
        <span>Как найти больше вакансий?</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.33331 10.6666L10.6666 5.33325M10.6666 5.33325V10.3333M10.6666 5.33325H5.66665"
            stroke="var(--primary-color)"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </div>
  </header>
</template>

<style scoped>
.position-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}
.back-button:hover {
  background-color: var(--color-white);
}
.back-button svg path {
  stroke: var(--text-color);
}

.position-title {
  font-size: 32px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
  line-height: 100%;
}

.help-link {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  position: relative;
}
.help-link span {
  position: relative;
  transition: color 0.2s ease;
}

.help-link span::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--primary-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.help-link:hover span::after {
  transform: scaleX(1);
}

.help-link:hover svg {
  transform: translate(2px, -2px);
}
.help-link svg {
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .position-header {
    margin-bottom: 24px;
  }
  .header-left {
    flex-wrap: wrap;
    gap: 8px;
  }
  .position-title {
    font-size: 20px;
  }
  .help-link {
    width: 100%;
    order: 1;
  }
  .back-button {
    order: -1;
  }
}
</style>
