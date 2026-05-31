<script setup lang="ts">

const { t } = useI18n()
const activeTab = ref('data')

const tabs = computed(() => [
  { id: 'data', label: t('right.tab.data') },
  { id: 'design', label: t('right.tab.design') }
])
</script>

<template>
  <div class="panel-layout">
    <UiTabs :tabs="tabs" v-model="activeTab" />

    <div v-if="activeTab === 'data'" class="tab-content">
      <FormRightDataItemsSection />
      <FormRightDataBankSection />
      <FormRightDataNotesSection />
      <FormRightDataSignatureSection />
    </div>

    <div v-if="activeTab === 'design'" class="tab-content">
      <FormRightDesignPresests />
      <FormRightDesignLanguageSection />
    </div>
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