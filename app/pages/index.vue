<script setup lang="ts">
const showJsonPanel = ref(false)

const invoiceData = reactive({
  invoiceNo: '2026-001',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  contractor: {
    name: 'IE Vahe Sargsyan',
    regNo: '286.1571600',
    tin: '20218056',
    address: '28 I. Hakobyan st., Vosketap, Ararat reg., 0617, Armenia',
    email: 'w33bv.gl@gmail.com',
    phone: '',
    website: '',
  },
  client: {
    name: 'Tech Solutions LLC',
    address: '500 Innovation Way,\nBoston, MA, USA',
    email: 'finance@techsolutions.com',
    phone: '',
  },
  items: [
    { id: Date.now(), description: 'Software Development Services (May 2026)', qty: 1, rate: 3500.00 }
  ],
  currency: 'USD',
  notes: 'Payment due within 14 days of invoice date. Thank you for your business!',
  bankDetails: {
    bankName: '',
    accountNo: '',
    swift: '',
    iban: '',
  }
})

function handleImportJson(json: any) {
  if (json && typeof json === 'object') {
    Object.assign(invoiceData, json)
  }
}
</script>

<template>
  <div class="invoice-studio">
    <Toolbar
        :data="invoiceData"
        :showJsonPanel="showJsonPanel"
        @toggleJson="showJsonPanel = !showJsonPanel"
    />

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
    </div>

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
  .invoice-studio {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    background-color: var(--bg-body);
  }

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

  /* Печатные хаки — убираем всё лишнее при печати */
  @media print {
    .toolbar, .studio-sidebar {
      display: none !important;
    }
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