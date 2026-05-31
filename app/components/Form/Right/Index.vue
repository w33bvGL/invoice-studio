<script setup lang="ts">
const props = defineProps<{
  data: any
}>()

const activeTab = ref('data')

const tabs = [
  { id: 'data', label: 'Данные' },
  { id: 'design', label: 'Дизайн' }
]

const themes = [
  { id: 'default', name: 'Standard (Clean)' },
  { id: 'modern', name: 'Modern (Bold)' },
  { id: 'classic', name: 'Classic (Serif)' },
]
</script>

<template>
  <div class="panel-layout">
    <UiTabs :tabs="tabs" v-model="activeTab" />

    <div v-if="activeTab === 'data'" class="tab-content">
      <FormRightInvoiceItemsSection :model-value="data" />
      <FormRightInvoiceBankSection :model-value="data" />
      <FormRightInvoiceNotesSection :model-value="data" />
    </div>

    <div v-if="activeTab === 'design'" class="tab-content design-grid">
      <h3 class="section-title">Выбор пресета</h3>

      <UiButton
          v-for="theme in themes"
          :key="theme.id"
          :class="['theme-card', { active: data.theme === theme.id }]"
          @click="data.theme = theme.id"
      >
        <span class="theme-name">{{ theme.name }}</span>
      </UiButton>
    </div>
  </div>
</template>

<style scoped>
.panel-layout {
  padding: var(--space-base);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.section-title {
  font-size: var(--font-small);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.design-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

.theme-card {
  border: 1px solid var(--border-color);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  text-align: left;
  background-color: var(--color-surface);
  transition: border-color var(--duration-normal);
}

.theme-card:hover {
  border-color: var(--color-border-strong);
}

.theme-card.active {
  border-color: var(--color-focus);
  box-shadow: 0 0 0 1px var(--color-focus);
}

.theme-name {
  font-size: var(--font-small);
  font-weight: var(--weight-semibold);
  color: var(--text-main);
}
</style>