import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/ui'

export function useSidebar() {
  const ui = useUiStore()
  const { sidebarOpen, activePage } = storeToRefs(ui)
  const { toggleSidebar, setActive } = ui

  return { sidebarOpen, activePage, toggleSidebar, setActive }
}
