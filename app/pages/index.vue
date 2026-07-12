<template>
  <main>
    <!--
      Blocks are static by default (no client JS of their own). Interactivity
      is opt-in per block via lazy hydration, e.g.:
        <LazyBlockContactForm hydrate-on-visible />
    -->
    <BlockHero
      :title="t('home.title')"
      :text="t('home.text')"
    />
  </main>
</template>

<script setup lang="ts">
  const { t } = useI18n()
  const config = useRuntimeConfig()

  useSeoMeta({
    title: config.public.siteName,
    description: config.public.siteDescription,
  })
</script>
