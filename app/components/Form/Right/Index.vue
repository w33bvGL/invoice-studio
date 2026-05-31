<script setup lang="ts">
defineProps<{
  data: any
}>()
</script>

<template>
  <div class="panel-layout">
    <FormRightInvoiceItemsSection :model-value="data" />
    <FormRightInvoiceBankSection :model-value="data" />
    <FormRightInvoiceNotesSection :model-value="data" />
  </div>
</template>

<style scoped>
.panel-layout {
  padding: var(--space-base);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
</style>