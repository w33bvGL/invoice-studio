<script setup lang="ts">
defineProps<{
  modelValue: any
}>()
</script>

<template>
  <UiCard :title="$t('invoice.client.title')" icon="heroicons:user">
    <UiInput
        v-model="modelValue.client.name"
        :label="$t('invoice.client.name')"
        placeholder="Tech Solutions LLC"
    />
    <UiTextArea
        v-model="modelValue.client.address"
        :label="$t('invoice.client.address')"
        placeholder="500 Innovation Way, Boston, MA"
        :rows="2"
    />

    <div class="grid-2">
      <UiInput v-model="modelValue.client.email" type="email" :label="$t('invoice.client.email')" placeholder="finance@client.com" />
      <UiInput v-model="modelValue.client.phone" :label="$t('invoice.client.phone')" placeholder="+1 ..." />
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