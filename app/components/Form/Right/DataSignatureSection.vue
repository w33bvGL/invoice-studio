<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '~/stores/invoice'

const store = useInvoiceStore()
const { data } = storeToRefs(store)

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      store.updateField('signatureImage', event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }
}

const clearSignature = () => {
  store.updateField('signatureImage', '')
}
</script>

<template>
  <UiCard title="Подпись" icon="heroicons:pencil">
    <div class="signature-upload-flow">
      <div v-if="data.signatureImage" class="preview-box">
        <img :src="data.signatureImage" alt="Signature" />
        <UiButton variant="ghost" size="sm" @click="clearSignature">Удалить</UiButton>
      </div>

      <div v-else class="upload-input">
        <input type="file" accept="image/png, image/jpeg" @change="onFileChange" />
        <span class="upload-hint">PNG или JPG (макс 256x256)</span>
      </div>
    </div>
  </UiCard>
</template>

<style scoped>
.signature-upload-flow {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
.preview-box {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}
.preview-box img {
  max-width: 120px;
  max-height: 60px;
  object-fit: contain;
  border: 1px solid var(--border-color);
}
.upload-input {
  border: 2px dashed var(--border-color);
  padding: var(--space-md);
  text-align: center;
}
.upload-hint {
  font-size: var(--font-xs);
  color: var(--text-muted);
}
</style>