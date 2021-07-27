<template>
  <ul class="products-list">
    <Product
      v-for="prod in products"
      :key="prod.code"
      :product="prod" />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Product from '@/components/products/Product.vue'

export default defineComponent({
  name: 'ListProducts',
  components: {
    Product
  },
  props: {
    products: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
})
</script>
