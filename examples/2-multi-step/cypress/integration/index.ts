beforeEach(() => {
  cy.visit('/');
});

describe('auth info', () => {
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
        .should('not.contain.text', 'Username must be at least 4 characters.');
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
        .should('not.contain.text', 'Password must be at least 4 characters.');
    });
  });

  describe('password confirmation', () => {
    it('changes value', () => {
      const value = 'hi';

      cy.get('input[name="passwordConfirmation"]')
        .type(value)
        .should('have.value', value);
    });

    it('validates (cross form) on blur', () => {
      cy.get('input[name="password"]').type('validpassword');

      cy.get('input[name="passwordConfirmation"]')
        .type('hi')
        .blur()
        .next()
        .should('contain.text', 'Password does not match');
    });

    it('updates validation (cross form) on change', () => {
      const value = 'validpassword';
      cy.get('input[name="password"]').type(value).blur();

      cy.get('input[name="passwordConfirmation"]')
        .type('hi')
        .blur()
        .clear()
        .type(value)
        .next()
        .should('not.contain.text', 'Password does not match.');
    });

    it('updates validation (cross form) on form-wide change', () => {
      const value = 'validpassword';

      cy.get('input[name="password"]').type('somegibberish').blur();

      cy.get('input[name="passwordConfirmation"]').type(value).blur();

      cy.get('input[name="password"]').clear().type(value);

      cy.get('input[name="passwordConfirmation"]')
        .next()
        .should('not.contain.text', 'Password does not match.');
    });
  });

  describe('next button', () => {
    it('is disabled on mount', () => {
      cy.get('button').should('have.attr', 'disabled');
    });

    it('is enabled when fields are valid', () => {
      cy.get('input[name="username"]').type('hello there');
      cy.get('input[name="password"]').type('hello there');
      cy.get('input[name="passwordConfirmation"]').type('hello there');
      cy.get('button').should('not.have.attr', 'disabled');
    });
  });
});

describe('terms section', () => {
  beforeEach(() => {
    cy.get('input[name="username"]').type('hello there');
    cy.get('input[name="password"]').type('hello there');
    cy.get('input[name="passwordConfirmation"]').type('hello there');
    cy.get('button').click();
  });

  describe('marketing checkbox', () => {
    it('is checked', () => {
      cy.get('input[value="marketing"]').should('be.checked');
    });

    it('toggles on click', () => {
      cy.get('input[value="marketing"]').click().should('not.be.checked');
    });
  });

  describe('submit button', () => {
    it('is disabled on mount', () => {
      cy.get('button').should('have.attr', 'disabled');
    });

    it('is enabled when legal terms are checked', () => {
      cy.get('input[value="legal"]').click();
      cy.get('button').should('not.have.attr', 'disabled');
    });
  });
});
