describe('ToDo end-to-end tests', () => {
  it('tests if reset button clears the card', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#topic').type('1st test');
    cy.get('#priority').select('High');
    cy.get('#status').select('done');
    cy.get('#description').type('Testing if reset works correctly.');
    cy.get('#reset-btn').click();
    cy.get('#topic').should('have.value', '');
    cy.get('#priority').should('have.value', 'medium');
    cy.get('#status').should('have.value', 'todo');
    cy.get('#description').should('have.value', '');
  });

  it('tests if adding a new task works correctly', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#topic').type('2nd test');
    cy.get('#priority').select('Low');
    cy.get('#status').select('in-progress');
    cy.get('#description').type(
      'Testing if adding a new task works correctly.'
    );
    cy.get('#save-btn').click();
    cy.contains('2nd test').should('be.visible');
  });
});
