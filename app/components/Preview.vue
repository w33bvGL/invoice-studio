<script setup lang="ts">
import { useInvoiceStore } from '~/stores/invoice'

const store = useInvoiceStore()

const { data: themes } = await useFetch('/api/themes')

const currentThemeCss = computed(() => {
  const theme = themes.value?.find((t: any) => t.id === store.data.theme)
  return theme?.css || ''
})
</script>

<template>
  <component :is="'style'">
    {{ currentThemeCss }}
  </component>

  <div class="invoice-sheet" id="invoice-print" :class="`theme-${store.data.theme || 'default'}`">

    <div class="sheet-header">
      <div class="sheet-header__left">
        <h1 class="invoice-title">INVOICE</h1>
        <div class="contractor-tagline">{{ store.data.contractor.name }}</div>
      </div>
      <div class="sheet-header__right">
        <div class="meta-item">
          <span class="meta-key">Invoice No</span>
          <span class="meta-val font-mono">#{{ store.data.invoiceNo }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-key">Issue Date</span>
          <span class="meta-val">{{ formatDate(store.data.date) }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-key">Due Date</span>
          <span class="meta-val due">{{ formatDate(store.data.dueDate) }}</span>
        </div>
      </div>
    </div>

    <div class="sheet-rule"></div>

    <div class="parties-grid">
      <div class="party">
        <div class="party-label">From</div>
        <div class="party-name">{{ store.data.contractor.name }}</div>
        <div class="party-detail">{{ store.data.contractor.email }}</div>
        <div class="party-detail">{{ store.data.contractor.phone }}</div>
      </div>

      <div class="party party--right">
        <div class="party-label">Bill To</div>
        <div class="party-name">{{ store.data.client.name || '—' }}</div>
        <div class="party-detail">{{ store.data.client.email }}</div>
      </div>
    </div>

    <table class="items-table">
      <thead>
      <tr>
        <th class="th-desc">Description</th>
        <th class="th-num">Qty</th>
        <th class="th-num">Rate</th>
        <th class="th-num">Amount</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, i) in store.data.items" :key="i" class="item-row">
        <td class="td-desc">{{ item.description }}</td>
        <td class="td-num font-mono">{{ item.qty }}</td>
        <td class="td-num font-mono">{{ formatCurrency(item.rate, store.data.currency) }}</td>
        <td class="td-num td-amount font-mono">
          {{ formatCurrency(Number(item.qty) * Number(item.rate), store.data.currency) }}
        </td>
      </tr>
      </tbody>
      <tfoot>
      <tr class="total-row">
        <td colspan="3" class="total-label">Total Due</td>
        <td class="total-amount font-mono">
          {{ formatCurrency(calculateTotal(store.data.items), store.data.currency) }}
        </td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>
<style scoped>
.invoice-sheet {
  background-color: #ffffff;
  width: 210mm;
  min-height: 297mm;
  padding: 20mm;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--base-300);
  color: var(--base-950);
  font-family: var(--font-body-family),sans-serif;
  position: relative;
  text-align: left;
}

.dark .invoice-sheet {
  border-color: var(--base-800);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
}

.sheet-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-lg);
}

.invoice-title {
  font-size: 38px;
  font-weight: var(--weight-extrabold);
  color: var(--base-950);
  margin: 0 0 var(--space-xxs) 0;
  line-height: 1;
  letter-spacing: -1.5px;
}

.contractor-tagline {
  font-size: var(--font-small);
  color: var(--base-500);
  font-weight: var(--weight-medium);
}

.sheet-header__right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-xxs);
}

.meta-item {
  display: flex;
  align-items: baseline;
  gap: var(--space-md);
}

.meta-key {
  font-size: var(--font-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--base-400);
}

.meta-val {
  font-size: var(--font-body);
  font-weight: var(--weight-semibold);
  color: var(--base-900);
}

.meta-val.due {
  color: var(--base-950);
  font-weight: var(--weight-bold);
}

.sheet-rule {
  height: 1px;
  background-color: var(--base-950);
  margin-bottom: var(--space-lg);
}

.parties-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  margin-bottom: var(--space-xl);
}

.party-label {
  font-size: var(--font-xs);
  font-weight: var(--weight-extrabold);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--base-400);
  margin-bottom: var(--space-xs);
}

.party-name {
  font-size: var(--font-body-lg);
  font-weight: var(--weight-bold);
  color: var(--base-950);
  margin-bottom: var(--space-xxs);
}

.party-detail {
  font-size: var(--font-small);
  color: var(--base-600);
  line-height: 1.5;
}

.party-address {
  white-space: pre-line;
  margin: var(--space-xxs) 0;
}

.party-link {
  font-weight: var(--weight-medium);
}

.party--right {
  padding-left: var(--space-lg);
  border-left: 1px solid var(--base-200);
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: var(--space-lg);
}

.items-table th {
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--base-500);
  background-color: var(--base-50);
  border-bottom: 1px solid var(--base-300);
  border-top: 1px solid var(--base-300);
  text-align: left;
}

.th-num {
  text-align: right !important;
}

.item-row td {
  padding: var(--space-sm) var(--space-sm);
  border-bottom: 1px solid var(--base-100);
  font-size: var(--font-small);
  color: var(--base-900);
}

.td-desc {
  font-weight: var(--weight-medium);
}

.td-num {
  text-align: right;
  color: var(--base-700);
}

.td-amount {
  font-weight: var(--weight-semibold);
  color: var(--base-950);
}

.subtotal-row td {
  padding: var(--space-sm) var(--space-sm);
  font-size: var(--font-small);
  color: var(--base-500);
  border-bottom: 1px solid var(--base-200);
}

.sum-label {
  text-align: right;
  padding-right: var(--space-md);
}

.total-row td {
  padding: var(--space-md) var(--space-sm);
  border-bottom: 1px solid var(--base-950);
  border-top: 1px solid var(--base-200);
  background-color: var(--base-50);
}

.total-label {
  font-size: var(--font-small);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--base-800);
  text-align: right;
  padding-right: var(--space-md);
}

.total-amount {
  font-size: var(--font-h2);
  font-weight: var(--weight-extrabold);
  color: var(--base-950);
  text-align: right;
}

.bank-card {
  border: 1px solid var(--base-200);
  border-radius: var(--radius-base);
  padding: var(--space-md);
  margin-bottom: var(--space-md);
  background-color: var(--base-50);
}

.bank-card__title {
  font-size: var(--font-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--base-500);
  margin-bottom: var(--space-sm);
}

.bank-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xs);
}

.bank-item {
  display: flex;
  flex-direction: column;
}

.bank-key {
  font-size: var(--font-xs);
  font-weight: var(--weight-semibold);
  color: var(--base-400);
  text-transform: uppercase;
}

.bank-val {
  font-size: var(--font-small);
  color: var(--base-900);
  font-weight: var(--weight-medium);
}

.notes-block {
  margin-bottom: var(--space-lg);
}

.notes-label {
  font-size: var(--font-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--base-400);
  margin-bottom: var(--space-xxs);
}

.notes-text {
  font-size: var(--font-small);
  color: var(--base-600);
  line-height: 1.5;
  border-left: 1px solid var(--base-300);
  padding-left: var(--space-sm);
}

.signature-area {
  margin-top: auto;
  padding-top: var(--space-lg);
}

.sig-block {
  display: inline-block;
}

.sig-label {
  font-size: var(--font-xs);
  font-weight: var(--weight-semibold);
  color: var(--base-400);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--space-md);
}

.sig-line {
  width: 160px;
  height: 1px;
  background-color: var(--base-300);
  margin-bottom: var(--space-xxs);
}

.sig-name {
  font-size: var(--font-xs);
  color: var(--base-500);
  font-weight: var(--weight-medium);
}

.sheet-footer {
  border-top: 1px solid var(--base-100);
  padding-top: var(--space-sm);
  margin-top: var(--space-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-text {
  font-size: var(--font-xs);
  color: var(--base-400);
}

.footer-id {
  font-size: var(--font-xs);
  color: var(--base-300);
}

@media print {
  .invoice-sheet {
    width: 100%;
    min-height: auto;
    padding: 0;
    border: none !important;
    box-shadow: none !important;
  }
}
</style>