import { isRef, ref, Ref, watch } from 'vue'
import { fetchVacancyCount } from '../api/vacancies'

interface LocalFormFilters {
  keywords: string
  excludeWords: string
  industries: string[]
  searchInTitle: boolean
  searchInDescription: boolean
  experience: string
}

/**
 * @param positionId
 * @param filters
 * @param debounceTime
 */
export function useVacancyCount(
  positionId: Ref<string | null>,
  filters: Ref<LocalFormFilters>,
  debounceTime: number = 500,
){
  const count = ref<number | null>(null)
  const loading = ref(false)
  let debounceTimer: number | undefined

  async function updateCount() {
    if (!positionId.value) return

    const apiFilters = {
      keywords: filters.value.keywords,
      exclude_keywords: filters.value.excludeWords,
      industries: filters.value.industries,
      search_in: [
        ...(filters.value.searchInTitle ? ['title'] : []),
        ...(filters.value.searchInDescription ? ['description'] : []),
      ],
      experience: [filters.value.experience].filter(Boolean),
    }

    const cleanedFilters: Record<string, any> = {}
    Object.entries(apiFilters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            if (value.length > 0) {
                cleanedFilters[key] = value
            }
        } else if (value !== '' && value != null) {
            cleanedFilters[key] = value
        }
    })

    loading.value = true
    try {
      const res = await fetchVacancyCount(positionId.value, cleanedFilters)
      count.value = res.count
    } catch (e) {
      console.error('Ошибка получения количества вакансий', e)
      count.value = 0
    } finally {
      loading.value = false
    }
  }

  watch(
    filters,
    () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }

      loading.value = true
      
      debounceTimer = window.setTimeout(() => {
        updateCount()
      }, debounceTime)
    },
    { deep: true, immediate: true }
  )

  return { count, loading }
}