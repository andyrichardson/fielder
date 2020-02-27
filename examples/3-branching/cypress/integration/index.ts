beforeEach(() => {
  cy.visit('/');
});

describe('email', () => {
  it('changes value', () => {
    const value = 'hi';

    cy.get('input[name="email"]')
      .type(value)
      .should('have.value', value);
  });

  it('validates on blur', () => {
    cy.get('input[name="email"]')
      .focus()
      .blur()
      .next()
      .should('contain.text', 'Email is required');
  });

  it('progression is disabled', () => {
    cy.get('button').should('have.attr', 'disabled');
  });
});

describe('login', () => {
  const email = 'user@mail.com';

  beforeEach(() => {
    cy.get('input[name="email"]').type(email);
    cy.get('button').click();
  });

  it('has email', () => {
    cy.get('input[name="email"]').should('have.value', email);
  });

  it('logs in', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get('input[name="password"]').type('password');
    cy.get('button')
      .click()
      .then(() => {
        expect(stub).to.be.called;
      });
  });
});

describe('register', () => {
  const email = 'someone@mail.com';

  beforeEach(() => {
    cy.get('input[name="email"]').type(email);
    cy.get('button').click();
  });

  it('has email', () => {
    cy.get('input[name="email"]').should('have.value', email);
  });

  it('registers', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get('input[name="name"]').type('Carl');
    cy.get('input[name="password"]').type('password');
    cy.get('button')
      .click()
      .then(() => {
        expect(stub).to.be.called;
      });
  });
});
