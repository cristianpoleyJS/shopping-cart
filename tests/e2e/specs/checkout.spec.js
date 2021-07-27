describe('Checkout', () => {
  before(() => {
    cy.visit('/')
  })

  it('Add product and check that the total is updated', () => {
    const price = cy.get('[data-test=product-total]').first()

    cy.get('[data-test=increase-quantity]')
      .first()
      .click()

    cy.get('[data-test=summary-total]').should('to.be', price)
  })

  it('Remove product and check that the total is updated', () => {
    cy.get('[data-test=decrease-quantity]')
      .first()
      .click()

    cy.get('[data-test=summary-total]').should('to.be', 0)
  })

  it('Add product in your detail view', () => {
    cy.get('[data-test=product-title]')
      .first()
      .click()

    cy.get('[data-test=product-details-add-cart]').click()

    cy.get('[data-test=summary-total]').should('not.to.be', 0)
  })

  it('Remove previously added product', () => {
    cy.get('[data-test=decrease-quantity]')
      .first()
      .click()

    cy.get('[data-test=summary-total]').should('to.be', 0)
  })
})
