<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '~/stores/invoice'

const store = useInvoiceStore()
const { data } = storeToRefs(store)
</script>

<template>
  <UiCard :title="$t('left.client.title')" icon="heroicons:user">
    <UiInput
        v-model="data.client.name"
        :label="$t('left.client.name')"
        placeholder="Tech Solutions LLC"
    />
    <UiTextArea
        v-model="data.client.address"
        :label="$t('left.client.address')"
        placeholder="500 Innovation Way, Boston, MA"
        :rows="2"
    />

    <div class="grid-2">
      <UiInput v-model="data.client.email" type="email" :label="$t('left.client.email')" placeholder="finance@client.com" />
      <UiInput v-model="data.client.phone" :label="$t('left.client.phone')" placeholder="+1 ..." />
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