<script setup lang="ts">
import { inject } from 'vue'
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '~/stores/invoice'

const store = useInvoiceStore()
const { data } = storeToRefs(store)
const tDoc = inject<Function>('tDoc')!
</script>

<template>
  <div class="signature-block">
    <div class="sig-line"></div>
    <div class="sig-name">{{ data.contractor.name }}</div>
  </div>
</template>

<style scoped>
.signature-block {
  margin-top: 40px;
  width: 250px;
}
.sig-line {
  border-top: 1px solid #374151;
  margin-bottom: 8px;
}
.sig-name {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}
</style>