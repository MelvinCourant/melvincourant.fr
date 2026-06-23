<script setup lang="ts">
import '~/assets/css/pages/projects/_simple-image.scss'

interface Link {
  url: string
  title: string
  src: string
}

withDefaults(defineProps<{
  src: string
  alt: string
  variant?: 'default' | 'cover'
  url?: string
  title?: string
  links?: Link[]
}>(), {
  type: 'default',
  links: () => [],
})
</script>

<template>
  <div
    :class="[
      'simple-image',
      {'simple-image--cover': variant === 'cover'}
    ]"
  >
    <NuxtLink
      v-if="url"
      :to="url"
      :title="title"
      target="_blank"
    >
      <img
        class="simple-image__image"
        :src="src"
        :alt="alt"
      />
    </NuxtLink>
    <img
      v-else
      class="simple-image__image"
      :src="src"
      :alt="alt"
    />
    <div v-if="links" class="simple-image__links">
      <NuxtLink
        v-for="link in links"
        :key="link.url"
        class="simple-image__link"
        :to="link.url"
        :title="link.title"
        target="_blank"
      >
        <img
          class="simple-image__icon"
          :src="link.src"
          alt=""
        />
      </NuxtLink>
    </div>
  </div>
</template>
