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

const currentIcon = computed(() => themeIcons[colorMode.preference as keyof typeof themeIcons] || themeIcons.system)
</script>

<template>
  <UiButton
      variant="ghost"
      size="sm"
      class="theme-toggle"
      :title="`Theme: ${colorMode.preference}`"
      @click="toggleTheme"
  >
    <Icon :name="currentIcon" class="theme-icon" />
  </UiButton>
</template>

<style scoped>
.theme-toggle {
  padding: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.theme-icon {
  width: 16px;
  height: 16px;
  color: var(--text-main);
}
</style>