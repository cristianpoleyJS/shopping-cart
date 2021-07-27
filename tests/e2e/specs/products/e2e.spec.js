describe('Product.vue', () => {
  before(() => {
    cy.visit('/')
  })

  it('Products have title', () => {
    cy.get('[data-test=product-title]').each(($product) => {
      cy.get($product).should('to.not.be.empty')
    })
  })
  it('Products have code', () => {
    cy.get('[data-test=product-code]').each(($product) => {
      cy.get($product).should('to.not.be.empty')
    })
  })
  it('Products have image', () => {
    cy.get('[data-test=product-image]').each(($product) => {
      cy.get($product).should('have.attr', 'src')
    })
  })
  it('Products have price greater than 0', () => {
    cy.get('[data-test=product-price]').each(($product) => {
      cy.get($product).invoke('text').then(text => {
        expect(text).to.be.greaterThan(0)
      })
    })
  })
  it('Products have quantity at 0', () => {
    cy.get('[data-test=product-quantity]').each(($product) => {
      cy.get($product).should('have.value', '0')
    })
  })
  it('The total of each product is 0', () => {
    cy.get('[data-test=product-total]').each(($product) => {
      cy.get($product).invoke('text').then(text => {
        expect(text).to.be.equals('0')
      })
    })
  })
})

describe('ProductDetails.vue', () => {
  it('URL has the code of the product clicked', () => {
    cy.get('[data-test=product-code]').first().invoke('text').then((text) => {
      cy.log(text)
      const code = text

      cy.get('[data-test=product-title]')
        .first()
        .click()

      cy.location().should((loc) => {
        expect(loc.pathname).to.eq(`/${code}`)
      })
    })
  })
  it('Product detail has title', () => {
    cy.get('[data-test=product-details-title]').should('to.not.be.empty')
  })
  it('Product detail has code', () => {
    cy.get('[data-test=product-details-code]').should('to.not.be.empty')
  })
  it('Product detail has image', () => {
    cy.get('[data-test=product-details-image]').then(($product) => {
      expect($product).to.have.css('background-image')
    })
  })
})
