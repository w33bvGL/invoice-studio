<script setup lang="ts">
import { inject } from 'vue'
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '~/stores/invoice'

const store = useInvoiceStore()
const { data } = storeToRefs(store)
const tDoc = inject<Function>('tDoc')!

const formatDate = (dateStr: string) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString()
}
</script>

<template>
  <div class="sheet-header">
    <div class="sheet-header__left">
      <h1 class="invoice-title">{{ tDoc('doc.title') }}</h1>
      <div class="contractor-tagline">{{ data.contractor.name }}</div>
    </div>
    <div class="sheet-header__right">
      <div class="meta-item">
        <span class="meta-key">{{ tDoc('doc.invoiceNo') }}</span>
        <span class="meta-val font-mono">#{{ data.invoiceNo }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-key">{{ tDoc('doc.issueDate') }}</span>
        <span class="meta-val">{{ formatDate(data.date) }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-key">{{ tDoc('doc.dueDate') }}</span>
        <span class="meta-val due">{{ formatDate(data.dueDate) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sheet-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}
.invoice-title {
  font-size: 38px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 4px 0;
  line-height: 1;
}
.contractor-tagline {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}
.sheet-header__right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}
.meta-item {
  display: flex;
  align-items: baseline;
  gap: 16px;
}
.meta-key {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #9ca3af;
}
.meta-val {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}
.meta-val.due {
  color: #111827;
  font-weight: 700;
}
.font-mono { font-family: monospace; }
</style>