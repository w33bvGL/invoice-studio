<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '~/stores/invoice'

const store = useInvoiceStore()
const { data } = storeToRefs(store)
</script>

<template>
  <UiCard :title="$t('right.data.bank.title')" icon="heroicons:building-library">
    <div class="bank-fields-flow">
      <UiInput
          v-model="data.bankDetails.bankName"
          :label="$t('right.data.bank.bankName')"
          placeholder="Ameriabank OJSC"
      />

      <UiInput
          v-model="data.bankDetails.accountNo"
          :label="$t('right.data.bank.accountNo')"
          class="font-mono"
          placeholder="1570000012345"
      />

      <UiInput
          v-model="data.bankDetails.swift"
          :label="$t('right.data.bank.swift')"
          class="font-mono"
          placeholder="ARMIAM22"
      />

      <UiInput
          v-model="data.bankDetails.iban"
          :label="$t('right.data.bank.iban')"
          class="font-mono"
          placeholder="AM07 0000 1570 0000 1234 5678"
      />
    </div>
  </UiCard>
</template>

<style scoped>
.bank-fields-flow {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  width: 100%;
}
</style>