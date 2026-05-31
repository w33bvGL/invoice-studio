<script setup lang="ts">
defineProps<{
  tabs: { id: string; label: string }[]
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="ui-tabs">
    <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-btn', { active: modelValue === tab.id }]"
        @click="emit('update:modelValue', tab.id)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.ui-tabs {
  display: flex;
  background-color: var(--bg-body);
  padding: 2px;
  border-radius: var(--radius-base);
  border: 1px solid var(--border-color);
  margin-bottom: var(--space-md);
}

.tab-btn {
  flex: 1;
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-small);
  font-weight: var(--weight-medium);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  transition: all 0.2s ease;
}

.tab-btn.active {
  background-color: var(--color-surface-raised);
  color: var(--text-main);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
</style>