beforeEach(() => {
  cy.visit('/');
});

describe('username', () => {
  it('changes value', () => {
    const value = 'hi';
    cy.get('input[name="username"]').type(value).should('have.value', value);
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
      .should('not.exist');
  });
});

describe('password', () => {
  it('changes value', () => {
    const value = 'hi';

    cy.get('input[name="password"]').type(value).should('have.value', value);
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
      .should('not.exist');
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
    cy.get('input[name="password"]').clear().type('hi');
    cy.get('button').should('have.attr', 'disabled');
  });
});

describe('submit validation', () => {
  it('shows loading state', () => {
    cy.get('input[name="username"]').type('hello there');
    cy.get('input[name="password"]').type('hello there');
    cy.get('button').click();
    cy.get('button').should('have.text', '...');
  });

  it('shows alert on completion', () => {
    let alerts = 0;
    cy.on('window:alert', () => {
      alerts += 1;
    });

    cy.get('input[name="username"]').type('hello there');
    cy.get('input[name="password"]').type('hello there');
    cy.get('button').click();

    cy.log('Checking for button to return from fetching state');
    cy.get('button')
      .should('have.text', 'Next')
      .then(() => expect(alerts).to.eq(1));

    cy.log('Checking for no validation errors');
    cy.get('input[name="username"]').next().should('not.exist');
  });

  it('shows error on fail', () => {
    cy.get('input[name="username"]').type('taken');
    cy.get('input[name="password"]').type('hello there');
    cy.get('button').click();

    cy.log('Checking for button to return from fetching state');
    cy.get('button').should('have.text', 'Next');

    cy.log('Checking for no validation errors');
    cy.get('input[name="username"]')
      .next()
      .should('contain.text', 'Username is already taken');
  });
});
