<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '~/stores/invoice'

const store = useInvoiceStore()
const { data } = storeToRefs(store)

const { data: themes } = await useFetch('/api/themes')

const themeOptions = computed(() =>
    themes.value?.map((theme: any) => ({
      value: theme.id,
      label: theme.name
    })) || []
)
</script>

<template>
  <UiCard :title="$t('right.design.preset.title')" icon="i-heroicons-paint-brush">
    <UiSelect
        v-model="data.theme"
        :label="$t('right.design.preset.label')"
        :options="themeOptions"
    />
  </UiCard>
</template>