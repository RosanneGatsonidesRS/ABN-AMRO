<script setup lang="ts"></script>

<template>
  <div
    class="app-container"
    data-testid="app-container"
  >
    <main data-testid="main-content">
      <RouterView />
    </main>
  </div>
</template>
<style>
  .app-container {
    max-width: var(--abn-container-max-width);
    padding: var(--abn-container-padding);
    margin: 0 auto;
  }
</style>
