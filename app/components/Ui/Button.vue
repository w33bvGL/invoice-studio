<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  size: 'md'
})
</script>

<template>
  <button :class="['ui-btn', `ui-btn--${variant}`, `ui-btn--${size}`]">
    <slot />
  </button>
</template>

<style scoped>
  .ui-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    font-weight: var(--weight-medium);
    font-size: var(--font-small);
    border-radius: var(--radius-base);
    transition: all var(--duration-normal) var(--ease-out-expo);
    white-space: nowrap;
    user-select: none;
    border: 1px solid transparent;
  }

  .ui-btn--primary {
    background-color: var(--color-primary);
    color: var(--color-primary-fg);
  }
  .ui-btn--primary:hover {
    background-color: var(--color-primary-hover);
  }

  .ui-btn--secondary {
    background-color: var(--bg-elevated);
    color: var(--text-main);
    border-color: var(--border-color);
  }
  .ui-btn--secondary:hover {
    background-color: var(--color-border);
  }

  .ui-btn--ghost {
    background-color: transparent;
    color: var(--text-muted);
  }
  .ui-btn--ghost:hover {
    background-color: var(--bg-elevated);
    color: var(--text-main);
  }

  .ui-btn--danger {
    background-color: oklch(60% 0.15 20);
    color: #ffffff;
  }
  .ui-btn--danger:hover {
    background-color: oklch(50% 0.15 20);
  }

  .ui-btn--sm {
    padding: 0.375rem 0.75rem;
    font-size: var(--font-xs);
  }
  .ui-btn--md {
    padding: 0.5rem 1rem;
  }
  .ui-btn--lg {
    padding: 0.75rem 1.5rem;
    font-size: var(--font-body);
  }

  .ui-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>