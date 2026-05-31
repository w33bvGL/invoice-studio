<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '~/stores/invoice'

const store = useInvoiceStore()
const { data } = storeToRefs(store)

const { data: themes } = await useFetch('/api/themes')
</script>

<template>
  <div class="tab-content design-grid">
    <h3 class="section-title">{{ $t('right.design.title') }}</h3>
    <button
        v-for="theme in themes"
        :key="theme.id"
        type="button"
        :class="['theme-card', { active: data.theme === theme.id }]"
        @click="data.theme = theme.id"
    >
      {{ theme.name }}
    </button>
  </div>
</template>

<style scoped>
.design-grid { display: grid; gap: var(--space-sm); }
.section-title { font-size: var(--font-small); color: var(--text-muted); text-transform: uppercase; }
.theme-card { border: 1px solid var(--border-color); padding: var(--space-md); border-radius: var(--radius-md); text-align: left; background: var(--color-surface); color: inherit; cursor: pointer; }
.theme-card.active { border-color: var(--color-focus); box-shadow: 0 0 0 1px var(--color-focus); }
</style>