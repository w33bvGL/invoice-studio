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
        <Icon name="heroicons:document-text" class="logo-icon" />
      </div>
      <span class="brand-name">INVOICELAB</span>
      <div class="divider"></div>
      <span class="invoice-id font-mono">#{{ data.invoiceNo }}</span>
    </div>

    <div class="toolbar-actions">
      <UiLocaleSelect />
      <UiThemeToggle />

      <div class="divider"></div>

      <UiButton :variant="showJsonPanel ? 'secondary' : 'ghost'" size="sm" @click="emit('toggleJson')">
        <Icon name="heroicons:code-bracket" class="btn-icon" />
        {{ $t('toolbar.toolkit') }}
      </UiButton>

      <UiButton variant="ghost" size="sm" @click="exportJson(data)">
        {{ $t('toolbar.export') }}
      </UiButton>

      <UiButton variant="primary" size="sm" @click="printInvoice">
        {{ $t('toolbar.print') }}
      </UiButton>
    </div>
  </header>
</template>

<style scoped>
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

.logo-icon {
  width: 22px;
  height: 22px;
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

.btn-icon {
  width: 14px;
  height: 14px;
  margin-right: 2px;
}
</style>