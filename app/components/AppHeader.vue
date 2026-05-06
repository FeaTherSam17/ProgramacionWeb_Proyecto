<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
  links: NavigationMenuItem[]
}>()
</script>

<template>
  <div class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-10">
    <div class="brand-header-shell flex items-center gap-3">
      <NuxtImg
        src="/brand/vf-logo.png"
        alt="VF Logo"
        width="44"
        height="44"
        class="brand-logo brand-logo--header"
      />
      <nav class="hidden sm:flex items-center gap-1 bg-white/70 dark:bg-[rgba(39,7,48,0.72)] backdrop-blur-md rounded-full px-2 sm:px-4 border border-[rgba(96,35,122,0.24)] dark:border-[rgba(228,95,255,0.35)] shadow-lg shadow-[rgba(81,13,99,0.14)] dark:shadow-[rgba(0,0,0,0.45)]">
        <NuxtLink
          v-for="link in links"
          :key="link.label"
          :to="link.to || '/'"
          class="inline-flex items-center gap-2 rounded-full px-2 sm:px-3 py-2 text-sm font-semibold text-[rgba(81,13,99,0.95)] dark:text-[rgba(246,217,255,0.96)] transition hover:text-[rgba(96,35,122,1)] dark:hover:text-[rgba(228,95,255,1)]"
          active-class="bg-[rgba(96,35,122,0.08)] dark:bg-[rgba(228,95,255,0.12)] text-[rgba(96,35,122,1)] dark:text-[rgba(228,95,255,1)]"
        >
          <UIcon
            v-if="link.icon"
            :name="link.icon"
            class="size-4"
          />
          <span>{{ link.label }}</span>
        </NuxtLink>
        <ColorModeButton />
      </nav>

      <div class="sm:hidden bg-white/70 dark:bg-[rgba(39,7,48,0.72)] backdrop-blur-md rounded-full px-2 py-1 border border-[rgba(96,35,122,0.24)] dark:border-[rgba(228,95,255,0.35)] shadow-lg shadow-[rgba(81,13,99,0.14)] dark:shadow-[rgba(0,0,0,0.45)]">
        <ColorModeButton />
      </div>
    </div>
  </div>
</template>
