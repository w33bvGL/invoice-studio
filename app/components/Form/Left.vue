<script setup lang="ts">
defineProps<{
  data: any
}>()

const currencyOptions = ['USD', 'EUR', 'GBP', 'AMD', 'RUB']
</script>

<template>
  <div class="panel-layout">
    <section class="panel-section">
      <div class="section-header">
        <span class="section-icon">📄</span>
        <h3 class="section-title">Document</h3>
      </div>

      <div class="grid-2">
        <UiInput v-model="data.invoiceNo" label="Invoice No" placeholder="2026-001" />
        <UiSelect v-model="data.currency" label="Currency" :options="currencyOptions" />
      </div>

      <div class="grid-2">
        <UiInput v-model="data.date" type="date" label="Issue Date" />
        <UiInput v-model="data.dueDate" type="date" label="Due Date" />
      </div>
    </section>

    <section class="panel-section">
      <div class="section-header">
        <span class="section-icon">🏢</span>
        <h3 class="section-title">From (Contractor)</h3>
        <span class="badge">You</span>
      </div>

      <UiInput v-model="data.contractor.name" label="Company / Name" placeholder="IE Vahe Sargsyan" />

      <div class="grid-2">
        <UiInput v-model="data.contractor.regNo" label="Reg No" class="font-mono" placeholder="286.1571600" />
        <UiInput v-model="data.contractor.tin" label="TIN" class="font-mono" placeholder="20218056" />
      </div>

      <UiTextArea v-model="data.contractor.address" label="Legal Address" placeholder="Street, City, Country" :rows="2" />
      <UiInput v-model="data.contractor.email" type="email" label="Email" placeholder="you@example.com" />

      <div class="grid-2">
        <UiInput v-model="data.contractor.phone" label="Phone" placeholder="+374 ..." />
        <UiInput v-model="data.contractor.website" label="Website" placeholder="yoursite.com" />
      </div>
    </section>

    <section class="panel-section">
      <div class="section-header">
        <span class="section-icon">👤</span>
        <h3 class="section-title">To (Client)</h3>
      </div>

      <UiInput v-model="data.client.name" label="Company / Name" placeholder="Tech Solutions LLC" />
      <UiTextArea v-model="data.client.address" label="Legal Address" placeholder="500 Innovation Way, Boston, MA" :rows="2" />

      <div class="grid-2">
        <UiInput v-model="data.client.email" type="email" label="Email" placeholder="finance@client.com" />
        <UiInput v-model="data.client.phone" label="Phone" placeholder="+1 ..." />
      </div>
    </section>
  </div>
</template>

<style scoped>
@layer components {
  .panel-layout {
    padding: var(--space-base);
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .panel-section {
    background-color: var(--bg-elevated);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--space-base);
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    border-bottom: 1px solid var(--border-color);
    padding-bottom: var(--space-xs);
    margin-bottom: var(--space-xxs);
  }

  .section-title {
    font-size: var(--font-small);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    flex: 1;
  }

  .badge {
    font-size: var(--font-xs);
    font-weight: var(--weight-bold);
    background-color: var(--color-primary-subtle);
    color: var(--color-primary);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md);
  }
}
</style>