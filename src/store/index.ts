import DiscountServices from '@/api/discount.services'
import ProductServices from '@/api/product.services'
import Checkout from '@/classes/Checkout'
import Product from '@/interfaces/Product'
import Discount from '@/interfaces/Discount'

export const RESET_PRODUCT_BY_CODE = 'RESET_PRODUCT_BY_CODE'
export const SET_PRODUCT_BY_CODE = 'SET_PRODUCT_BY_CODE'
export const REMOVE_PRODUCT_CART = 'REMOVE_PRODUCT_CART'
export const ADD_PRODUCT_CART = 'ADD_PRODUCT_CART'
export const SET_DISCOUNTS = 'SET_DISCOUNTS'
export const SET_PRODUCTS = 'SET_PRODUCTS'
export const SET_CHECKOUT = 'SET_CHECKOUT'

import { createStore } from 'vuex'

// define your typings for the store state
export interface State {
  products: Array<Product>,
  discounts: Array<Discount>,
  checkout: Checkout | null,
  productByCode: Product | null
}

export const store = createStore<State>({
  state: {
    products: [],
    discounts: [],
    checkout: null,
    productByCode: null
  },
  getters: {

    getProducts: state => state.products,

    getDiscounts: state => state.discounts,

    getCheckout: state => state.checkout,

    getProductByCode: state => state.productByCode
  },
  actions: {

    async actionSetCheckout ({ commit }) {
      const productsData = await ProductServices.getProducts()
      const discountsData = await DiscountServices.getDiscounts()
      const products: Array<Product> = []
      const discounts: Array<Discount> = []

      productsData.forEach((prod: Product) => {
        products.push({
          ...prod,
          quantity: 0
        })
      })

      discountsData.forEach((disct: Discount) => {
        discounts.push(disct)
      })

      const checkout = new Checkout(products, discounts)
      commit(SET_PRODUCTS, products)
      commit(SET_DISCOUNTS, discounts)
      commit(SET_CHECKOUT, checkout)
    },

    async actionGetProductByCode ({ commit }, code) {
      const product = await ProductServices.getProductByCode(code)
      commit(SET_PRODUCT_BY_CODE, product)
    }
  },
  mutations: {

    [SET_PRODUCTS]: (state, value) => {
      state.products = value
    },

    [SET_DISCOUNTS]: (state, value) => {
      state.discounts = value
    },

    [SET_CHECKOUT]: (state, value) => {
      state.checkout = value
    },

    [ADD_PRODUCT_CART]: (state, prod) => {
      prod.quantity++
      if (state.checkout) {
        state.checkout.scan(prod.code)
      }
    },

    [REMOVE_PRODUCT_CART]: (state, prod) => {
      prod.quantity > 0 ? prod.quantity-- : prod.quantity = 0
      if (state.checkout) {
        state.checkout.cancelScan(prod.code)
      }
    },

    [SET_PRODUCT_BY_CODE]: (state, product) => {
      state.productByCode = product
    },

    [RESET_PRODUCT_BY_CODE]: (state) => {
      state.productByCode = null
    }
  }
})
