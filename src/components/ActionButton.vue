<script setup lang="ts">
import { computed } from 'vue'
import { useSidebar } from '@/composables/useSidebar'

interface Props {
  variant: 'reaction' | 'stats' | 'icon'
  icon?: string
  label?: string
  value?: number
  max?: number
  description?: string
  actionType?: 'toggle-dropdown' | 'toggle-sidebar' | 'link' | 'default' 
  isDropdownOpen?: boolean 
}

const props = defineProps<Props>()

const { sidebarOpen, toggleSidebar } = useSidebar() 

const variantClass = computed(() => `action-button--${props.variant}`)

const iconActionClass = computed(() => {
  if (props.variant === 'icon') {
    const classes = {
      'action-button--icon-sidebar': props.actionType === 'toggle-sidebar',
      'action-button--icon-back': props.actionType === 'link',
      'action-button--icon-dropdown': props.actionType === 'toggle-dropdown',
      
      'is-open': props.actionType === 'toggle-dropdown' && props.isDropdownOpen,
    }
    return classes
  }
  return {}
})

const handleClick = () => {
  if (props.variant === 'icon') {
    if (props.actionType === 'toggle-sidebar') {
    }
  }
}
</script>

<template>
  <button
    class="action-button"
    :class="[variantClass, iconActionClass]"
    @click="handleClick"
  >
    <span
      v-if="icon"
      class="action-button__icon"
      v-html="icon"
    />

    <span
      v-if="variant === 'reaction' && sidebarOpen"
      class="action-button__label"
    >
      {{ label }}
    </span>

    <div
      v-if="variant === 'stats' && sidebarOpen"
      class="action-button__text"
    >
      <div class="action-button__primary">
        <span class="action-button__value">{{ value }}</span>
        <span
          v-if="max"
          class="action-button__max"
        >из {{ max }}</span>
      </div>
      <div class="action-button__secondary">
        {{ description }}
      </div>
    </div>
  </button>
</template>

<style scoped>
.action-button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: var(--background-color);
  color: var(--text-color);
  cursor: pointer;
  text-align: left;
  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease;
}

.action-button--reaction:hover,
.action-button--icon:hover {
  background-color: rgba(0, 102, 255, 0.08);
  color: var(--primary-color);
  box-shadow: 0 0 0 1px var(--primary-color);
}

.action-button--stats,
.action-button--stats:hover,
.action-button--stats:active {
  cursor: default;
  background-color: var(--background-color);
  color: var(--text-color);
  box-shadow: none;
}

.action-button__icon svg {
  width: 24px;
  height: 24px;
  display: block;
  flex-shrink: 0;
  transition: transform 0.3s ease-out;
}

.action-button--icon-sidebar .action-button__icon svg {
    transform: rotate(0deg); 
    transition: transform 0.3s ease-out;
}

.action-button--icon-sidebar.is-close .action-button__icon svg {
    transform: rotate(180deg); 
}
/* ========== reaction ========== */
.action-button--reaction {
  gap: 12px;
  padding: 12px 16px;
}

.action-button__label {
  font-size: 16px;
  font-weight: 500;
}

/* ========== stats ========== */
.action-button--stats {
  gap: 10px;
  padding: 12px 16px;
}

.action-button__text {
  display: flex;
  flex-direction: column;
}

.action-button__primary {
  font-size: 16px;
  font-weight: 600;
}

.action-button__max {
  color: var(--secondary-color);
  font-weight: 400;
  margin-left: 4px;
}

.action-button__secondary {
  font-size: 14px;
  color: var(--secondary-color);
  margin-top: 2px;
}

/* ========== icon-only ========== */
.action-button--icon {
  justify-content: center;
  width: 50px;
  height: 50px;
  padding: 8px;
  border-radius: 12px;
  background-color: transparent;
}

.action-button--icon-sidebar {
  background-color: var(--background-color);
}

.action-button--icon-back {
  background-color: #FFFFFF;
}

.action-button--icon-sidebar:hover {
  background-color: #e8e8e8;
  color: var(--text-color);
  box-shadow: none;
}

.action-button--icon-back:hover {
  background-color: rgba(0, 102, 255, 0.08);
  color: var(--primary-color);
  box-shadow: 0 0 0 1px var(--primary-color);
}

.action-button--icon-dropdown .action-button__icon svg {
    transition: transform 0.2s ease-out; 
}

.action-button--icon-dropdown.is-open .action-button__icon svg {
    transform: rotate(180deg);
}
</style>
