<script setup lang="ts">
const props = defineProps<{
  data: any
}>()

const activeTab = ref('data')

const tabs = [
  { id: 'data', label: 'Данные' },
  { id: 'design', label: 'Дизайн' }
]

</script>

<template>
  <div class="panel-layout">
    <UiTabs :tabs="tabs" v-model="activeTab" />

    <div v-if="activeTab === 'data'" class="tab-content">
      <FormRightDataItemsSection :model-value="data" />
      <FormRightDataBankSection :model-value="data" />
      <FormRightDataNotesSection :model-value="data" />
    </div>

    <FormRightDesign v-if="activeTab === 'design'" :model-value="data" @update:model-value="$emit('update:data', $event)" />
  </div>
</template>

<style scoped>
.panel-layout {
  padding: var(--space-base);
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
</style>