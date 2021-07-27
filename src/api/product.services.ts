import Product from "@/interfaces/Product"

// Simulating that we are invoking an API.
export default class ProductServices {
  static getProducts () {
    return fetch('/products.json')
      .then(response => response.json())
      .then(data => {
        return data
      })
      .catch(error => console.error(error))
  }

  static getProductByCode (code: string) {
    return fetch('/products.json')
      .then(response => response.json())
      .then(data => {
        return data.find((prod: Product) => prod.code === code)
      })
      .catch(error => console.error(error))
  }
}
