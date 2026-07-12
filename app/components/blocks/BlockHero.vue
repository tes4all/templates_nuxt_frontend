<template>
  <section class="bg-background flex flex-col items-center gap-6 px-6 py-24">
    <h1 class="text-foreground text-4xl font-bold tracking-tight">
      {{ title }}
    </h1>
    <p class="text-muted-foreground max-w-prose text-center text-lg">
      {{ text }}
    </p>
    <Button
      as="a"
      href="#content"
    >
      {{ $t('home.cta') }}
    </Button>
  </section>
</template>

<script setup lang="ts">
  // Reference block: purely static, renders server-side/prerendered with no
  // client JS of its own. Blocks that need interactivity are used as
  // <LazyBlockX hydrate-on-visible /> from pages.
  defineProps<{
    title: string
    text: string
  }>()
</script>
