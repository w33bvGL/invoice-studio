<script setup lang="ts">
import { useInvoiceStore } from '~/stores/invoice'

const appConfig = useAppConfig()
const currencyOptions = computed(() => appConfig.invoice.currencies)

const store = useInvoiceStore()
const { data } = storeToRefs(store)
</script>

<template>
  <UiCard :title="$t('left.document.title')" icon="heroicons:document-text">
    <div class="invoice-grid">
      <UiInput
          v-model="data.invoiceNo"
          :label="$t('left.document.invoiceNo')"
          placeholder="2026-001"
      />

      <UiSelect
          v-model="data.currency"
          :label="$t('left.document.currency')"
          :options="currencyOptions"
      />

      <UiInput
          v-model="data.date"
          type="date"
          :label="$t('left.document.issueDate')"
      />

      <UiInput
          v-model="data.dueDate"
          type="date"
          :label="$t('left.document.dueDate')"
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