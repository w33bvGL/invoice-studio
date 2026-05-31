<script setup lang="ts">
const appConfig = useAppConfig()
const currencyOptions = computed(() => appConfig.invoice.currencies)

defineProps<{
  modelValue: any
}>()
</script>

<template>
  <UiCard :title="$t('invoice.document.title')" icon="heroicons:document-text">
    <div class="invoice-grid">
      <UiInput
          v-model="modelValue.invoiceNo"
          :label="$t('invoice.document.invoiceNo')"
          placeholder="2026-001"
      />

      <UiSelect
          v-model="modelValue.currency"
          :label="$t('invoice.document.currency')"
          :options="currencyOptions"
      />

      <UiInput
          v-model="modelValue.date"
          type="date"
          :label="$t('invoice.document.issueDate')"
      />

      <UiInput
          v-model="modelValue.dueDate"
          type="date"
          :label="$t('invoice.document.dueDate')"
      />
    </div>
  </UiCard>
</template>

<style scoped>
.invoice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
  gap: var(--space-md);
}
</style>