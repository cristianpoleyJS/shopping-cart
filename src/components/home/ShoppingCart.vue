<template>
  <div class="App">
    <SectionProducts :products="products" />
    <SectionSummary v-if="checkout" :discounts="discounts" />
  </div>
</template>

<script lang="ts">
import SectionProducts from '@/components/home/SectionProducts.vue'
import SectionSummary from '@/components/home/SectionSummary.vue'

import { useStore } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ShoppingCart',
  components: {
    SectionProducts,
    SectionSummary
  },
  async setup () {
    const store = useStore()
    await store.dispatch('actionSetCheckout')
    return {
      checkout: store.getters.getCheckout,
      products: store.getters.getCheckout.getProducts(),
      discounts: store.getters.getCheckout.getDiscounts()
    }
  }
})
</script>
