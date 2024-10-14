<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
  // TODO: add nuxt/nitro variables to linter
  provideHeadlessUseId(() => useId()) // eslint-disable-line no-undef
</script>
