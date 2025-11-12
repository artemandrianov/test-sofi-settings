<script setup lang="ts">
import CollapseSvg from '@/assets/svg/arrow.svg?raw'
import DashboardSvg from '@/assets/svg/dashboard.svg?raw'
import InstructionSvg from '@/assets/svg/instr.svg?raw'
import InterviewSvg from '@/assets/svg/Interview1.svg?raw'
import PositionSvg from '@/assets/svg/position.svg?raw'
import ReactionSvg from '@/assets/svg/reactions.svg?raw'
import ReactionsSvg from '@/assets/svg/reactions.svg?raw'
import SubscriptionSvg from '@/assets/svg/subscription.svg?raw'
import SupportSvg from '@/assets/svg/support.svg?raw'
import VacanciesSvg from '@/assets/svg/work.svg?raw'
import UserSvg from '@/assets/svg/user.svg?raw'

import ActionButton from '@/components/ActionButton.vue'
import SidebarButton from '@/components/Sidebar/SidebarButton.vue'
import { useSidebar } from '@/composables/useSidebar'
import { useRouter } from 'vue-router'

const { sidebarOpen, toggleSidebar } = useSidebar()
const router = useRouter()

</script>

<template>
  <aside
    class="sidebar"
    :class="{ 'sidebar--collapsed': !sidebarOpen }"
  >
    <header class="sidebar-header">
      <ActionButton
        variant="icon"
        :icon="CollapseSvg"
        action-type="toggle-sidebar" 
        :class="{ 'is-open': !sidebarOpen }" 
        @click="toggleSidebar"
        class="desktop-only-collapse-btn" />
    </header>

    <nav class="sidebar-nav">
      <div class="menu">
        <SidebarButton
          :icon="DashboardSvg"
          label="Дэшборд"
          :to="{ name: 'dashboard' }"
          :collapsed="!sidebarOpen"
          
        />
        <SidebarButton
          :icon="PositionSvg"
          label="Позиции"
          :to="{ name: 'positions' }"
          :collapsed="!sidebarOpen"
          
        />
        <SidebarButton
          :icon="ReactionSvg"
          label="Отклики"
          :to="{ name: 'dashboard' }"
          :collapsed="!sidebarOpen"
          
        />
        <SidebarButton
          :icon="SubscriptionSvg"
          label="Подписка"
          :to="{ name: 'dashboard' }"
          :collapsed="!sidebarOpen"
          
        />
        <SidebarButton
          :icon="InterviewSvg"
          label="Интервью"
          :to="{ name: 'dashboard' }"
          :collapsed="!sidebarOpen"
          
        />
        <SidebarButton
          :icon="VacanciesSvg"
          label="Вакансии"
          :to="{ name: 'dashboard' }"
          :collapsed="!sidebarOpen"
        />
      </div>

      <div class="actions desktop-actions">
        <ActionButton
          variant="stats"
          :icon="ReactionsSvg"
          :value="10"
          :max="20"
          description="Суточных откликов"
        />
        <ActionButton
          variant="reaction"
          :icon="InstructionSvg"
          label="Инструкция"
          @click="router.push('/instruction')"
        />
        <ActionButton
          variant="reaction"
          :icon="SupportSvg"
          label="Поддержка"
          @click="router.push('/support')"
        />
      </div>

      <div class="mobile-footer">
      <div class="mobile-user-info">
        <ActionButton
          variant="icon"
          :icon="UserSvg"
          action-type="link"
          class="mobile-user-icon"
        />
        <div class="profile-text">
          <span class="header__name">Артём</span>
          <span class="header__desc">Выйти из HH.ru</span>
        </div>
      </div>
      
      <div class="mobile-actions">
        <ActionButton
          variant="icon"
          :icon="InstructionSvg"
          action-type="link"
        />
        <ActionButton
          variant="icon"
          :icon="SupportSvg"
          action-type="link"
        />
        <ActionButton
          variant="icon"
          :icon="DashboardSvg"
          action-type="link"
          class="placeholder-button"
        />
      </div>
    </div>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 280px;
  background: var(--color-white);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease, transform 0.3s ease;
}

.sidebar--collapsed {
  width: 72px;
}

.sidebar-header {
  display: flex;
  justify-content: flex-start;
  padding: 12px;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-inline: 12px;
  margin-block: 20px;
}

.desktop-only-collapse-btn {
  display: flex; 
}
.desktop-actions {
  display: flex;
}
.mobile-footer {
  display: none; 
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 300px;
    z-index: 100;
    transform: translateX(-100%); 
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); 
  }
  .sidebar:not(.sidebar--collapsed) { 
    transform: translateX(0);
  }

  .sidebar--collapsed {
    width: 300px;
    transform: translateX(-100%); 
  }
  
  .sidebar-header {
    display: none; 
  }
  .desktop-only-collapse-btn {
    display: none;
  }
  .desktop-actions {
    display: none;
  }
  
  .mobile-footer {
    display: flex;
    flex-direction: column;
    padding: 24px 16px 16px 16px;
    border-top: 1px solid var(--border-color);
    gap: 16px;
  }
  
  .mobile-user-info {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
  }
  .mobile-user-icon.action-button--icon {
    width: 40px;
    height: 40px;
    padding: 8px;
    background-color: var(--background-color);
  }
  .mobile-user-info .profile-text {
    display: flex;
    flex-direction: column;
  }
  .mobile-user-info .header__name {
    font-size: 16px;
    font-weight: 500;
  }
  .mobile-user-info .header__desc {
    font-size: 14px;
    color: var(--secondary-color);
  }

  .mobile-actions {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
  .mobile-actions .action-button--icon {
    flex: 1;
    width: auto;
    height: 50px;
    border-radius: 12px;
    background-color: var(--background-color);
    padding: 12px;
  }
}
</style>
