describe('Discount.vue', () => {
  before(() => {
    cy.visit('/')
  })

  it('Check that the discounts have title', () => {
    cy.get('[data-test=discount-title]').each(($discount) => {
      cy.get($discount).should('to.not.be.empty')
    })
  })
  it('Check that the quantities are at 0', () => {
    cy.get('[data-test=discount-accum]').each(($discount) => {
      expect($discount).to.have.html('0€')
    })
  })
})
