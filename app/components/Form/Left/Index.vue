<script setup lang="ts">
defineProps<{
  data: any
}>()
</script>

<template>
  <div class="panel-layout">
    <FormLeftInvoiceDocumentSection :model-value="data" />
    <FormLeftInvoiceContractorSection :model-value="data" />
    <FormLeftInvoiceClientSection :model-value="data" />
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