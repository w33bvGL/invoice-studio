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
      <span class="item-index">{{ $t('right.data.items.itemIndex', { current: String(index + 1).padStart(2, '0') }) }}</span>
      <UiButton v-if="showRemove" variant="ghost" size="sm" class="btn-remove" @click="$emit('remove')">
        <Icon name="heroicons:x-mark" class="btn-icon" />
      </UiButton>
    </div>

    <UiInput v-model="item.description" :label="$t('right.data.items.description')" placeholder="Software Development..." />

    <div class="item-meta-row">
      <div class="field-qty">
        <UiInput v-model.number="item.qty" type="number" :label="$t('right.data.items.qty')" min="0" />
      </div>

      <div class="field-rate">
        <UiInput v-model.number="item.rate" type="number" step="0.01" :label="`${$t('right.data.items.rate')} (${currency})`" />
      </div>

      <div class="computed-field">
        <span class="computed-label">{{ $t('right.data.items.amount') }}</span>
        <div class="computed-value font-mono">
          {{ formatCurrency((item.qty || 0) * (item.rate || 0), currency) }}
        </div>
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

.btn-remove {
  width: 28px;
  height: 28px;
  padding: 0;
}

.btn-icon {
  width: 14px;
  height: 14px;
}

.item-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  align-items: flex-end;
}

.field-qty {
  flex: 1 1 80px;
}

.field-rate {
  flex: 2 1 120px;
}
.computed-field {
  flex: 2 1 120px;
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
  height: 38px;
  display: flex;
  align-items: center;
  font-size: var(--font-small);
  font-weight: var(--weight-semibold);
  color: var(--color-heading);
}
</style>