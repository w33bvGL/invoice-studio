<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '~/stores/invoice' // Скорректируйте путь к стору, если он отличается

const appConfig = useAppConfig()
const currencyOptions = computed(() => appConfig.invoice.currencies)

const store = useInvoiceStore()
// Извлекаем data из стора с сохранением реактивности
const { data } = storeToRefs(store)
</script>

<template>
  <UiCard :title="$t('invoice.document.title')" icon="heroicons:document-text">
    <div class="invoice-grid">
      <UiInput
          v-model="data.invoiceNo"
          :label="$t('invoice.document.invoiceNo')"
          placeholder="2026-001"
      />

      <UiSelect
          v-model="data.currency"
          :label="$t('invoice.document.currency')"
          :options="currencyOptions"
      />

      <UiInput
          v-model="data.date"
          type="date"
          :label="$t('invoice.document.issueDate')"
      />

      <UiInput
          v-model="data.dueDate"
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