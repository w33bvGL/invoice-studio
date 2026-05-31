<script setup lang="ts">
defineProps<{
  modelValue: any
}>()
</script>

<template>
  <UiCard :title="$t('invoice.notes.title')" icon="heroicons:document-text">
    <UiTextArea v-model="modelValue.notes" :placeholder="$t('invoice.notes.placeholder')" :rows="3" />
  </UiCard>
</template>