<script setup lang="ts">
const { invoiceData, showJsonPanel, handleImportJson } = useInvoice()
</script>

<template>
  <div class="studio-workspace">
    <aside class="studio-sidebar side-left">
      <FormLeft/>
    </aside>

    <main class="studio-canvas">
      <Preview />
    </main>

    <aside class="studio-sidebar side-right">
      <FormRight/>
    </aside>

    <JsonPanel
        v-if="showJsonPanel"
        :data="invoiceData"
        @import="handleImportJson"
        @close="showJsonPanel = false"
    />
  </div>
</template>

<style scoped>
.studio-workspace {
  flex: 1;
  display: grid;
  grid-template-columns: 450px 1fr 450px;
  height: 100vh;
  overflow: hidden;
}

.studio-sidebar {
  overflow-y: auto;
  background-color: var(--bg-elevated);
  border-color: var(--border-color);
}

.side-left { border-right: 1px solid var(--border-color); }
.side-right { border-left: 1px solid var(--border-color); }

.studio-canvas {
  background-color: var(--bg-body);
  display: flex;
  overflow: hidden;
  flex-direction: column;
}

@media print {
  .studio-workspace { display: block !important; }
  .studio-canvas { overflow: visible !important; }
}
</style>