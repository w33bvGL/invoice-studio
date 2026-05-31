<script setup lang="ts">
const props = defineProps<{
  data: any
}>()

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
  <div class="panel-layout">
    <section class="panel-section">
      <div class="section-header">
        <span class="section-icon">⚡</span>
        <h3 class="section-title">Line Items</h3>
      </div>

      <div class="items-list">
        <div v-for="(item, index) in data.items" :key="item.id" class="item-card">
          <div class="item-card-header">
            <span class="item-index">Item #{{ String(index + 1).padStart(2, '0') }}</span>
            <UiButton v-if="data.items.length > 1" variant="ghost" size="sm" class="btn-remove" @click="removeItem(index)">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </UiButton>
          </div>

          <UiInput v-model="item.description" label="Description" placeholder="Software Development..." />

          <div class="grid-3">
            <UiInput v-model.number="item.qty" type="number" label="Qty" min="0" />
            <UiInput v-model.number="item.rate" type="number" step="0.01" :label="`Rate (${data.currency})`" />

            <div class="computed-field">
              <span class="computed-label">Amount</span>
              <div class="computed-value font-mono">{{ formatCurrency((item.qty || 0) * (item.rate || 0)) }}</div>
            </div>
          </div>
        </div>
      </div>

      <UiButton variant="secondary" class="w-full" @click="addItem">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style="margin-right: 4px;">
          <path d="M7 2v10M2 7h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        Add Row
      </UiButton>

      <div class="total-row">
        <span class="total-label">Total Due:</span>
        <span class="total-value font-mono">{{ formatCurrency(total) }}</span>
      </div>
    </section>

    <section class="panel-section">
      <div class="section-header">
        <span class="section-icon">🏦</span>
        <h3 class="section-title">Bank Details</h3>
      </div>

      <UiInput v-model="data.bankDetails.bankName" label="Bank Name" placeholder="Ameriabank OJSC" />

      <div class="grid-2">
        <UiInput v-model="data.bankDetails.accountNo" label="Account No" class="font-mono" placeholder="1570000012345" />
        <UiInput v-model="data.bankDetails.swift" label="SWIFT / BIC" class="font-mono" placeholder="ARMIAM22" />
      </div>

      <UiInput v-model="data.bankDetails.iban" label="IBAN" class="font-mono" placeholder="AM07 0000..." />
    </section>

    <section class="panel-section">
      <div class="section-header">
        <span class="section-icon">📝</span>
        <h3 class="section-title">Terms & Notes</h3>
      </div>
      <UiTextArea v-model="data.notes" placeholder="Payment terms, additional corporate notes..." :rows="3" />
    </section>
  </div>
</template>

<style scoped>
  .panel-layout {
    padding: var(--space-base);
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .panel-section {
    background-color: var(--bg-elevated);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--space-base);
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    border-bottom: 1px solid var(--border-color);
    padding-bottom: var(--space-xs);
  }

  .section-title {
    font-size: var(--font-small);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .items-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .item-card {
    background-color: var(--bg-body);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-base);
    padding: var(--space-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .item-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .item-index {
    font-size: var(--font-xs);
    font-weight: var(--weight-bold);
    color: var(--text-muted);
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-sm);
  }

  .grid-3 {
    display: grid;
    grid-template-columns: 70px 1fr 1fr;
    gap: var(--space-sm);
    align-items: flex-start;
  }

  .computed-field {
    display: flex;
    flex-direction: column;
    gap: var(--space-xxs);
  }

  .computed-label {
    font-size: var(--font-xs);
    font-weight: var(--weight-semibold);
    color: var(--text-muted);
    text-transform: uppercase;
  }

  .computed-value {
    padding: 0.5rem 0;
    font-size: var(--font-small);
    font-weight: var(--weight-semibold);
    color: var(--color-heading);
  }

  .total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--border-color);
    padding-top: var(--space-md);
    margin-top: var(--space-xxs);
  }

  .total-label {
    font-weight: var(--weight-semibold);
    font-size: var(--font-body);
  }

  .total-value {
    font-size: var(--font-h2);
    font-weight: var(--weight-bold);
    color: var(--color-heading);
  }

  .w-full {
    width: 100%;
  }
</style>