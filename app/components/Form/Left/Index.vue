<template>
  <div class="panel-layout">
    <FormLeftDocumentSection />
    <FormLeftContractorSection />
    <FormLeftClientSection />
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