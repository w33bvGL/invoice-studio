<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const localeOptions = computed(() =>
    locales.value.map((loc: any) => ({
      value: loc.code,
      label: loc.name
    }))
)

const currentLocale = computed({
  get: () => locale.value,
  set: (val) => setLocale(val)
})
</script>

<template>
  <div class="locale-switcher">
    <UiSelect
        v-model="currentLocale"
        :options="localeOptions"
        class="compact-select"
    />
  </div>
</template>

<style scoped>
.locale-switcher {
  width: 130px;
}

:deep(.dropdown-trigger) {
  padding: 0.375rem 0.5rem;
  font-size: var(--font-xs);
}
</style>