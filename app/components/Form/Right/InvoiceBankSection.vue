<script setup lang="ts">
defineProps<{
  modelValue: any
}>()
</script>

<template>
  <UiCard :title="$t('invoice.bank.title')" icon="heroicons:building-library">
    <UiInput
        v-model="modelValue.bankDetails.bankName"
        :label="$t('invoice.bank.bankName')"
        placeholder="Ameriabank OJSC"
    />

    <div class="grid-2">
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
    </div>

    <UiInput
        v-model="modelValue.bankDetails.iban"
        :label="$t('invoice.bank.iban')"
        class="font-mono"
        placeholder="AM07 0000..."
    />
  </UiCard>
</template>

<style scoped>
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
}
</style>