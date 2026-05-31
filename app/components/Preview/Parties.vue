<script setup lang="ts">
import { inject } from 'vue'
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '~/stores/invoice'

const store = useInvoiceStore()
const { data } = storeToRefs(store)
const tDoc = inject<Function>('tDoc')!
</script>

<template>
  <div class="parties-grid">
    <div class="party">
      <div class="party-label">{{ tDoc('doc.contractor') }}</div>
      <div class="party-name">{{ data.contractor.name || '—' }}</div>

      <div v-if="data.contractor.address" class="party-detail party-address">{{ data.contractor.address }}</div>
      <div v-if="data.contractor.regNo" class="party-detail font-mono">{{ tDoc('doc.regNo') }}: {{ data.contractor.regNo }}</div>
      <div v-if="data.contractor.tin" class="party-detail font-mono">{{ tDoc('doc.tin') }}: {{ data.contractor.tin }}</div>
      <div v-if="data.contractor.email" class="party-detail">{{ data.contractor.email }}</div>
      <div v-if="data.contractor.phone" class="party-detail">{{ data.contractor.phone }}</div>
      <div v-if="data.contractor.website" class="party-detail party-link">{{ data.contractor.website }}</div>
    </div>

    <div class="party party--right">
      <div class="party-label">{{ tDoc('doc.client') }}</div>
      <div class="party-name">{{ data.client.name || '—' }}</div>

      <div v-if="data.client.address" class="party-detail party-address">{{ data.client.address }}</div>
      <div v-if="data.client.email" class="party-detail">{{ data.client.email }}</div>
      <div v-if="data.client.phone" class="party-detail">{{ data.client.phone }}</div>
    </div>
  </div>
</template>

<style scoped>
.parties-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}
.party-label {
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 8px;
}
.party-name {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 6px;
}
.party-detail {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.5;
}
.party-address {
  white-space: pre-line;
  margin: 4px 0;
}
.party-link { font-weight: 500; }
.party--right {
  padding-left: 24px;
  border-left: 1px solid #e5e7eb;
}
.font-mono { font-family: monospace; }
</style>