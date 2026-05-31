<script setup lang="ts">
import { inject } from 'vue'
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '~/stores/invoice'

const store = useInvoiceStore()
const { data } = storeToRefs(store)
const tDoc = inject<Function>('tDoc')!

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}
const calculateTotal = (items: any[]) => {
  return items.reduce((sum, item) => sum + (Number(item.qty || 0) * Number(item.rate || 0)), 0)
}
</script>

<template>
  <table class="items-table">
    <thead>
    <tr>
      <th class="th-desc">{{ tDoc('doc.items.description') }}</th>
      <th class="th-num">{{ tDoc('doc.items.qty') }}</th>
      <th class="th-num">{{ tDoc('doc.items.rate') }}</th>
      <th class="th-num">{{ tDoc('doc.items.amount') }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, i) in data.items" :key="i" class="item-row">
      <td class="td-desc">{{ item.description || '—' }}</td>
      <td class="td-num font-mono">{{ item.qty }}</td>
      <td class="td-num font-mono">{{ formatCurrency(item.rate, data.currency) }}</td>
      <td class="td-num td-amount font-mono">
        {{ formatCurrency(Number(item.qty) * Number(item.rate), data.currency) }}
      </td>
    </tr>
    </tbody>
    <tfoot>
    <tr class="total-row">
      <td colspan="3" class="total-label">{{ tDoc('doc.items.totalDue') }}</td>
      <td class="total-amount font-mono">
        {{ formatCurrency(calculateTotal(data.items), data.currency) }}
      </td>
    </tr>
    </tfoot>
  </table>
</template>

<style scoped>
.items-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;
}
.items-table th {
  padding: 10px 16px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: left;
}
.th-num { text-align: right !important; }
.item-row td {
  padding: 16px;
  font-size: 14px;
  color: #374151;
}
.td-desc { font-weight: 500; }
.td-num {
  text-align: right;
  color: #4b5563;
}
.td-amount {
  font-weight: 600;
  color: #111827;
}
.total-row td {
  padding: 24px 16px;
}
.total-label {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  color: #1f2937;
  text-align: right;
}
.total-amount {
  font-size: 24px;
  font-weight: 800;
  color: #111827;
  text-align: right;
}
.font-mono { font-family: monospace; }
</style>