<template>
  <div class="background-grid"/>
</template>

<style scoped>
.background-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  pointer-events: none;
  z-index: 0;
  background-image:
      linear-gradient(var(--color-border) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center top;
}
</style>