<script setup lang="ts">

defineProps<{ modelValue: any }>()
const emit = defineEmits(['update:modelValue'])

const { data: themes } = await useFetch('/api/themes')
</script>

<template>
  <div class="tab-content design-grid">
    <h3 class="section-title">Выбор пресета</h3>
    <button
        v-for="theme in themes"
        :key="theme.id"
        type="button"
        :class="['theme-card', { active: modelValue.theme === theme.id }]"
        @click="emit('update:modelValue', { ...modelValue, theme: theme.id })"
    >
      <span class="theme-name">{{ theme.name }}</span>
    </button>
  </div>
</template>

<style scoped>
.design-grid { display: grid; gap: var(--space-sm); }
.section-title { font-size: var(--font-small); color: var(--text-muted); text-transform: uppercase; }
.theme-card { border: 1px solid var(--border-color); padding: var(--space-md); border-radius: var(--radius-md); text-align: left; background: var(--color-surface); }
.theme-card.active { border-color: var(--color-focus); box-shadow: 0 0 0 1px var(--color-focus); }
</style>