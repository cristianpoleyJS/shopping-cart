<template>
  <section class="product-details" v-if="product">
    <figure
      class="product-details__image"
      :style="{'background-image': `url(${imageProduct()})`}"
      data-test="product-details-image"/>
    <img
      class="product-details__icon-cross"
      @click="closeProductDetails()"
      src="@/assets/images/cross.svg"/>
    <div class="product-details__details">
      <div class="product-details__details__title-price" data-test="product-details-price">
        <h1>{{ product.name }}</h1>
        <h1>{{ product.price }} €</h1>
      </div>
      <p
        class="product-details__details__description"
        v-if="product.description"
        data-test="product-details-description">{{ product.description }}</p>
      <p
        class="product-details__details__code"
        data-test="product-details-code">
        {{ $t('components.product.code') }}
        <span data-test="product-details-code">{{ product.code }}</span>
      </p>
      <button @click="addToCart()" type="submit" data-test="product-details-add-cart">{{ $t('components.product_details.add_to_cart') }}</button>
    </div>
  </section>
</template>

<script lang="ts">
import { ADD_PRODUCT_CART, RESET_PRODUCT_BY_CODE } from '@/store'
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
// eslint-disable-next-line no-unused-vars
import Product from '@/interfaces/Product'

export default defineComponent({
  name: 'ProductDetails',
  async beforeMount () {
    await this.$store.dispatch('actionGetProductByCode', this.$router.currentRoute.value.params.code)
  },
  beforeUnmount () {
    this.$store.commit(RESET_PRODUCT_BY_CODE)
  },
  computed: {
    ...mapGetters({
      product: 'getProductByCode',
      products: 'getProducts',
      checkout: 'getCheckout'
    })
  },
  methods: {
    imageProduct () {
      return require(`@/assets/images/products/${this.product.name.toLowerCase()}.png`)
    },

    closeProductDetails () {
      this.$router.push('/')
    },

    addToCart () {
      const productFinded = this.checkout.getProducts().find(
        (prod: Product) => prod.code === this.product.code
      )
      if (productFinded) {
        this.$store.commit(ADD_PRODUCT_CART, productFinded)
        this.$router.push('/')
      }
    }
  }
})
</script>

<style scoped lang="scss">
  .product-details {
    position: fixed;
    top: calc(50% + 2rem);
    left: 50%;
    display: flex;
    overflow-x: hidden;
    overflow-y: auto;
    max-width: rem(1088);
    max-height: rem(648);
    width: calc(100% - 64px);
    height: calc(100% - 64px);
    border-radius: rem(4);
    transform: translate(-50%, -50%);
    z-index: 1;

    &__image {
      flex: 1;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }

    &__icon-cross {
      position: absolute;
      top: 0.5rem;
      right: rem(4);
      cursor: pointer;
    }

    &__details {
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      padding: rem(40) 2rem;
      width: rem(312);
      background-color: var(--white);
      align-items: center;

      &__title-price {
        flex: 1 0 100%;
        display: flex;
        justify-content: space-between;
        border-bottom: rem(1) solid rgba(33, 34, 64, 0.16);
        padding-bottom: rem(14);
      }

      &__description {
        flex: 1 0 100%;
        margin-top: rem(22);
        line-height: 1rem;
        font-size: rem(12);
        font-weight: 400;
        padding-bottom: 3rem;
        color: var(--secondary-color);
        border-bottom: rem(1) solid rgba(33, 34, 64, 0.16);
      }

      &__code {
        flex: 1 0 100%;
        color: #979fbdff;
        margin: 8px 0 1rem;
        line-height: 1rem;
        font-size: rem(12);
        font-weight: 400;
      }
    }
  }
</style>
