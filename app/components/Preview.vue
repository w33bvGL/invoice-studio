<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  data: any
}>()

const total = computed(() =>
    props.data.items.reduce((s: number, i: any) => s + (Number(i.qty) || 0) * (Number(i.rate) || 0), 0)
)

const formatCurrency = (v: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: props.data.currency || 'USD' }).format(v)

const formatDate = (d: string) => {
  if (!d) return '—'
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const hasBankDetails = computed(() =>
    props.data.bankDetails?.bankName ||
    props.data.bankDetails?.accountNo ||
    props.data.bankDetails?.swift ||
    props.data.bankDetails?.iban
)
</script>

<template>
  <div class="invoice-sheet" id="invoice-print">
    <!-- Header -->
    <div class="sheet-header">
      <div class="sheet-header__left">
        <h1 class="invoice-title">INVOICE</h1>
        <div class="contractor-tagline">{{ data.contractor.name }}</div>
      </div>
      <div class="sheet-header__right">
        <div class="meta-item">
          <span class="meta-key">Invoice No</span>
          <span class="meta-val">#{{ data.invoiceNo }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-key">Issue Date</span>
          <span class="meta-val">{{ formatDate(data.date) }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-key">Due Date</span>
          <span class="meta-val due">{{ formatDate(data.dueDate) }}</span>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="sheet-rule"></div>

    <!-- Parties -->
    <div class="parties-grid">
      <div class="party">
        <div class="party-label">From</div>
        <div class="party-name">{{ data.contractor.name }}</div>
        <div v-if="data.contractor.regNo || data.contractor.tin" class="party-detail">
          <span v-if="data.contractor.regNo">Reg No: {{ data.contractor.regNo }}</span>
          <span v-if="data.contractor.regNo && data.contractor.tin"> · </span>
          <span v-if="data.contractor.tin">TIN: {{ data.contractor.tin }}</span>
        </div>
        <div v-if="data.contractor.address" class="party-detail party-address">{{ data.contractor.address }}</div>
        <div v-if="data.contractor.email" class="party-detail">{{ data.contractor.email }}</div>
        <div v-if="data.contractor.phone" class="party-detail">{{ data.contractor.phone }}</div>
        <div v-if="data.contractor.website" class="party-detail party-link">{{ data.contractor.website }}</div>
      </div>

      <div class="party party--right">
        <div class="party-label">Bill To</div>
        <div class="party-name">{{ data.client.name || '—' }}</div>
        <div v-if="data.client.address" class="party-detail party-address">{{ data.client.address }}</div>
        <div v-if="data.client.email" class="party-detail">{{ data.client.email }}</div>
        <div v-if="data.client.phone" class="party-detail">{{ data.client.phone }}</div>
      </div>
    </div>

    <!-- Line Items Table -->
    <table class="items-table">
      <thead>
      <tr>
        <th class="th-desc">Description of Services</th>
        <th class="th-num">Qty</th>
        <th class="th-num">Rate</th>
        <th class="th-num">Amount</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, i) in data.items" :key="item.id || i" class="item-row">
        <td class="td-desc">{{ item.description || '—' }}</td>
        <td class="td-num">{{ item.qty }}</td>
        <td class="td-num">{{ formatCurrency(item.rate) }}</td>
        <td class="td-num td-amount">{{ formatCurrency((item.qty || 0) * (item.rate || 0)) }}</td>
      </tr>
      </tbody>
      <tfoot>
      <tr class="subtotal-row">
        <td colspan="3" class="sum-label">Subtotal</td>
        <td class="td-num">{{ formatCurrency(total) }}</td>
      </tr>
      <tr class="total-row">
        <td colspan="3" class="total-label">Total Due</td>
        <td class="total-amount">{{ formatCurrency(total) }} {{ data.currency }}</td>
      </tr>
      </tfoot>
    </table>

    <!-- Bank Details -->
    <div v-if="hasBankDetails" class="bank-card">
      <div class="bank-card__title">Payment Details</div>
      <div class="bank-grid">
        <div v-if="data.bankDetails.bankName" class="bank-item">
          <span class="bank-key">Bank</span>
          <span class="bank-val">{{ data.bankDetails.bankName }}</span>
        </div>
        <div v-if="data.bankDetails.accountNo" class="bank-item">
          <span class="bank-key">Account</span>
          <span class="bank-val mono">{{ data.bankDetails.accountNo }}</span>
        </div>
        <div v-if="data.bankDetails.swift" class="bank-item">
          <span class="bank-key">SWIFT</span>
          <span class="bank-val mono">{{ data.bankDetails.swift }}</span>
        </div>
        <div v-if="data.bankDetails.iban" class="bank-item">
          <span class="bank-key">IBAN</span>
          <span class="bank-val mono">{{ data.bankDetails.iban }}</span>
        </div>
      </div>
    </div>

    <!-- Notes -->
    <div v-if="data.notes" class="notes-block">
      <div class="notes-label">Notes</div>
      <div class="notes-text">{{ data.notes }}</div>
    </div>

    <!-- Signature -->
    <div class="signature-area">
      <div class="sig-block">
        <div class="sig-label">Authorized Signature</div>
        <div class="sig-line"></div>
        <div class="sig-name">{{ data.contractor.name }}</div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="sheet-footer">
      <div class="footer-text">Thank you for your business!</div>
      <div class="footer-id">#{{ data.invoiceNo }}</div>
    </footer>
  </div>
</template>

<style scoped>
.invoice-sheet {
  background: #ffffff;
  width: 210mm;
  min-height: 297mm;
  padding: 18mm 20mm;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.06), 0 20px 60px rgba(0,0,0,0.3);
  border-radius: 2px;
  color: #111827;
  font-family: 'DM Sans', 'Helvetica Neue', Arial, sans-serif;
}

/* Header */
.sheet-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.invoice-title {
  font-size: 42px;
  font-weight: 800;
  letter-spacing: -2px;
  color: #0a0a0f;
  margin: 0 0 4px 0;
  line-height: 1;
}

.contractor-tagline {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
}

.sheet-header__right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.meta-item {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.meta-key {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #9ca3af;
}

.meta-val {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
}

.meta-val.due {
  color: #6366f1;
}

.sheet-rule {
  height: 2px;
  background: linear-gradient(90deg, #6366f1 0%, #a78bfa 50%, transparent 100%);
  margin-bottom: 28px;
  border-radius: 2px;
}

/* Parties */
.parties-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 36px;
}

.party-label {
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #9ca3af;
  margin-bottom: 8px;
}

.party-name {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}

.party-detail {
  font-size: 12px;
  color: #4b5563;
  line-height: 1.6;
}

.party-address {
  white-space: pre-line;
}

.party-link {
  color: #6366f1;
}

.party--right {
  padding-left: 20px;
  border-left: 2px solid #f3f4f6;
}

/* Table */
.items-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 28px;
}

.items-table th {
  padding: 10px 12px;
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #6b7280;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  border-top: 1px solid #e5e7eb;
  text-align: left;
}

.th-num { text-align: right; }

.item-row td {
  padding: 13px 12px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 13px;
  color: #1f2937;
}

.td-desc { font-weight: 500; }
.td-num { text-align: right; color: #374151; }
.td-amount { font-weight: 600; }

.subtotal-row td {
  padding: 12px 12px;
  font-size: 12px;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
}

.sum-label { text-align: right; padding-right: 16px; }

.subtotal-row td:last-child,
.sum-label { text-align: right; }

.total-row td {
  padding: 14px 12px;
  border-bottom: 2px solid #0a0a0f;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

.total-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #374151;
  text-align: right;
  padding-right: 16px;
}

.total-amount {
  font-size: 18px;
  font-weight: 800;
  color: #0a0a0f;
  text-align: right;
  letter-spacing: -0.5px;
}

/* Bank */
.bank-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  background: #fafafa;
}

.bank-card__title {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #6b7280;
  margin-bottom: 12px;
}

.bank-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.bank-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.bank-key {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #9ca3af;
}

.bank-val {
  font-size: 12px;
  color: #1f2937;
  font-weight: 500;
}

.bank-val.mono {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
}

/* Notes */
.notes-block {
  margin-bottom: 28px;
}

.notes-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #9ca3af;
  margin-bottom: 6px;
}

.notes-text {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.6;
  border-left: 2px solid #e5e7eb;
  padding-left: 12px;
}

/* Signature */
.signature-area {
  margin-top: auto;
  padding-top: 20px;
}

.sig-block {
  display: inline-block;
}

.sig-label {
  font-size: 10px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 8px;
}

.sig-line {
  width: 180px;
  height: 1px;
  background: #d1d5db;
  margin-bottom: 6px;
}

.sig-name {
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
}

/* Footer */
.sheet-footer {
  border-top: 1px solid #f3f4f6;
  padding-top: 14px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-text {
  font-size: 11px;
  color: #9ca3af;
}

.footer-id {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  color: #d1d5db;
}

/* Print */
@media print {
  .invoice-sheet {
    width: 100%;
    min-height: auto;
    padding: 15mm;
    box-shadow: none;
    border-radius: 0;
  }
}
</style>