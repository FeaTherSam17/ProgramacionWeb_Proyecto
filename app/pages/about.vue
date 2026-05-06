<script setup lang="ts">
const event = useRequestEvent()

const { data: page } = await useAsyncData<any>('about', async () => {
  const result = await (queryCollection as any)(event, 'about').first()
  return result as any
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { global } = useAppConfig()

const pageData = computed<any>(() => page.value)

useSeoMeta({
  title: pageData.value?.title,
  ogTitle: pageData.value?.title,
  description: pageData.value?.description,
  ogDescription: pageData.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="pageData.title"
      :description="pageData.description"
      orientation="horizontal"
      :ui="{
        container: 'lg:flex sm:flex-row items-center',
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <NuxtImg
        class="sm:rotate-4 size-36 rounded-lg object-cover ring ring-default ring-offset-3 ring-offset-(--ui-bg)"
        :src="global.picture?.light!"
        :alt="global.picture?.alt!"
        width="144"
        height="144"
      />
    </UPageHero>
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <MDC
        :value="pageData.content"
        unwrap="p"
      />
      <div class="flex flex-row justify-center items-center py-10 space-x-[-2rem]">
        <PolaroidItem
          v-for="(image, index) in pageData.images"
          :key="index"
          :image="image"
          :index="Number(index)"
        />
      </div>
    </UPageSection>
  </UPage>
</template>
