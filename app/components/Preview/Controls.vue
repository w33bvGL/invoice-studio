<script setup lang="ts">
import { useInvoiceStore } from '~/stores/invoice'
const store = useInvoiceStore()
const { locales } = useI18n()

const languageOptions = computed(() =>
    locales.value.map((loc: any) => ({
      code: loc.code,
      name: loc.name || loc.code.toUpperCase()
    }))
)
</script>

<template>
  <div class="preview-controls">
    <label class="lang-selector">
      <span>Язык документа:</span>
      <select v-model="store.data.docLang" class="lang-select">
        <option
            v-for="loc in languageOptions"
            :key="loc.code"
            :value="loc.code"
        >
          {{ loc.name }}
        </option>
      </select>
    </label>
  </div>
</template>

<style scoped>
.preview-controls {
  padding: 16px;
  background-color: #ffffff; /* Жесткий цвет для стабильности */
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
}

.lang-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
}

.lang-select {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
  color: #111827;
  outline: none;
  cursor: pointer;
}
</style>