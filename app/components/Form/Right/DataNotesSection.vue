<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '~/stores/invoice'

const store = useInvoiceStore()
const { data } = storeToRefs(store)
</script>

<template>
  <UiCard :title="$t('right.data.notes.title')" icon="heroicons:document-text">
    <UiTextArea v-model="data.notes" :placeholder="$t('right.data.notes.placeholder')" :rows="3" />
  </UiCard>
</template>