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

    <div class="sig-content">
      <div class="sig-line"></div>

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
  width: 100%; /* Занимает доступную ширину */
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
  max-width: 128px;
  max-height: 128px;
  object-fit: contain;
  display: block;
}
/* Flex-контейнер */
.sig-content {
  display: flex;
  align-items: flex-start; /* Выравнивание по верхнему краю */
  gap: 20px; /* Расстояние между линией и текстом */
}
.sig-line {
  border-top: 1px solid #374151;
  width: 150px; /* Длина линии */
  margin-top: 8px; /* Выравнивание линии относительно текста */
}
.sig-info {
  display: flex;
  flex-direction: column;
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
}
</style>