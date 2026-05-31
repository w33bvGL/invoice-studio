<script setup lang="ts">
defineProps<{
  modelValue: any
}>()
</script>

<template>
  <UiCard :title="$t('right.data.notes.title')" icon="heroicons:document-text">
    <UiTextArea v-model="modelValue.notes" :placeholder="$t('right.data.notes.placeholder')" :rows="3" />
  </UiCard>
</template>