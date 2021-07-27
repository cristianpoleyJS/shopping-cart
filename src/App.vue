<template>
  <HeaderApp />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderApp from '@/components/skeleton/HeaderApp.vue'

export default defineComponent({
  components: {
    HeaderApp
  }
})
</script>