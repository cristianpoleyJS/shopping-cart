<template>
  <ul>
    <Discount
      v-for="discount in discounts"
      :key="discount.id"
      :discount="discount" />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Discount from '@/components/discounts/Discount.vue'

export default defineComponent({
  name: 'ListDiscounts',
  components: {
    Discount
  },
  props: {
    discounts: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
})
</script>
