<script setup lang="ts">
defineProps<{
  modelValue: any
}>()

const currencyOptions = ['USD', 'EUR', 'GBP', 'AMD', 'RUB']
</script>

<template>
  <UiCard :title="$t('invoice.document.title')" icon="heroicons:document-text">
    <div class="grid-2">
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
    </div>

    <div class="grid-2">
      <UiInput v-model="modelValue.date" type="date" :label="$t('invoice.document.issueDate')" />
      <UiInput v-model="modelValue.dueDate" type="date" :label="$t('invoice.document.dueDate')" />
    </div>
  </UiCard>
</template>

<style scoped>
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}
</style>