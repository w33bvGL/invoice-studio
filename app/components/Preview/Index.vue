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
</script>

<template>
  <div class="preview-wrapper">
    <PreviewControls/>

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
  background-color: var(--bg-body);
}

.preview-container {
  padding: 40px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
}

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
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: left;
}

.sheet-rule {
  height: 1px;
  background-color: #e5e7eb;
  margin-bottom: 32px;
}

@media print {
  .invoice-sheet { width: 100%; min-height: 100%;}
}
</style>