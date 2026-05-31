<script setup lang="ts">
import { useInvoiceStore } from '~/stores/invoice'
const store = useInvoiceStore()
const { locales } = useI18n()

const languageOptions = computed(() =>
    locales.value.map((loc: any) => ({
      value: loc.code,
      label: loc.name || loc.code.toUpperCase()
    }))
)
</script>

<template>
  <UiCard :title="$t('right.design.language.title')" icon="i-heroicons-language">
    <UiSelect
        v-model="store.data.docLang"
        :label="$t('right.design.language.label')"
        :options="languageOptions"
    />
  </UiCard>
</template>