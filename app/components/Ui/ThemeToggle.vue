<script setup lang="ts">
const colorMode = useColorMode()
const themes = ['system', 'light', 'dark'] as const

const themeIcons = {
  system: 'heroicons:computer-desktop',
  light: 'heroicons:sun',
  dark: 'heroicons:moon'
}

function toggleTheme() {
  const currentIndex = themes.indexOf(colorMode.preference as any)
  const nextIndex = (currentIndex + 1) % themes.length
  colorMode.preference = themes[nextIndex]
}

const currentIcon = computed(() => {
  if (import.meta.server || colorMode.unknown) {
    return themeIcons.system
  }
  return themeIcons[colorMode.preference as keyof typeof themeIcons] || themeIcons.system
})

const currentTitle = computed(() => {
  if (import.meta.server || colorMode.unknown) {
    return 'Loading theme...'
  }
  return `Theme: ${colorMode.preference}`
})
</script>

<template>
  <ClientOnly>
    <UiButton
        variant="ghost"
        size="sm"
        class="theme-toggle"
        :title="currentTitle"
        @click="toggleTheme"
    >
      <Icon :name="currentIcon" class="theme-icon" />
    </UiButton>

    <template #fallback>
      <UiButton
          variant="ghost"
          size="sm"
          class="theme-toggle theme-toggle--loading"
          title="Loading theme..."
          disabled
      >
        <div class="skeleton-icon" />
      </UiButton>
    </template>
  </ClientOnly>
</template>

<style scoped>
.theme-toggle {
  width: 32px;
  height: 32px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

.theme-toggle--loading {
  cursor: wait;
  opacity: 0.6;
}

.theme-icon {
  width: 16px;
  height: 16px;
  display: inline-block;
  color: var(--text-main);
}

.skeleton-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--border-color);
  flex-shrink: 0;
}
</style>