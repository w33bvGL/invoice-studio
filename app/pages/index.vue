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
  Object.assign(invoiceData, json)
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
      <aside class="studio-panel studio-panel--left">
        <FormLeft :data="invoiceData" />
      </aside>

      <main class="studio-preview-area">
        <Preview :data="invoiceData" />
      </main>

      <aside class="studio-panel studio-panel--right">
        <FormRight :data="invoiceData" />
      </aside>
    </div>

    <Transition name="slide-up">
      <JsonPanel
          v-if="showJsonPanel"
          :data="invoiceData"
          @import="handleImportJson"
          @close="showJsonPanel = false"
      />
    </Transition>
  </div>
</template>

<style scoped>
.invoice-studio {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #0a0a0f;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
}

.studio-workspace {
  flex: 1;
  display: grid;
  grid-template-columns: 340px 1fr 340px;
  overflow: hidden;
  gap: 0;
}

.studio-panel {
  overflow-y: auto;
  background: #0f0f17;
  border-right: 1px solid rgba(255,255,255,0.06);
}

.studio-panel--right {
  border-right: none;
  border-left: 1px solid rgba(255,255,255,0.06);
}

.studio-preview-area {
  overflow-y: auto;
  background: #141420;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 24px;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>