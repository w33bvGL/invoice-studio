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
    <div class="toolbar__brand">
      <div class="brand-mark">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="1" y="1" width="20" height="20" rx="4" stroke="#6366f1" stroke-width="1.5"/>
          <path d="M6 7h10M6 11h7M6 15h5" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <span class="brand-name">INVOICELAB</span>
      <div class="brand-divider"></div>
      <span class="invoice-id">#{{ data.invoiceNo }}</span>
    </div>

    <div class="toolbar__actions">
      <button
          class="btn btn--ghost"
          :class="{ 'btn--active': showJsonPanel }"
          @click="emit('toggleJson')"
          title="JSON Import / Export"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M4 2L2 7l2 5M10 2l2 5-2 5M8 1.5l-2 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        JSON
      </button>

      <button class="btn btn--ghost" @click="exportJson(data)" title="Export JSON">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v8M4 6l3 3 3-3M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Export
      </button>

      <button class="btn btn--primary" @click="printInvoice" title="Save to PDF">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="2" y="4" width="10" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
          <path d="M4 4V2.5A.5.5 0 014.5 2h5a.5.5 0 01.5.5V4" stroke="currentColor" stroke-width="1.5"/>
          <path d="M4 10h6M4 7.5h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        Save PDF
      </button>
    </div>
  </header>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 56px;
  background: #0a0a0f;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  flex-shrink: 0;
  z-index: 100;
}

.toolbar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-name {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 2px;
}

.brand-divider {
  width: 1px;
  height: 16px;
  background: rgba(255,255,255,0.15);
}

.invoice-id {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  color: #6366f1;
  letter-spacing: 1px;
}

.toolbar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s ease;
  border: none;
  letter-spacing: 0.3px;
}

.btn--ghost {
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.6);
  border: 1px solid rgba(255,255,255,0.08);
}
.btn--ghost:hover {
  background: rgba(255,255,255,0.09);
  color: #fff;
}
.btn--ghost.btn--active {
  background: rgba(99,102,241,0.15);
  border-color: rgba(99,102,241,0.4);
  color: #818cf8;
}

.btn--primary {
  background: #6366f1;
  color: #fff;
}
.btn--primary:hover {
  background: #4f52d4;
}

@media print {
  .toolbar { display: none; }
}
</style>