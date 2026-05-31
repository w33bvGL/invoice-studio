<script setup lang="ts">
interface Props {
  label?: string
  rows?: number
}

withDefaults(defineProps<Props>(), {
  rows: 3
})
const model = defineModel<string>()
</script>

<template>
  <div class="ui-field">
    <label v-if="label" class="ui-label">{{ label }}</label>
    <textarea
        v-model="model"
        :rows="rows"
        v-bind="$attrs"
        class="ui-textarea"
    ></textarea>
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

  .ui-textarea {
    width: 100%;
    padding: 0.5rem 0.75rem;
    background-color: var(--bg-body);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-base);
    color: var(--text-main);
    font-size: var(--font-small);
    line-height: var(--leading-normal);
    transition: border-color var(--duration-normal) var(--ease-out-expo);
  }

  .ui-textarea:focus {
    outline: none;
    border-color: var(--color-border-strong);
  }
</style>