<script setup lang="ts">
interface Props {
  label?: string
  modelValue?: string | number
  type?: string
  error?: string
}

defineProps<Props>()
const model = defineModel<string | number>()
</script>

<template>
  <div class="ui-field">
    <label v-if="label" class="ui-label">{{ label }}</label>
    <input
        v-model="model"
        :type="type || 'text'"
        v-bind="$attrs"
        :class="['ui-input', { 'ui-input--error': error }]"
    />
    <span v-if="error" class="ui-error-text">{{ error }}</span>
  </div>
</template>

<style scoped>
  .ui-field {
    display: flex;
    flex-direction: column;
    gap: var(--space-xxs);
    width: 100%;
  }

  .ui-label {
    font-size: var(--font-xs);
    font-weight: var(--weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-muted);
  }

  .ui-input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    background-color: var(--bg-body);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-base);
    color: var(--text-main);
    font-size: var(--font-small);
    transition: border-color var(--duration-normal) var(--ease-out-expo);
  }

  .ui-input:focus {
    outline: none;
    border-color: var(--color-border-strong);
  }

  .ui-input--error {
    border-color: oklch(60% 0.15 20);
  }

  .ui-error-text {
    font-size: var(--font-xs);
    color: oklch(60% 0.15 20);
  }
</style>