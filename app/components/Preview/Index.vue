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
    <PreviewControls />
    <PreviewBackgroundGrid/>

    <div class="scroll-area">
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
  overflow: hidden;
  position: relative;
}

.scroll-area {
  flex: 1;
  position: relative;
  overflow-y: auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
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
  z-index: 1;
  text-align: left;
}

.sheet-rule {
  height: 1px;
  background-color: #e5e7eb;
  margin-bottom: 32px;
}

@media print {
  .preview-wrapper { overflow: visible; }
  .scroll-area { padding: 0; overflow: visible; }
  .invoice-sheet { width: 100%; min-height: 100%; box-shadow: none; }
}
</style>