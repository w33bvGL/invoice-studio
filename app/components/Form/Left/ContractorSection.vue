<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '~/stores/invoice'

const store = useInvoiceStore()
const { data } = storeToRefs(store)
</script>

<template>
  <UiCard :title="$t('invoice.contractor.title')" icon="heroicons:building-office" :badge="$t('invoice.contractor.badge')">
    <UiInput
        v-model="data.contractor.name"
        :label="$t('invoice.contractor.name')"
        placeholder="IE Vahe Sargsyan"
    />

    <div class="grid-2">
      <UiInput
          v-model="data.contractor.regNo"
          :label="$t('invoice.contractor.regNo')"
          class="font-mono"
          placeholder="286.1571600"
      />
      <UiInput
          v-model="data.contractor.tin"
          :label="$t('invoice.contractor.tin')"
          class="font-mono"
          placeholder="20218056"
      />
    </div>

    <UiTextArea
        v-model="data.contractor.address"
        :label="$t('invoice.contractor.address')"
        placeholder="Street, City, Country"
        :rows="2"
    />
    <UiInput
        v-model="data.contractor.email"
        type="email"
        :label="$t('invoice.contractor.email')"
        placeholder="you@example.com"
    />

    <div class="grid-2">
      <UiInput v-model="data.contractor.phone" :label="$t('invoice.contractor.phone')" placeholder="+374 ..." />
      <UiInput v-model="data.contractor.website" :label="$t('invoice.contractor.website')" placeholder="yoursite.com" />
    </div>
  </UiCard>
</template>

<style scoped>
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}
</style>