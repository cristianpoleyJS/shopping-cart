describe('Checking the functionality of the Skeleton folder', () => {
  before(() => {
    cy.visit('/')
  })

  it('Change language to Spanish', () => {
    cy.get('[data-test=button-es]')
      .click()
      .should(() => {
        expect(localStorage.getItem('languageShoppingCart')).to.equal('es')
      })
  })

  it('Change language to English', () => {
    cy.get('[data-test=button-en]')
      .click()
      .should(() => {
        expect(localStorage.getItem('languageShoppingCart')).to.equal('en')
      })
  })
  // ------------------
})
