// Simulating that we are invoking an API.
export default class DiscountServices {
  static getDiscounts () {
    return fetch('/discounts.json')
      .then(response => response.json())
      .then(data => {
        return data
      })
      .catch(error => console.error(error))
  }
}
