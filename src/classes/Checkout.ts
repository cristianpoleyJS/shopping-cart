import Product from '@/interfaces/Product'
import Discount from '@/interfaces/Discount'
import { TYPE_DISCOUNT_PROMOTION, TYPE_DISCOUNT_TWO_FOR_ONE, TYPE_DISCOUNT_BULK } from '@/utils/constants'

export default class Checkout {
  private _products: Array<Product>
  private _discounts: Array<Discount>
  private _totalBeforeDiscounts: number
  private _productsInCart: number
  private _cart: any

  constructor (products: Array<Product> = [], discounts: Array<Discount> = []) {
    this._products = products
    this._discounts = discounts
    this._totalBeforeDiscounts = 0
    this._productsInCart = 0
    this._cart = {}
  }

  public getProducts (): Array<Product> {
    return this._products
  }

  public getDiscounts (): Array<Discount> {
    return this._discounts
  }

  public getTotalBeforeDiscounts (): number {
    return this._totalBeforeDiscounts
  }
  private setTotalBeforeDiscounts (num: number): void {
    this._totalBeforeDiscounts += num
  }

  public getProductsInCart (): number {
    return this._productsInCart
  }
  private setProductInCart (num: number): void {
    this._productsInCart += num
  }

  /**
   * When scanning a product, it is checked if it exists in the products
   * available (those returned by the API). If so, it is added to the cart.
   */
  public scan (code: string): any {
    const productFinded = this.getProducts().find(prod => prod.code === code)
    if (productFinded) {
      // If there is no such product in the cart yet, the data in the cart is initialized.
      if (!this._cart[productFinded.code]) {
        this._cart[productFinded.code] = []
      }
      this._cart[productFinded.code].push(productFinded)
      this.setTotalBeforeDiscounts(productFinded.price)
      this.setProductInCart(1)
      this._calculateDiscount(productFinded.price, productFinded.code, this._cart[productFinded.code].length)
    } else {
      alert('There is no product with this ID.')
      console.error('There is no product with this ID. Check that the scanned code is a correct product code.')
    }
  }

  /**
   * A single unit of the selected product is removed.
   */
  public cancelScan (code: string): void {
    this.setProductInCart(-1)
    const price = this._cart[code][0].price
    this.setTotalBeforeDiscounts(-price)
    this._cart[code].length > 1 ? this._cart[code].splice(0, 1) : this._cart[code] = []
    this._calculateDiscount(price, code, this._cart[code].length)
  }

  /**
   * Total to be paid by the customer from the shopping cart
   * (with discount already applied).
   */
  public total (): number {
    let totalDiscounted = 0
    this.getDiscounts().forEach((disct: Discount) => {
      totalDiscounted += disct.accum || 0
    })
    return this.getTotalBeforeDiscounts() - totalDiscounted
  }

  /**
   * This internal method calculates all discounts for each product.
   * These discounts can be added to different products than those indicated in the exercise,
   * i.e. if the API indicates that a two_for_one exists for the caps,
   * this method will apply it automatically.
   *
   * Furthermore, if a discount code arrives,
   * this percentage is applied to the entire cart before applying the discount to each product.
   */
  private _calculateDiscount (price: number, code: string, lengthProducts: number = 0): void {
    const discountsByProduct = this.getDiscounts().filter(disct => disct.productCode === code)
    if (discountsByProduct) {
      discountsByProduct.forEach((disct) => {
        // If it is a "2x1" type, a 50% discount is added.
        if (disct.typeDiscount === TYPE_DISCOUNT_TWO_FOR_ONE) {
          disct.accum = lengthProducts % 2 === 0
            ? lengthProducts * price * 0.5
            : Math.floor(lengthProducts / 2) * price
        // If it is a % discount from X units
        } else if (disct.typeDiscount === TYPE_DISCOUNT_BULK) {
          disct.accum = lengthProducts >= disct.minElements
            ? (lengthProducts * price * disct.discountPercent)
            : 0
        }
      })
    }
    const discountsPromotionCode = this.getDiscounts().filter(disct => disct.typeDiscount === TYPE_DISCOUNT_PROMOTION)
    if (discountsPromotionCode) {
      discountsPromotionCode.forEach((disct) => {
        disct.accum = this.getTotalBeforeDiscounts() * disct.discountPercent
      })
    }
  }
}
