<template>
  <aside class="summary">
    <h1 class="main">{{ $t('components.section_summary.title') }}</h1>
    <ul class="summary-items wrapper border">
      <li>
        <span
          class="summary-items-number">{{ $t('components.section_summary.items', { numItems: numProducts}) }}</span>
        <span class="summary-items-price">
          {{ totalPriceWithoutDiscounts }}
          <span class="currency">€</span>
        </span>
      </li>
    </ul>
    <div class="summary-discounts wrapper-half border" v-if="discounts && discounts.length">
      <h2>{{ $t('components.section_summary.discounts') }}</h2>
      <ListDiscounts :discounts="discounts" />
    </div>
    <div class="summary-total wrapper">
      <ul>
        <li>
          <span class="summary-total-cost">{{ $t('components.section_summary.total') }}</span>
          <span class="summary-total-price" data-test="summary-total">{{ totalPrice }}€</span>
        </li>
      </ul>
      <button type="submit" @click="checkout()">{{ $t('components.section_summary.checkout') }}</button>
    </div>
  </aside>
</template>

<script>
import ListDiscounts from '@/components/discounts/ListDiscounts.vue'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Summary',
  components: {
    ListDiscounts
  },
  setup () {
    const store = useStore()
    const checkout = store.getters.getCheckout
    return {
      totalPrice: computed(() => checkout.total()),
      totalPriceWithoutDiscounts: computed(() => checkout.getTotalBeforeDiscounts()),
      numProducts: computed(() => checkout.getProductsInCart())
    }
  },
  props: {
    discounts: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    checkout () {
      alert(this.$i18n.t('components.section_summary.finish_buy'))
      location.reload()
    }
  }
})
</script>
