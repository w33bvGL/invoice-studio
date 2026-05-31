<script setup lang="ts">
const { invoiceData, showJsonPanel, handleImportJson } = useInvoice()
</script>

<template>
  <div class="studio-workspace">
    <aside class="studio-sidebar side-left">
      <FormLeft :data="invoiceData" />
    </aside>

    <main class="studio-canvas">
      <div class="preview-scroll-container">
        <Preview :data="invoiceData" />
      </div>
    </main>

    <aside class="studio-sidebar side-right">
      <FormRight :data="invoiceData" />
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
@layer components {
  .studio-workspace {
    flex: 1;
    display: grid;
    grid-template-columns: 350px 1fr 350px;
    overflow: hidden;
  }

  .studio-sidebar {
    overflow-y: auto;
    background-color: var(--bg-elevated);
    border-color: var(--border-color);
  }

  .side-left {
    border-right: 1px solid var(--border-color);
  }

  .side-right {
    border-left: 1px solid var(--border-color);
  }

  .studio-canvas {
    overflow-y: auto;
    background-color: var(--bg-body);
    display: flex;
    justify-content: center;
    padding: var(--space-xl) var(--space-md);
  }

  .preview-scroll-container {
    width: 100%;
    max-width: var(--container-width);
    display: flex;
    justify-content: center;
  }

  @media print {
    .studio-workspace {
      display: block !important;
    }
    .studio-canvas {
      padding: 0 !important;
      overflow: visible !important;
    }
  }
}
</style>