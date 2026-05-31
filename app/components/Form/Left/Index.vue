<template>
  <div class="panel-layout">
    <FormLeftInvoiceDocumentSection />
    <FormLeftInvoiceContractorSection />
    <FormLeftInvoiceClientSection />
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