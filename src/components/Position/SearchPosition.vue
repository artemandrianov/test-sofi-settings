<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUserPreferences, saveUserPreferences, LocalUserPreferences, getPositions } from '@/api/vacancies'
import { useVacancyCount } from '@/composables/useVacancyCount'

import SearchPositionFooter from '@/components/Position/SearchPositionFooter.vue'
import SearchPositionForm from '@/components/Position/SearchPositionForm.vue'
import SearchPositionHeader from '@/components/Position/SearchPositionHeader.vue'

// --- STATE ---
const positionId = ref<string | null>(null)
const isSaving = ref(false)
const isLoadingInitial = ref(true)

const filters = ref<LocalUserPreferences>({
  keywords: '',
  excludeWords: '',
  industries: [],
  searchInTitle: true,
  searchInDescription: false,
  experience: '',
})

const { count, loading: isLoadingCount } = useVacancyCount(positionId, filters)

onMounted(async () => {
  isLoadingInitial.value = true
  try {
    const positions = await getPositions()

    if (!positions.length) {
      throw new Error('Нет позиций для текущего пользователя')
    }

    const active = positions.find(p => p.status) || positions[0]
    positionId.value = String(active.position_id)

    const prefs = await getUserPreferences(positionId.value)
    Object.assign(filters.value, prefs)
  }
  catch (error) {
    console.error('Ошибка загрузки позиций или настроек:', error)
  }
  finally {
    isLoadingInitial.value = false
  }
})

// --- METHODS ---
async function handleSave() {
  if (!positionId.value || isSaving.value) return
  isSaving.value = true

  try {
    await saveUserPreferences(positionId.value, filters.value)
    console.log('Preferences saved:', filters.value)
  } catch (error) {
    console.error('Failed to save preferences:', error)
  } finally {
    isSaving.value = false
  }
}

function handleEditIndustries() {
  console.log('Открываем модальное окно или страницу для выбора отраслей')
}
</script>

<template>
  <div
    class="search-position"
    :class="{ 'loading-initial': isLoadingInitial }"
  >
    <div
      v-if="isLoadingInitial"
      class="initial-loader"
    >
      Загрузка настроек...
    </div>

    <div
      v-else
      class="position-content"
    >
      <SearchPositionHeader />

      <form
        class="position-form-wrapper"
        @submit.prevent="handleSave"
      >
        <SearchPositionForm :filters="filters" @edit-industries="handleEditIndustries"/>

        <SearchPositionFooter
          :is-saving="isSaving"
          :is-loading-count="isLoadingCount"
          :count="count ?? 0"
          @save="handleSave"
        />
      </form>
    </div>
  </div>
</template>

<style scoped>
.search-position {
  --space-40: 40px;

  padding: var(--space-40) var(--space-40);
  background-color: var(--background-color);
  position: relative;
}

.initial-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.2rem;
  color: var(--secondary-color);
}

.position-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.loading-initial .position-content {
  opacity: 0;
}

.position-form-wrapper {
  display: flex;
  justify-content: space-between;
  background-color: var(--color-white);
  padding: var(--space-40);
  border-radius: 12px;
}

@media (max-width: 768px) {
  .search-position {
    padding: 16px;
  }

  .position-form-wrapper {
    flex-direction: column;
    gap: 32px;
    padding: 24px 16px;
    border-radius: 0;
  }
}
</style>
