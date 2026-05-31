<script setup lang="ts">

const props = defineProps<{
  modelValue: any
}>()

const total = computed(() =>
    props.modelValue.items.reduce((s: number, i: any) => s + (Number(i.qty) || 0) * (Number(i.rate) || 0), 0)
)

const formatCurrency = (v: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: props.modelValue.currency || 'USD' }).format(v)

function addItem() {
  props.modelValue.items.push({ id: Date.now(), description: '', qty: 1, rate: 0 })
}

function removeItem(index: number) {
  if (props.modelValue.items.length > 1) props.modelValue.items.splice(index, 1)
}
</script>

<template>
  <UiCard :title="$t('invoice.items.title')" icon="heroicons:bolt">
    <div class="items-list">
      <UiItemCard
          v-for="(item, index) in modelValue.items"
          :key="item.id"
          :item="item"
          :index="index"
          :currency="modelValue.currency"
          :show-remove="modelValue.items.length > 1"
          @remove="removeItem(index)"
      />
    </div>

    <UiButton variant="secondary" class="w-full" @click="addItem">
      <Icon name="heroicons:plus" class="btn-add-icon" />
      {{ $t('invoice.items.addRow') }}
    </UiButton>

    <div class="total-row">
      <span class="total-label">{{ $t('invoice.items.totalDue') }}</span>
      <span class="total-value font-mono">{{ formatCurrency(total) }}</span>
    </div>
  </UiCard>
</template>

<style scoped>
.items-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.btn-add-icon {
  width: 14px;
  height: 14px;
  margin-right: 4px;
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
  font-weight: var(--weight-bold);
  color: var(--color-heading);
}

.w-full {
  width: 100%;
}
</style>