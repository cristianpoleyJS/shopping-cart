context('Integration Services', () => {
  it('Get products', () => {
    cy.request('GET', '/public/products.json')
      .then((response) => {
        expect(response).to.have.property('status', 200)
      })
  })
})
