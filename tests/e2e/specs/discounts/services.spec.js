context('Integration Services', () => {
  it('Get discounts', () => {
    cy.request('GET', '/public/discounts.json')
      .then((response) => {
        expect(response).to.have.property('status', 200)
      })
  })
})
