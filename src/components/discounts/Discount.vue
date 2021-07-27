<template>
  <li>
    <span data-test="discount-title">
      {{ discount.title }}
      <template v-if="discount.typeDiscount === TYPE_DISCOUNT_PROMOTION">
          ({{ discount.code }}: {{ discount.discountPercent * 100 }}%)
      </template>
    </span>
    <span data-test="discount-accum">{{ -discount.accum || 0 }}€</span>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TYPE_DISCOUNT_PROMOTION } from '../../utils/constants'

export default defineComponent({
  name: 'Discount',
  setup () {
    return {
      TYPE_DISCOUNT_PROMOTION
    }
  },
  props: {
    discount: {
      type: Object,
      required: true
    }
  }
})
</script>