const API_BASE = '/api'

export interface ApiUserPreferences {
  keywords?: string[]
  exclude_keywords?: string[]
  search_in?: ('title' | 'description' | 'company')[]
  specializations?: string[]
  industries?: string[]
  excluded_employer_ids?: string[]
  experience?: string[]
}

export interface GetApiUserPreferences {
  position_id: number
  keywords?: string[]
  exclude_keywords?: string[]
  search_in?: {
    title: boolean
    company: boolean
    description: boolean
  }
  specializations?: { id: string; name: string; area_id: string }[]
  industries?: { id: string; name: string; parent_id: string }[]
  manual_query: boolean
  excluded_employers?: { id: string; name: string }[]
  experience?: string[]
}

export interface LocalUserPreferences {
  keywords: string
  excludeWords: string
  industries: string[]
  experience: string
  searchInTitle: boolean
  searchInDescription: boolean
}

export interface ApiPosition {
  position_id: number
  title: string
  status: boolean
}

export async function getPositions(): Promise<ApiPosition[]> {
  const res = await request<{ positions: ApiPosition[] }>('/positions')
  return res.positions
}

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API error: ${res.status} ${text}`)
  }

  return res.json() as Promise<T>
}

export async function getUserPreferences(positionId: string) {
  const apiPrefs = await request<GetApiUserPreferences>(`/positions/${positionId}/preferences`)

  const localPrefs: LocalUserPreferences = {
    keywords: apiPrefs.keywords ? apiPrefs.keywords.join(', ') : '',
    excludeWords: apiPrefs.exclude_keywords ? apiPrefs.exclude_keywords.join(', ') : '',
    industries: apiPrefs.industries?.map(i => i.name) || [],
    experience: apiPrefs.experience?.[0] || '',
    searchInTitle: apiPrefs.search_in?.title ?? true,
    searchInDescription: apiPrefs.search_in?.description ?? false,
  }

  return localPrefs
}

export async function saveUserPreferences(positionId: string, data: LocalUserPreferences) {
  type SearchInOption = 'title' | 'description' | 'company'

  const searchInArray: SearchInOption[] = [
    ...(data.searchInTitle ? (['title'] as SearchInOption[]) : []),
    ...(data.searchInDescription ? (['description'] as SearchInOption[]) : []),
  ]

  const apiData: ApiUserPreferences = {
    keywords: data.keywords ? data.keywords.split(',').map(k => k.trim()).filter(Boolean) : [],
    exclude_keywords: data.excludeWords ? data.excludeWords.split(',').map(k => k.trim()).filter(Boolean) : [],
    industries: data.industries,
    experience: data.experience ? [data.experience] : [],
    search_in: searchInArray,
  }

  const cleanedApiData: Record<string, any> = {}
  Object.entries(apiData).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) cleanedApiData[key] = value
    else if (value != null && value !== '') cleanedApiData[key] = value
  })

  return request<void>(`/positions/${positionId}/preferences`, {
    method: 'PUT',
    body: JSON.stringify(cleanedApiData),
  })
}

export async function toggleManualQuery(positionId: string) {
  return request<{ manual_query: boolean }>(
    `/positions/${positionId}/preferences/manual_query/toggle`,
    { method: 'POST' },
  )
}

export async function fetchVacancyCount(positionId: string, filters: Record<string, any>) {
  const cleanedFilters: Record<string, any> = {}
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) cleanedFilters[key] = value
    else if (value !== '' && value != null) cleanedFilters[key] = value
  })

  return request<{ count: number }>(
    `/positions/${positionId}/vacancies/count`,
    {
      method: 'POST',
      body: JSON.stringify(cleanedFilters),
    },
  )
}
