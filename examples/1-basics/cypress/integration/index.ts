beforeEach(() => {
  cy.visit('/');
});

describe('username', () => {
  it('changes value', () => {
    const value = 'hi';
    const username = cy.get('input[name="username"]');

    username.focus().type(value);
    username.should('have.value', value);
  });

  it('validates on blur', () => {
    const username = cy.get('input[name="username"]');
    username
      .focus()
      .type('hi')
      .blur();
    username
      .next()
      .should('contain.text', 'Username must be at least 4 characters.');
  });

  it('updates validation on change', () => {
    const username = cy.get('input[name="username"]');
    username
      .focus()
      .type('hi')
      .blur();
    username.focus().type('hello there');
    username
      .next()
      .should('not.contain.text', 'Username must be at least 4 characters.');
  });
});

describe('password', () => {
  it('changes value', () => {
    const value = 'hi';
    const password = cy.get('input[name="password"]');

    password.focus().type(value);
    password.should('have.value', value);
  });

  it('validates on blur', () => {
    const password = cy.get('input[name="password"]');
    password
      .focus()
      .type('hi')
      .blur();
    password
      .next()
      .should('contain.text', 'Password must be at least 4 characters.');
  });

  it('updates validation on change', () => {
    const password = cy.get('input[name="password"]');
    password
      .focus()
      .type('hi')
      .blur();
    password.focus().type('hello there');
    password
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
