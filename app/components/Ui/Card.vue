<script setup lang="ts">
interface Props {
  title: string
  icon: string
  badge?: string
}

defineProps<Props>()
</script>

<template>
  <section class="ui-card">
    <div class="card-header">
      <Icon :name="icon" class="card-icon" />
      <h3 class="card-title">{{ title }}</h3>
      <span v-if="badge" class="badge">{{ badge }}</span>
    </div>
    <div class="card-content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.ui-card {
  background-color: var(--bg-elevated);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-base);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: var(--space-xs);
  margin-bottom: var(--space-xxs);
}

.card-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--text-muted);
}

.card-title {
  font-size: var(--font-small);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex: 1;
}

.badge {
  font-size: var(--font-xs);
  font-weight: var(--weight-bold);
  background-color: var(--color-primary-subtle);
  color: var(--color-primary);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
</style>