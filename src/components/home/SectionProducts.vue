<template>
  <section class="products">
    <h1 class="main">{{ $t('components.section_products.title') }}</h1>
    <template v-if="products && products.length">
      <ul class="products-list tableHead">
        <li class="products-list-title row">
          <div class="col-product">{{ $t('components.section_products.details') }}</div>
          <div class="col-quantity">{{ $t('components.section_products.quantity') }}</div>
          <div class="col-price">{{ $t('components.section_products.price') }}</div>
          <div class="col-total">{{ $t('components.section_products.total') }}</div>
        </li>
      </ul>
      <ListProducts :products="products" />
    </template>
    <span v-else class="products-empty">
      {{ $t('components.section_products.empty') }}
      <img src="@/assets/images/products-empty.svg" />
    </span>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ListProducts from '@/components/products/ListProducts.vue'

export default defineComponent({
  name: 'SectionProducts',
  components: {
    ListProducts
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
<style scoped lang="scss">
.products-empty {
  margin-top: 2rem;
  display: block;

  img {
    max-width: 100%;
  }
}
</style>
