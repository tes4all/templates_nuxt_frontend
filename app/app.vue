<template>
  <div>
    <NuxtPage />
    <Button>Click me</Button>
  </div>
</template>
<script lang="ts" setup>
  // TODO: add nuxt/nitro variables to linter
  provideHeadlessUseId(() => useId()) // eslint-disable-line no-undef
</script>
