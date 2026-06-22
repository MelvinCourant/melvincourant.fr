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
  type?: 'default' | 'cover'
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
      {'simple-image--cover': type === 'cover'}
    ]"
  >
    <a
      v-if="url"
      :href="url"
      :title="title"
      target="_blank"
    >
      <img
        class="simple-image__image"
        :src="src"
        :alt="alt"
      />
    </a>
    <img
      v-else
      class="simple-image__image"
      :src="src"
      :alt="alt"
    />
    <div v-if="links" class="simple-image__links">
      <a
        v-for="link in links"
        :key="link.url"
        class="simple-image__link"
        :href="link.url"
        :title="link.title"
        target="_blank"
      >
        <img
          class="simple-image__icon"
          :src="link.src"
          alt=""
        />
      </a>
    </div>
  </div>
</template>
