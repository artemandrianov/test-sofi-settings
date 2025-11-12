<script setup lang="ts">
defineProps<{
  isSaving: boolean
  isLoadingCount: boolean
  count: number
}>()

const emit = defineEmits(['save'])

function onSave() {
  emit('save')
}
</script>

<template>
  <div>
    <div class="position-actions">
      <button
        class="save-button"
        :disabled="isSaving"
        @click="onSave"
      >
        <span v-if="isSaving">Сохранение...</span>
        <span v-else>Сохранить</span>
      </button>
      <div
        class="vacancy-count"
        :class="{ loading: isLoadingCount }"
      >
        <div
          v-if="isLoadingCount"
          class="count-loader"
        />
        <span v-else>Найдено вакансий: {{ count }}</span>
      </div>
    </div>

    <footer class="mobile-footer">
      <button
        class="save-button mobile"
        :disabled="isSaving"
        @click="onSave"
      >
        <span v-if="isSaving">Сохранение...</span>
        <span v-else>Сохранить</span>
      </button>
    </footer>
  </div>
</template>

<style scoped>
.position-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.save-button {
  background-color: var(--primary-color);
  color: white;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;
  min-width: 120px;
}
.save-button:hover {
  background-color: #1d4ed8;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}
.save-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  background-color: #9ca3af;
  box-shadow: none;
}
.save-button.mobile {
  display: none;
}

.vacancy-count {
  font-size: 14px;
  color: #4b5563;
  min-height: 20px;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
}
.vacancy-count.loading {
  color: #6b7280;
}

.count-loader {
  width: 16px;
  height: 16px;
  border: 2px solid #9ca3af;
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.mobile-footer {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 16px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
  z-index: 1000;
}

@media (max-width: 768px) {
  .position-actions {
    display: none;
  }

  .mobile-footer {
    display: block;
  }

  .save-button.mobile {
    display: block;
    width: 100%;
    font-size: 16px;
    padding: 14px;
  }
}
</style>
