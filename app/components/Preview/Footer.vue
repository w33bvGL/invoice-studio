<script setup lang="ts">
import { inject } from 'vue'
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '~/stores/invoice'

const store = useInvoiceStore()
const { data } = storeToRefs(store)
const tDoc = inject<Function>('tDoc')!
</script>

<template>
  <div class="footer-wrapper">
    <div v-if="data.bankDetails.bankName || data.bankDetails.accountNo" class="bank-card">
      <div class="bank-card__title">{{ tDoc('doc.bank.title') }}</div>
      <div class="bank-grid">
        <div v-if="data.bankDetails.bankName" class="bank-item">
          <span class="bank-key">{{ tDoc('doc.bank.bankName') }}</span>
          <span class="bank-val">{{ data.bankDetails.bankName }}</span>
        </div>
        <div v-if="data.bankDetails.accountNo" class="bank-item">
          <span class="bank-key">{{ tDoc('doc.bank.accountNo') }}</span>
          <span class="bank-val font-mono">{{ data.bankDetails.accountNo }}</span>
        </div>
        <div v-if="data.bankDetails.swift" class="bank-item">
          <span class="bank-key">{{ tDoc('doc.bank.swift') }}</span>
          <span class="bank-val font-mono">{{ data.bankDetails.swift }}</span>
        </div>
        <div v-if="data.bankDetails.iban" class="bank-item">
          <span class="bank-key">{{ tDoc('doc.bank.iban') }}</span>
          <span class="bank-val font-mono">{{ data.bankDetails.iban }}</span>
        </div>
      </div>
    </div>

    <div v-if="data.notes" class="notes-block">
      <div class="notes-label">{{ tDoc('doc.notes') }}</div>
      <div class="notes-text">{{ data.notes }}</div>
    </div>
  </div>
</template>

<style scoped>
.footer-wrapper {
  margin-top: auto;
}
.bank-card {
  padding: 20px;
  margin-bottom: 24px;
}
.bank-card__title {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #6b7280;
  margin-bottom: 12px;
}
.bank-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.bank-item {
  display: flex;
  flex-direction: column;
}
.bank-key {
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
}
.bank-val {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}
.notes-block {
  margin-bottom: 40px;
}
.notes-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 8px;
}
.notes-text {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.5;
  border-left: 2px solid #e5e7eb;
  padding-left: 12px;
}
.font-mono { font-family: monospace; }
</style>