<script setup lang="ts">
import { ref, computed, watch } from 'vue'

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
    setTimeout(() => (copied.value = false), 1800)
  } catch {}
}

function downloadJson() {
  const blob = new Blob([exportJson.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `invoice-${props.data.invoiceNo}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function handleImport() {
  importError.value = ''
  try {
    const parsed = JSON.parse(importText.value)
    emit('import', parsed)
    importText.value = ''
    emit('close')
  } catch (e) {
    importError.value = 'Invalid JSON. Please check the format and try again.'
  }
}

function handleFileUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    importText.value = ev.target?.result as string
  }
  reader.readAsText(file)
}

// Example schema for reference
const exampleJson = computed(() => JSON.stringify({
  invoiceNo: '2026-001',
  date: '2026-05-31',
  dueDate: '2026-06-14',
  currency: 'USD',
  contractor: {
    name: 'IE Vahe Sargsyan',
    regNo: '286.1571600',
    tin: '20218056',
    address: '28 I. Hakobyan st., Vosketap, Ararat reg., 0617, Armenia',
    email: 'w33bv.gl@gmail.com',
    phone: '+374 XX XXX XXX',
    website: '',
  },
  client: {
    name: 'Client Company LLC',
    address: '123 Main St, City, Country',
    email: 'finance@client.com',
    phone: '',
  },
  items: [
    { id: 1, description: 'Software Development Services', qty: 1, rate: 3500 }
  ],
  bankDetails: {
    bankName: 'Ameriabank OJSC',
    accountNo: '1570000012345',
    swift: 'ARMIAM22',
    iban: '',
  },
  notes: 'Payment due within 14 days.',
}, null, 2))
</script>

<template>
  <div class="json-panel">
    <div class="json-panel__backdrop" @click="$emit('close')"></div>

    <div class="json-panel__drawer">
      <!-- Header -->
      <div class="drawer-header">
        <div class="drawer-title">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4.5 2L2 8l2.5 6M11.5 2L14 8l-2.5 6M9.5 1.5l-3 13" stroke="#818cf8" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          JSON Toolkit
        </div>

        <div class="drawer-tabs">
          <button :class="['tab', { active: mode === 'export' }]" @click="mode = 'export'">Export</button>
          <button :class="['tab', { active: mode === 'import' }]" @click="mode = 'import'">Import</button>
        </div>

        <button class="btn-close" @click="$emit('close')">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Export Mode -->
      <div v-if="mode === 'export'" class="drawer-body">
        <div class="drawer-description">
          Copy or download the current invoice data as JSON. Use it to save templates, share with your workflow, or re-import later.
        </div>

        <div class="code-block">
          <div class="code-block__header">
            <span class="code-filename">invoice-{{ data.invoiceNo }}.json</span>
            <div class="code-actions">
              <button class="code-btn" @click="copyJson">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="1" y="4" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
                  <path d="M4 4V2.5A1.5 1.5 0 015.5 1H11a1.5 1.5 0 011.5 1.5V8A1.5 1.5 0 0111 9.5H9.5" stroke="currentColor" stroke-width="1.2"/>
                </svg>
                {{ copied ? 'Copied!' : 'Copy' }}
              </button>
              <button class="code-btn" @click="downloadJson">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 1v8M4 7l2.5 2L9 7M1 11h11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Download
              </button>
            </div>
          </div>
          <pre class="code-pre">{{ exportJson }}</pre>
        </div>
      </div>

      <!-- Import Mode -->
      <div v-if="mode === 'import'" class="drawer-body">
        <div class="drawer-description">
          Paste a JSON object below to populate the invoice form instantly. You can also upload a <code>.json</code> file.
        </div>

        <div class="import-actions">
          <label class="upload-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 10V2M4 5l3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1 11v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            Upload .json file
            <input type="file" accept=".json,application/json" @change="handleFileUpload" class="visually-hidden" />
          </label>
        </div>

        <div class="field">
          <label class="field-label">Paste JSON here</label>
          <textarea
              v-model="importText"
              class="json-textarea"
              rows="14"
              placeholder='{ "invoiceNo": "2026-001", ... }'
              spellcheck="false"
          ></textarea>
          <div v-if="importError" class="import-error">{{ importError }}</div>
        </div>

        <div class="import-footer">
          <details class="schema-hint">
            <summary>View expected JSON schema</summary>
            <pre class="code-pre code-pre--sm">{{ exampleJson }}</pre>
          </details>

          <button
              class="btn-import"
              :disabled="!importText.trim()"
              @click="handleImport"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Apply to Invoice
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.json-panel {
  position: fixed;
  inset: 0;
  z-index: 500;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.json-panel__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
}

.json-panel__drawer {
  position: relative;
  width: 100%;
  max-width: 860px;
  background: #13131f;
  border: 1px solid rgba(255,255,255,0.08);
  border-bottom: none;
  border-radius: 16px 16px 0 0;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.drawer-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  flex-shrink: 0;
}

.drawer-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  flex: 1;
  letter-spacing: -0.2px;
}

.drawer-tabs {
  display: flex;
  background: rgba(255,255,255,0.05);
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
}

.tab {
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  border: none;
  background: none;
  color: rgba(255,255,255,0.4);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.tab.active {
  background: rgba(99,102,241,0.25);
  color: #818cf8;
}

.btn-close {
  background: none;
  border: none;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: color 0.15s, background 0.15s;
}

.btn-close:hover {
  color: #fff;
  background: rgba(255,255,255,0.06);
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.drawer-description {
  font-size: 13px;
  color: rgba(255,255,255,0.45);
  line-height: 1.6;
}

.drawer-description code {
  background: rgba(255,255,255,0.07);
  padding: 1px 5px;
  border-radius: 4px;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  color: #a5b4fc;
}

/* Code block */
.code-block {
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 10px;
  overflow: hidden;
}

.code-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255,255,255,0.04);
  padding: 10px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.code-filename {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: rgba(255,255,255,0.35);
}

.code-actions {
  display: flex;
  gap: 8px;
}

.code-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.09);
  color: rgba(255,255,255,0.6);
  padding: 5px 10px;
  font-size: 11px;
  font-weight: 600;
  font-family: inherit;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.code-btn:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

.code-pre {
  background: #0d0d18;
  padding: 16px;
  font-family: 'DM Mono', monospace;
  font-size: 11.5px;
  line-height: 1.7;
  color: #a5b4fc;
  overflow-x: auto;
  margin: 0;
  max-height: 320px;
  overflow-y: auto;
}

.code-pre--sm {
  font-size: 10.5px;
  max-height: 200px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.07);
  margin-top: 10px;
}

/* Import */
.import-actions {
  display: flex;
  gap: 10px;
}

.upload-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.09);
  color: rgba(255,255,255,0.6);
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}

.upload-btn:hover {
  background: rgba(255,255,255,0.09);
  color: #fff;
}

.visually-hidden {
  display: none;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.35);
}

.json-textarea {
  background: #0d0d18;
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 10px;
  padding: 14px 16px;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  line-height: 1.7;
  color: #a5b4fc;
  resize: vertical;
  min-height: 200px;
  outline: none;
  transition: border-color 0.15s;
}

.json-textarea:focus {
  border-color: rgba(99,102,241,0.5);
}

.json-textarea::placeholder {
  color: rgba(255,255,255,0.15);
}

.import-error {
  font-size: 12px;
  color: #f87171;
  padding: 8px 12px;
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.2);
  border-radius: 6px;
}

.import-footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.schema-hint {
  flex: 1;
}

.schema-hint summary {
  font-size: 12px;
  color: rgba(255,255,255,0.35);
  cursor: pointer;
  user-select: none;
  transition: color 0.15s;
}

.schema-hint summary:hover {
  color: rgba(255,255,255,0.6);
}

.btn-import {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #6366f1;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
}

.btn-import:hover:not(:disabled) {
  background: #4f52d4;
}

.btn-import:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
</style>