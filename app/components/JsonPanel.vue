<script setup lang="ts">
import { useInvoiceStore } from '~/stores/invoice'

const store = useInvoiceStore()

const mode = ref<'export' | 'import'>('export')
const importText = ref('')
const importError = ref('')
const copied = ref(false)

const exportJson = computed(() => JSON.stringify(store.data, null, 2))

async function copyJson() {
  try {
    await navigator.clipboard.writeText(exportJson.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {}
}

function handleImport() {
  importError.value = ''
  try {
    const parsed = JSON.parse(importText.value)
    store.importJson(parsed)
    importText.value = ''
    store.closeJsonPanel()
  } catch {
    importError.value = 'Invalid JSON structure. Verify commas and keys.'
  }
}

function handleDownload() {
  store.exportJsonFile()
}

// Сбрасываем режим при каждом открытии
watch(
    () => store.showJsonPanel,
    (open) => {
      if (open) {
        mode.value = 'export'
        importText.value = ''
        importError.value = ''
      }
    }
)
</script>

<template>
  <Teleport to="body">
    <Transition name="backdrop-fade">
      <div
          v-if="store.showJsonPanel"
          class="backdrop"
          @click="store.closeJsonPanel()"
      />
    </Transition>

    <Transition name="drawer-slide">
      <div v-if="store.showJsonPanel" class="drawer" role="dialog" aria-modal="true" aria-label="JSON Toolkit">
        <div class="drawer-header">
          <h4 class="drawer-title font-mono">JSON Toolkit</h4>

          <div class="tabs">
            <button :class="['tab-btn', { active: mode === 'export' }]" @click="mode = 'export'">Export</button>
            <button :class="['tab-btn', { active: mode === 'import' }]" @click="mode = 'import'">Import</button>
          </div>

          <UiButton variant="ghost" size="sm" @click="store.closeJsonPanel()">✕</UiButton>
        </div>

        <div class="drawer-body">
          <Transition name="tab-fade" mode="out-in">
            <div v-if="mode === 'export'" key="export" class="tab-content">
              <div class="actions-row">
                <span class="meta-info font-mono">invoice-{{ store.data.invoiceNo }}.json</span>
                <div class="btn-group">
                  <UiButton variant="ghost" size="sm" @click="handleDownload">
                    <Icon name="heroicons:arrow-down-tray" class="btn-icon" />
                    Download
                  </UiButton>
                  <UiButton variant="secondary" size="sm" @click="copyJson">
                    <Icon :name="copied ? 'heroicons:check' : 'heroicons:clipboard'" class="btn-icon" />
                    {{ copied ? 'Copied!' : 'Copy' }}
                  </UiButton>
                </div>
              </div>
              <pre class="code-view font-mono">{{ exportJson }}</pre>
            </div>

            <div v-else key="import" class="tab-content">
              <UiTextArea
                  v-model="importText"
                  placeholder="Paste your invoice JSON here..."
                  :rows="12"
                  class="font-mono"
              />

              <Transition name="error-fade">
                <div v-if="importError" class="error-box">{{ importError }}</div>
              </Transition>

              <div class="actions-row right">
                <UiButton
                    variant="primary"
                    :disabled="!importText.trim()"
                    @click="handleImport"
                >
                  Apply Data
                </UiButton>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── Backdrop ─────────────────────────────────── */
.backdrop {
  position: fixed;
  inset: 0;
  z-index: calc(var(--z-modal) - 1);
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
}

.backdrop-fade-enter-active,
.backdrop-fade-leave-active {
  transition: opacity 0.25s ease;
}
.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
  opacity: 0;
}

/* ── Drawer ───────────────────────────────────── */
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: var(--z-modal);
  width: 100%;
  max-width: 500px;
  background-color: var(--color-surface-overlay);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.08);
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}

/* ── Header ───────────────────────────────────── */
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-base);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.drawer-title {
  font-size: var(--font-small);
}

.tabs {
  display: flex;
  background-color: var(--bg-body);
  padding: 2px;
  border-radius: var(--radius-base);
  border: 1px solid var(--border-color);
}

.tab-btn {
  padding: 0.25rem 0.75rem;
  font-size: var(--font-xs);
  font-weight: var(--weight-medium);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  transition: background-color 0.15s ease, color 0.15s ease;
}

.tab-btn.active {
  background-color: var(--color-surface-overlay);
  color: var(--text-main);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* ── Body ─────────────────────────────────────── */
.drawer-body {
  flex: 1;
  padding: var(--space-base);
  overflow-y: auto;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  height: 100%;
}

/* Tab transition */
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ── Actions row ──────────────────────────────── */
.actions-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions-row.right {
  justify-content: flex-end;
}

.btn-group {
  display: flex;
  gap: var(--space-xs);
}

.btn-icon {
  width: 14px;
  height: 14px;
  margin-right: 2px;
}

.meta-info {
  font-size: var(--font-xs);
  color: var(--text-muted);
}

/* ── Code view ────────────────────────────────── */
.code-view {
  flex: 1;
  background-color: var(--bg-body);
  border: 1px solid var(--border-color);
  padding: var(--space-md);
  border-radius: var(--radius-base);
  font-size: var(--font-xs);
  overflow: auto;
  white-space: pre-wrap;
  color: var(--text-main);
  min-height: 0;
}

/* ── Error ────────────────────────────────────── */
.error-box {
  background-color: oklch(95% 0.05 20);
  border: 1px solid oklch(60% 0.15 20);
  color: oklch(40% 0.15 20);
  padding: var(--space-sm);
  border-radius: var(--radius-base);
  font-size: var(--font-xs);
}

.error-fade-enter-active,
.error-fade-leave-active {
  transition: opacity 0.2s ease, max-height 0.2s ease;
  overflow: hidden;
  max-height: 100px;
}
.error-fade-enter-from,
.error-fade-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>