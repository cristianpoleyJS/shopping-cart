<template>
  <li class="product row">
    <div class="col-product">
      <figure class="product-image">
        <img
          :src="productData.urlImage || importImage(productData.name)"
          alt="Sweatshirt"
          data-test="product-image"/>
        <div class="product-description">
          <h1 @click="openProductModal()" data-test="product-title">{{ productData.name }}</h1>
          <p class="product-code">
            {{ $t('components.product.code') }}
            <span data-test="product-code">{{ productData.code }}</span>
          </p>
        </div>
      </figure>
    </div>
    <div class="col-quantity">
      <button
        class="count"
        @click="remove(product)"
        :disabled="productData.quantity === 0"
        data-test="decrease-quantity">-</button>
      <input
        type="text"
        class="product-quantity"
        readonly
        v-model="productData.quantity"
        data-test="product-quantity"/>
      <button class="count" @click="add(product)" data-test="increase-quantity">+</button>
    </div>
    <div class="col-price">
      <span class="product-price" data-test="product-price">{{ productData.price }}</span>
      <!-- /*
        In a production development, I would take the currency (in this case, '€')
        from a market environment variable set by country
      */-->
      <span class="product-currency currency">€</span>
    </div>
    <div class="col-total">
      <span
        class="product-price"
        data-test="product-total">{{ productData.price * productData.quantity }}</span>
      <span class="product-currency currency">€</span>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ADD_PRODUCT_CART, REMOVE_PRODUCT_CART } from '@/store'
// eslint-disable-next-line no-unused-vars
import Product from '@/interfaces/Product'

export default defineComponent({
  name: 'Product',
  setup () {
    return {
      productData: {}
    }
  },
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  beforeMount () {
    this.productData = this.product
  },
  methods: {
    importImage (name: string) {
      return require(`@/assets/images/products/${name.toLowerCase()}.png`)
    },

    add (prod: Product) {
      this.$store.commit(ADD_PRODUCT_CART, prod)
    },

    remove (prod: Product) {
      this.$store.commit(REMOVE_PRODUCT_CART, prod)
    },

    openProductModal () {
      this.$router.push(`/${this.product.code}`)
    }
  }
})
</script>

<style scoped lang="scss">
  .product-description > h1 {
    cursor: pointer;
  }
</style>
