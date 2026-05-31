<script setup lang="ts">
const props = defineProps<{
  data: any
}>()

const emit = defineEmits(['import', 'close'])

const mode = ref<'export' | 'import'>('export')
const importText = ref('')
const importError = ref('')
const copied = ref(false)

const exportJson = computed(() => JSON.stringify(props.data, null, 2))

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
    emit('import', parsed)
    importText.value = ''
    emit('close')
  } catch (e) {
    importError.value = 'Invalid JSON structure. Verify commas and keys.'
  }
}
</script>

<template>
  <div class="json-panel">
    <div class="backdrop" @click="$emit('close')"></div>
    <div class="drawer">
      <div class="drawer-header">
        <h4 class="drawer-title font-mono">JSON Toolkit</h4>

        <div class="tabs">
          <button :class="['tab-btn', { active: mode === 'export' }]" @click="mode = 'export'">Export</button>
          <button :class="['tab-btn', { active: mode === 'import' }]" @click="mode = 'import'">Import</button>
        </div>

        <UiButton variant="ghost" size="sm" @click="$emit('close')">✕</UiButton>
      </div>

      <div class="drawer-body">
        <div v-if="mode === 'export'" class="tab-content">
          <div class="actions-row">
            <span class="meta-info font-mono">invoice-schema.json</span>
            <UiButton variant="secondary" size="sm" @click="copyJson">
              {{ copied ? 'Copied' : 'Copy Object' }}
            </UiButton>
          </div>
          <pre class="code-view font-mono">{{ exportJson }}</pre>
        </div>

        <div v-else class="tab-content">
          <UiTextArea v-model="importText" placeholder='Paste your explicit invoice JSON string object here...' :rows="12" class="font-mono" />
          <div v-if="importError" class="error-box">{{ importError }}</div>

          <div class="actions-row right">
            <UiButton variant="primary" :disabled="!importText.trim()" @click="handleImport">
              Apply Data
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .json-panel {
    position: fixed;
    inset: 0;
    z-index: var(--z-modal);
    display: flex;
    justify-content: flex-end;
  }

  .backdrop {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .drawer {
    position: relative;
    width: 100%;
    max-width: 500px;
    height: 100%;
    background-color: var(--color-surface-overlay);
    border-left: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.05);
  }

  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-base);
    border-bottom: 1px solid var(--border-color);
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
  }

  .tab-btn.active {
    background-color: var(--color-surface-overlay);
    color: var(--text-main);
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

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

  .actions-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .actions-row.right {
    justify-content: flex-end;
  }

  .meta-info {
    font-size: var(--font-xs);
    color: var(--text-muted);
  }

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
  }

  .error-box {
    background-color: oklch(95% 0.05 20);
    border: 1px solid oklch(60% 0.15 20);
    color: oklch(40% 0.15 20);
    padding: var(--space-sm);
    border-radius: var(--radius-base);
    font-size: var(--font-xs);
  }
</style>