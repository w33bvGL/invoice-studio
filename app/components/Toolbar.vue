<script setup lang="ts">
defineProps<{
  data: any
  showJsonPanel: boolean
}>()

const emit = defineEmits(['toggleJson'])

function printInvoice() {
  window.print()
}

function exportJson(data: any) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `invoice-${data.invoiceNo}.json`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <header class="toolbar">
    <div class="toolbar-brand">
      <div class="brand-logo">
        <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
          <rect x="1" y="1" width="20" height="20" rx="4" stroke="currentColor" stroke-width="1.8"/>
          <path d="M6 7h10M6 11h7M6 15h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </div>
      <span class="brand-name">INVOICELAB</span>
      <div class="divider"></div>
      <span class="invoice-id font-mono">#{{ data.invoiceNo }}</span>
    </div>

    <div class="toolbar-actions">
      <UiButton :variant="showJsonPanel ? 'secondary' : 'ghost'" size="sm" @click="emit('toggleJson')">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style="margin-right: 2px;">
          <path d="M4 2L2 7l2 5M10 2l2 5-2 5M8 1.5l-2 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        Toolkit
      </UiButton>

      <UiButton variant="ghost" size="sm" @click="exportJson(data)">
        Export
      </UiButton>

      <UiButton variant="primary" size="sm" @click="printInvoice">
        Print PDF
      </UiButton>
    </div>
  </header>
</template>

<style scoped>
@layer components {
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--space-base);
    height: 52px;
    background-color: var(--bg-elevated);
    border-bottom: 1px solid var(--border-color);
    position: relative;
    z-index: var(--z-sticky);
  }

  .toolbar-brand {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }

  .brand-logo {
    color: var(--color-primary);
    display: flex;
    align-items: center;
  }

  .brand-name {
    font-size: var(--font-small);
    font-weight: var(--weight-bold);
    letter-spacing: 1px;
  }

  .divider {
    width: 1px;
    height: 16px;
    background-color: var(--border-color);
  }

  .invoice-id {
    font-size: var(--font-small);
    color: var(--text-muted);
  }

  .toolbar-actions {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }
}
</style>