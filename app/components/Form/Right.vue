<script setup lang="ts">
const props = defineProps<{
  data: any
}>()

import { computed } from 'vue'

const total = computed(() =>
    props.data.items.reduce((s: number, i: any) => s + (Number(i.qty) || 0) * (Number(i.rate) || 0), 0)
)

const formatCurrency = (v: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: props.data.currency || 'USD' }).format(v)

function addItem() {
  props.data.items.push({ id: Date.now(), description: '', qty: 1, rate: 0 })
}

function removeItem(index: number) {
  if (props.data.items.length > 1) props.data.items.splice(index, 1)
}
</script>

<template>
  <div class="panel">
    <!-- Services / Line Items -->
    <section class="panel-section">
      <div class="section-header">
        <span class="section-icon">⚡</span>
        <h3 class="section-title">Line Items</h3>
      </div>

      <div class="items-list">
        <div v-for="(item, index) in data.items" :key="item.id" class="item-card">
          <div class="item-card__header">
            <span class="item-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <button v-if="data.items.length > 1" class="btn-remove" @click="removeItem(index)" title="Remove">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <div class="field">
            <label class="field-label">Description</label>
            <input
                v-model="item.description"
                class="field-input"
                placeholder="Software Development Services..."
            />
          </div>

          <div class="row-3">
            <div class="field">
              <label class="field-label">Qty</label>
              <input v-model.number="item.qty" type="number" min="0" step="1" class="field-input field-center" />
            </div>
            <div class="field">
              <label class="field-label">Rate ({{ data.currency }})</label>
              <input v-model.number="item.rate" type="number" min="0" step="0.01" class="field-input" />
            </div>
            <div class="field">
              <label class="field-label">Amount</label>
              <div class="field-computed">{{ formatCurrency((item.qty || 0) * (item.rate || 0)) }}</div>
            </div>
          </div>
        </div>
      </div>

      <button class="btn-add" @click="addItem">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        Add Line Item
      </button>

      <div class="total-row">
        <span class="total-label">Total Due</span>
        <span class="total-value">{{ formatCurrency(total) }}</span>
      </div>
    </section>

    <!-- Bank Details -->
    <section class="panel-section">
      <div class="section-header">
        <span class="section-icon">🏦</span>
        <h3 class="section-title">Bank Details</h3>
      </div>

      <div class="field">
        <label class="field-label">Bank Name</label>
        <input v-model="data.bankDetails.bankName" class="field-input" placeholder="Ameriabank OJSC" />
      </div>

      <div class="row-2">
        <div class="field">
          <label class="field-label">Account No</label>
          <input v-model="data.bankDetails.accountNo" class="field-input field-mono" placeholder="1570000012345" />
        </div>
        <div class="field">
          <label class="field-label">SWIFT / BIC</label>
          <input v-model="data.bankDetails.swift" class="field-input field-mono" placeholder="ARMIAM22" />
        </div>
      </div>

      <div class="field">
        <label class="field-label">IBAN</label>
        <input v-model="data.bankDetails.iban" class="field-input field-mono" placeholder="AM07 0000 0000 0000 0000 0000 00" />
      </div>
    </section>

    <!-- Notes -->
    <section class="panel-section">
      <div class="section-header">
        <span class="section-icon">📝</span>
        <h3 class="section-title">Notes</h3>
      </div>
      <div class="field">
        <textarea
            v-model="data.notes"
            class="field-input field-textarea"
            rows="3"
            placeholder="Payment terms, additional notes..."
        ></textarea>
      </div>
    </section>
  </div>
</template>

<style scoped>
.panel {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.panel-section {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.section-icon { font-size: 14px; }

.section-title {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.7);
  margin: 0;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: border-color 0.15s;
}

.item-card:hover {
  border-color: rgba(99,102,241,0.25);
}

.item-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-index {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: rgba(99,102,241,0.7);
  font-weight: 600;
}

.btn-remove {
  background: none;
  border: none;
  color: rgba(239,68,68,0.5);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: color 0.15s, background 0.15s;
}

.btn-remove:hover {
  color: #ef4444;
  background: rgba(239,68,68,0.1);
}

.row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.row-3 {
  display: grid;
  grid-template-columns: 60px 1fr 100px;
  gap: 10px;
  align-items: end;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: rgba(255,255,255,0.35);
}

.field-input {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 13px;
  color: rgba(255,255,255,0.85);
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  transition: border-color 0.15s, background 0.15s;
  outline: none;
}

.field-input:focus {
  border-color: rgba(99,102,241,0.6);
  background: rgba(99,102,241,0.06);
}

.field-input::placeholder {
  color: rgba(255,255,255,0.2);
}

.field-center {
  text-align: center;
}

.field-textarea {
  resize: vertical;
  min-height: 70px;
  line-height: 1.5;
}

.field-mono {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
}

.field-computed {
  background: rgba(99,102,241,0.08);
  border: 1px solid rgba(99,102,241,0.2);
  border-radius: 8px;
  padding: 9px 10px;
  font-size: 12px;
  color: #818cf8;
  font-weight: 600;
  font-family: 'DM Mono', monospace;
  white-space: nowrap;
}

.btn-add {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px;
  background: none;
  border: 1px dashed rgba(255,255,255,0.12);
  border-radius: 8px;
  color: rgba(255,255,255,0.4);
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s;
  letter-spacing: 0.3px;
}

.btn-add:hover {
  border-color: rgba(99,102,241,0.5);
  color: #818cf8;
  background: rgba(99,102,241,0.05);
}

.total-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(99,102,241,0.08);
  border: 1px solid rgba(99,102,241,0.2);
  border-radius: 10px;
  padding: 14px 16px;
  margin-top: 4px;
}

.total-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.5);
}

.total-value {
  font-family: 'DM Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  color: #818cf8;
  letter-spacing: -0.5px;
}
</style>