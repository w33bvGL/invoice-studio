
<template>
  <div class="layout-container">
    <Toolbar />

    <div class="layout-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
  .layout-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    background-color: var(--bg-body);
  }

  .layout-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>