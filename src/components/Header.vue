<script setup lang="ts">
import NotificationSvg from '@/assets/svg/notification.svg?raw'
import UserSvg from '@/assets/svg/user.svg?raw'
import MenuSvg from '@/assets/svg/menu.svg?raw'
import ArrowSvg from '@/assets/svg/arrow.svg?raw'
import ActionButton from '@/components/ActionButton.vue'
import { useSidebar } from '@/composables/useSidebar'

const { sidebarOpen, toggleSidebar } = useSidebar()
</script>

<template>
  <header class="header">
    <div class="header-wrapper">
      <a
        href="https://sofi-assistant.com/dashboard"
        target="_blank"
        rel="noopener noreferrer"
        class="header__logo"
      >
        <img
          src="../assets/svg/sofi-logo.svg"
          alt="Логотип SOFI"
          class="logo-img"
        >
      </a>

      <div class="header-actions">
        <div class="notification">
          <ActionButton
            variant="icon"
            :icon="NotificationSvg"
          />
          <span
            class="header__dot"
            aria-hidden="true"
          />
        </div>

        <div class="user-info">
          <ActionButton
            variant="icon"
            :icon="UserSvg"
          />
          <div class="profile-text">
            <span class="header__name">Андрей Луцкевич</span>
            <span class="header__desc">Аккаунт HH.ru</span>
          </div>
          <ActionButton
            variant="icon"
            :icon="ArrowSvg"
            action-type="toggle-dropdown"
          />
        </div>
        <!-- Скачать CloseSVG -->
        <ActionButton
          variant="icon"
          :icon="sidebarOpen ? MenuSvg : MenuSvg" 
          action-type="toggle-sidebar"
          @click="toggleSidebar"
          class="menu-button-mobile"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-white);
  border-bottom: 1px solid var(--border-color);
  height: 90px;
}

.header-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
}

.header-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

/* ---------- Actions ---------- */
.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-button--icon {
  background-color: var(--background-color);
  padding: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  border-radius: 16px;
  padding: 12px 24px 12px 16px;
  margin-right: 0;
  gap: 12px;
}

.profile-text {
  display: flex;
  flex-direction: column;
}

.header__desc {
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  color: var(--secondary-color);
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s;
}

.header-actions .action-button--icon {
  background-color: var(--background-color);
  padding: 16px;
}

.menu-button-mobile {
  display: none;
}

@media (max-width: 768px) {
  .header {
    height: auto;
  }

  .header-wrapper {
    padding: 12px 16px;
  }

  .user-info {
    display: none;
  }
  
  .menu-button-mobile {
    display: flex;
    width: 50px; 
    height: 50px;
    padding: 13px;
    border-radius: 12px;
    box-shadow: none;
  }

  .notification {
    margin-right: -4px;
  }

  .header-actions .action-button--icon {
    width: 50px;
    height: 50px;
    padding: 13px; 
    border-radius: 12px;
    background-color: var(--background-color);
  }
  .menu-button-mobile {
    display: flex; 
  }
  
  .notification {
    position: relative;
  }
  .header__dot {
    position: absolute;
    top: 13px;
    right: 13px;
    width: 8px;
    height: 8px;
    background-color: var(--primary-color);
    border-radius: 50%;
    transform: translate(2px, -2px); 
    z-index: 10;
  }
}
</style>
