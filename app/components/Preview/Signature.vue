<script setup lang="ts">
import { useInvoiceStore } from '~/stores/invoice'

const store = useInvoiceStore()
const { data } = storeToRefs(store)
const tDoc = inject<Function>('tDoc')!
</script>

<template>
  <div class="signature-block">
    <div class="sig-content">
      <div class="sig-visual">
        <div v-if="data.signatureImage" class="sig-image-wrapper">
          <img :src="data.signatureImage" alt="Signature" class="sig-img" />
        </div>
        <div class="sig-line"></div>
        <div class="sig-label">{{ tDoc('doc.signature') }}</div>
      </div>

      <div class="sig-info">
        <div class="sig-name">{{ data.contractor.name }}</div>
        <div class="sig-meta">
          <span v-if="data.contractor.regNo">{{ tDoc('doc.regNo') }}: {{ data.contractor.regNo }}</span>
          <span v-if="data.contractor.tin"> | {{ tDoc('doc.tin') }}: {{ data.contractor.tin }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.signature-block {
  margin-top: 40px;
}

.sig-content {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.sig-visual {
  display: flex;
  flex-direction: column;
}

.sig-image-wrapper {
  margin-bottom: -20px;
  z-index: 1;
}

.sig-img {
  max-width: 150px;
  max-height: 80px;
  object-fit: contain;
  display: block;
}

.sig-line {
  border-top: 1px solid #374151;
  width: 150px;
}

.sig-label {
  font-size: 10px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  margin-top: 4px;
}

.sig-info {
  margin-top: 25px;
}

.sig-name {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.sig-meta {
  font-size: 12px;
  color: #6b7280;
  font-family: monospace;
  margin-top: 2px;
}
</style>