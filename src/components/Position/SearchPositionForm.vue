<script setup lang="ts">
import type { LocalUserPreferences } from '@/api/vacancies'

const props = defineProps<{
  filters: LocalUserPreferences
}>()

const emit = defineEmits(['edit-industries'])

function removeTag(index: number) {
  props.filters.industries.splice(index, 1)
}
</script>

<template>
  <div class="form-fields">
    <div class="form-section">
      <div class="form-label-group">
        <label
          for="keywords"
          class="form-label"
        >Ключевые слова *</label>
        <p class="form-description">
          Слова, которые нужно искать в вакансии
        </p>
      </div>
      <div class="form-control-group">
        <input
          id="keywords"
          v-model="filters.keywords"
          type="text"
          class="form-input"
          placeholder="например, специалист по тестированию"
        >
        <p class="form-label-minor">
          Искать
        </p>
        <div class="checkbox-group">
          <label class="checkbox-label">
            <input
              v-model="filters.searchInTitle"
              type="checkbox"
              class="form-checkbox"
            >
            <span class="custom-checkbox" />
            в названии вакансии
          </label>
          <label class="checkbox-label">
            <input
              v-model="filters.searchInDescription"
              type="checkbox"
              class="form-checkbox"
            >
            <span class="custom-checkbox" />
            в описании вакансии
          </label>
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-label-group">
        <label
          for="exclude-words"
          class="form-label"
        >Исключить слова</label>
        <p class="form-description">
          Убрать вакансии со словами
        </p>
      </div>
      <div class="form-control-group">
        <input
          id="exclude-words"
          v-model="filters.excludeWords"
          type="text"
          class="form-input"
          placeholder="Исключить слова, через запятую"
        >
      </div>
    </div>

    <div class="form-section">
      <div class="form-label-group">
        <label class="form-label">Отрасль компании</label>
      </div>
      <div class="form-control-group">
        <p class="form-description mobile-only">
          Вы выбрали <span class="industry-count">{{ filters.industries.length }} отраслей</span>
        </p>
        <p class="form-description desktop-only">
          Вы выбрали <span class="industry-count">{{ filters.industries.length }} отраслей</span>
        </p>
        <div class="tags-container">
          <TransitionGroup name="tag-fade">
            <span
              v-for="(tag, i) in filters.industries"
              :key="tag"
              class="tag"
            >
              {{ tag }}
              <button
                type="button"
                class="remove-tag-btn"
                aria-label="Удалить тег"
                @click="removeTag(i)"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 3L3 9M3 3L9 9"
                    stroke="#4B5563"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </span>
          </TransitionGroup>
        </div>
        <a
          href="#"
          class="edit-industries-link"
          @click.prevent="$emit('edit-industries')"
        >Изменить отрасли</a>
      </div>
    </div>

    <div class="form-section">
      <div class="form-label-group">
        <label
          for="experience"
          class="form-label"
        >Опыт работы</label>
      </div>
      <div class="form-control-group">
        <div class="select-wrapper">
          <select
            id="experience"
            v-model="filters.experience"
            class="form-select"
          >
            <option
              disabled
              value=""
            >
              Выберите уровень опыта
            </option>
            <option value="Без опыта">
              Без опыта
            </option>
            <option value="1-3 года">
              1-3 года
            </option>
            <option value="3-6 лет">
              3-6 лет
            </option>
            <option value="Более 6 лет">
              Более 6 лет
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-fields {
  --gap: 32px;

  max-width: 60%;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.form-section {
  display: flex;
  flex-direction: row;
  gap: var(--gap);
}

.form-label-group {
  flex-basis: 35%;
  flex-shrink: 0;
  position: relative;
}

.form-control-group {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 4px;
}
.form-label-minor {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  margin-top: 16px;
  margin-bottom: 8px;
}

.form-description {
  font-size: 14px;
  color: var(--secondary-color);
  margin: 0 0 16px 0;
}
.form-description.desktop-only {
  display: block;
  margin-top: 4px;
}
.form-description.mobile-only {
  display: none;
}

.form-input,
.form-select {
  width: 100%;
  transition:
    border-color var(--transition-duration) ease,
    box-shadow var(--transition-duration) ease;
}
.form-input::placeholder,
.form-select:invalid {
  color: #9ca3af;
}
.form-input:focus,
.form-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary-color) 20%, transparent);
}

.select-wrapper {
  position: relative;
  width: 100%;
}
.select-wrapper::after {
  content: '▼';
  font-size: 10px;
  color: var(--secondary-color);
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.form-select {
  appearance: none;
  -webkit-appearance: none;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.checkbox-label {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
}
.form-checkbox {
  opacity: 0;
  width: 0;
  height: 0;
}
.custom-checkbox {
  width: 18px;
  height: 18px;
  border: 1.5px solid #d1d5db;
  border-radius: 4px;
  margin-right: 10px;
  display: inline-block;
  position: relative;
  transition:
    background-color var(--transition-duration) ease,
    border-color var(--transition-duration) ease;
}
.custom-checkbox::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid var(--color-white);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity var(--transition-duration) ease;
}
.form-checkbox:checked + .custom-checkbox {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}
.form-checkbox:checked + .custom-checkbox::after {
  opacity: 1;
}
.form-checkbox:focus-visible + .custom-checkbox {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary-color) 20%, transparent);
}

/* Теги */
.industry-count {
  color: var(--primary-color);
  font-weight: 500;
}
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}
.tag {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #f3f4f6;
  color: #1f2937;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  padding: 6px 10px;
  white-space: nowrap;
}

.remove-tag-btn {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  transition: background-color 0.2s ease;
}
.remove-tag-btn svg path {
  transition: stroke 0.2s ease;
  stroke: #6b7280;
}
.remove-tag-btn:hover {
  background-color: #e5e7eb;
}
.remove-tag-btn:hover svg path {
  stroke: #1f2937;
}

.edit-industries-link {
  font-size: 14px;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  align-self: flex-start;
  position: relative;
}
.edit-industries-link::after {
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
.edit-industries-link:hover::after {
  transform: scaleX(1);
}

.tag-fade-enter-active,
.tag-fade-leave-active {
  transition: all 0.3s ease;
}
.tag-fade-enter-from,
.tag-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.tag-fade-move {
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .form-fields {
    max-width: 100%;
    gap: 24px;
  }

  .form-section {
    flex-direction: column;
    gap: 8px;
  }

  .form-label-group {
    flex-basis: auto;
    order: 1;
  }

  .form-control-group {
    flex: auto;
    order: 2;
  }

  .form-description.desktop-only {
    display: none;
  }
  .form-description.mobile-only {
    display: block;
    margin: 0 0 16px 0;
  }

  .tags-container {
      margin-bottom: 8px;
  }
  .edit-industries-link {
    align-self: flex-start;
  }
}
</style>
