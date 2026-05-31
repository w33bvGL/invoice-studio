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
    <div class="sig-label">{{ tDoc('doc.signature') }}</div>

    <div v-if="data.signatureImage" class="sig-image-wrapper">
      <img :src="data.signatureImage" alt="Signature" class="sig-img" />
    </div>

    <div class="sig-line"></div>
    <div class="sig-name">{{ data.contractor.name }}</div>
  </div>
</template>

<style scoped>
.signature-block {
  margin-top: 40px;
  width: 250px;
}
.sig-label {
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.sig-image-wrapper {
  margin-bottom: 10px;
}
.sig-img {
  max-width: 256px;
  max-height: 256px;
  object-fit: contain;
  display: block;
}
.sig-line {
  border-top: 1px solid #374151;
  margin-bottom: 8px;
  width: 200px;
}
.sig-name {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}
</style>