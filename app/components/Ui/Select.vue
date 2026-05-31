<script setup lang="ts">
interface Props {
  label?: string
  options: string[] | { value: string | number; label: string }[]
}

defineProps<Props>()
const model = defineModel<any>()
</script>

<template>
  <div class="ui-field">
    <label v-if="label" class="ui-label">{{ label }}</label>
    <div class="ui-select-wrapper">
      <select v-model="model" v-bind="$attrs" class="ui-select">
        <template v-for="opt in options">
          <option v-if="typeof opt === 'string'" :key="opt" :value="opt">{{ opt }}</option>
          <option v-else :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </template>
      </select>
    </div>
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

  .ui-select-wrapper {
    position: relative;
    width: 100%;
  }

  .ui-select {
    width: 100%;
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    background-color: var(--bg-body);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-base);
    color: var(--text-main);
    font-size: var(--font-small);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 10px;
    transition: border-color var(--duration-normal) var(--ease-out-expo);
  }

  .ui-select:focus {
    outline: none;
    border-color: var(--color-border-strong);
  }
</style>