<script setup lang="ts">
import { useInvoiceStore } from '~/stores/invoice'

const store = useInvoiceStore()
const { t } = useI18n()

const tDoc = (key: string) => t(key, {}, { locale: store.data.docLang })
provide('tDoc', tDoc)

const { data: themes } = await useFetch('/api/themes')
const currentThemeCss = computed(() => {
  const theme = themes.value?.find((t: any) => t.id === store.data.theme)
  return theme?.css || ''
})

const docLanguageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Հայերեն', value: 'hy' }
]
</script>

<template>
  <div class="preview-wrapper">
    <div class="preview-controls">
      <label class="lang-selector">
        <span>Язык документа:</span>
        <select v-model="store.data.docLang" class="lang-select">
          <option v-for="opt in docLanguageOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </label>
    </div>

    <div class="preview-container">
      <component :is="'style'">{{ currentThemeCss }}</component>

      <div class="invoice-sheet" id="invoice-print" :class="`theme-${store.data.theme || 'default'}`">
        <PreviewHeader />
        <div class="sheet-rule"></div>
        <PreviewParties />
        <PreviewItems />
        <PreviewFooter />
      </div>
    </div>
  </div>
</template>

<style scoped>
.preview-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--bg-body, #f3f4f6);
}

.preview-controls {
  padding: 16px;
  background-color: var(--bg-surface, #ffffff);
  border-bottom: 1px solid var(--border-color, #e5e7eb);
  display: flex;
  justify-content: flex-end;
}

.lang-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-base, #374151);
}

.lang-select {
  padding: 6px 12px;
  border: 1px solid var(--border-color, #d1d5db);
  border-radius: 6px;
  background: var(--bg-surface, #fff);
  color: var(--text-base, #111827);
  outline: none;
}

.preview-container {
  padding: 40px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
}

/* БАЗОВЫЕ СТИЛИ ЛИСТА (ЖЕСТКИЕ ЦВЕТА) */
.invoice-sheet {
  background-color: #ffffff;
  width: 210mm;
  min-height: 297mm;
  padding: 20mm;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  color: #111827;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); /* Тень для красоты на экране */
  position: relative;
  text-align: left;
}

.sheet-rule {
  height: 1px;
  background-color: #e5e7eb;
  margin-bottom: 32px;
}

@media print {
  .preview-wrapper, .preview-container { background: none; padding: 0; }
  .preview-controls { display: none; }
  .invoice-sheet { width: 100%; min-height: auto; padding: 0; box-shadow: none; border: none; }
}
</style>