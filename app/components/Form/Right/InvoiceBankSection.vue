<script setup lang="ts">
defineProps<{
  modelValue: any
}>()
</script>

<template>
  <UiCard :title="$t('invoice.bank.title')" icon="heroicons:building-library">
    <div class="bank-fields-flow">
      <UiInput
          v-model="modelValue.bankDetails.bankName"
          :label="$t('invoice.bank.bankName')"
          placeholder="Ameriabank OJSC"
      />

      <UiInput
          v-model="modelValue.bankDetails.accountNo"
          :label="$t('invoice.bank.accountNo')"
          class="font-mono"
          placeholder="1570000012345"
      />

      <UiInput
          v-model="modelValue.bankDetails.swift"
          :label="$t('invoice.bank.swift')"
          class="font-mono"
          placeholder="ARMIAM22"
      />

      <UiInput
          v-model="modelValue.bankDetails.iban"
          :label="$t('invoice.bank.iban')"
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