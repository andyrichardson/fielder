beforeEach(() => {
  cy.visit('/');
});

describe('username', () => {
  it('changes value', () => {
    const value = 'hi';
    cy.get('input[name="username"]')
      .type(value)
      .should('have.value', value);
  });

  it('validates on blur', () => {
    cy.get('input[name="username"]')
      .type('hi')
      .blur()
      .next()
      .should('contain.text', 'Username must be at least 4 characters.');
  });

  it('updates validation on change', () => {
    cy.get('input[name="username"]')
      .type('hi')
      .blur()
      .type('hello there')
      .next()
      .should('not.contain.text', 'Username must be at least 4 characters.');
  });
});

describe('password', () => {
  it('changes value', () => {
    const value = 'hi';

    cy.get('input[name="password"]')
      .type(value)
      .should('have.value', value);
  });

  it('validates on blur', () => {
    cy.get('input[name="password"]')
      .type('hi')
      .blur()
      .next()
      .should('contain.text', 'Password must be at least 4 characters.');
  });

  it('updates validation on change', () => {
    cy.get('input[name="password"]')
      .type('hi')
      .blur()
      .type('hello there')
      .next()
      .should('not.contain.text', 'Password must be at least 4 characters.');
  });
});

describe('next button', () => {
  it('is disabled on mount', () => {
    cy.get('button').should('have.attr', 'disabled');
  });

  it('is enabled when fields are valid', () => {
    cy.get('input[name="username"]').type('hello there');
    cy.get('input[name="password"]').type('hello there');
    cy.get('button').should('not.have.attr', 'disabled');
  });

  it('is disabled when fields are invalid', () => {
    cy.get('input[name="username"]').type('hello there');
    cy.get('input[name="password"]').type('hello there');
    cy.get('input[name="password"]')
      .clear()
      .type('hi');
    cy.get('button').should('have.attr', 'disabled');
  });
});
