<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '~/stores/invoice'

const store = useInvoiceStore()
const { data } = storeToRefs(store)
</script>

<template>
  <UiCard :title="$t('left.contractor.title')" icon="heroicons:building-office" :badge="$t('left.contractor.badge')">
    <UiInput
        v-model="data.contractor.name"
        :label="$t('left.contractor.name')"
        placeholder="IE Vahe Sargsyan"
    />

    <div class="grid-2">
      <UiInput
          v-model="data.contractor.regNo"
          :label="$t('left.contractor.regNo')"
          class="font-mono"
          placeholder="286.1571600"
      />
      <UiInput
          v-model="data.contractor.tin"
          :label="$t('left.contractor.tin')"
          class="font-mono"
          placeholder="20218056"
      />
    </div>

    <UiTextArea
        v-model="data.contractor.address"
        :label="$t('left.contractor.address')"
        placeholder="Street, City, Country"
        :rows="2"
    />
    <UiInput
        v-model="data.contractor.email"
        type="email"
        :label="$t('left.contractor.email')"
        placeholder="you@example.com"
    />

    <div class="grid-2">
      <UiInput v-model="data.contractor.phone" :label="$t('left.contractor.phone')" placeholder="+374 ..." />
      <UiInput v-model="data.contractor.website" :label="$t('left.contractor.website')" placeholder="yoursite.com" />
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