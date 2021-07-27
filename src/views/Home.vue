<template>
  <router-view />
  <Suspense>
    <template #default>
      <ShoppingCart />
    </template>
    <template #fallback>
      <Spinner />
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Spinner from '@/components/common/Spinner.vue'
import ShoppingCart from '@/components/home/ShoppingCart.vue'

export default defineComponent({
  components: {
    ShoppingCart,
    Spinner
  },
})
</script>

