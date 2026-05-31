<script setup lang="ts">
interface Item {
  id: number
  description: string
  qty: number
  rate: number
}

defineProps<{
  item: Item
  index: number
  currency: string
  showRemove: boolean
}>()

defineEmits<{
  (e: 'remove'): void
}>()

const formatCurrency = (v: number, currency: string) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(v)
</script>

<template>
  <div class="item-card">
    <div class="item-card-header">
      <span class="item-index">{{ $t('invoice.items.itemIndex', { current: String(index + 1).padStart(2, '0') }) }}</span>
      <UiButton v-if="showRemove" variant="ghost" size="sm" class="btn-remove" @click="$emit('remove')">
        <Icon name="heroicons:x-mark" class="btn-icon" />
      </UiButton>
    </div>

    <UiInput v-model="item.description" :label="$t('invoice.items.description')" placeholder="Software Development..." />

    <div class="grid-3">
      <UiInput v-model.number="item.qty" type="number" :label="$t('invoice.items.qty')" min="0" />
      <UiInput v-model.number="item.rate" type="number" step="0.01" :label="`${$t('invoice.items.rate')} (${currency})`" />

      <div class="computed-field">
        <span class="computed-label">{{ $t('invoice.items.amount') }}</span>
        <div class="computed-value font-mono">{{ formatCurrency((item.qty || 0) * (item.rate || 0), currency) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.btn-icon {
  width: 14px;
  height: 14px;
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
</style>