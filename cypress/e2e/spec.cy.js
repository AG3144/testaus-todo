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

  it('tests task adding, deleting, and filtering', () => {
    cy.visit('http://localhost:5173/');
    // Add tasks with different priorities
    cy.get('#topic').type('Low priority task');
    cy.get('#priority').select('Low');
    cy.get('#save-btn').click();

    cy.get('#topic').type('Medium priority task');
    cy.get('#priority').select('Medium');
    cy.get('#save-btn').click();

    cy.get('#topic').type('High priority task');
    cy.get('#priority').select('High');
    cy.get('#save-btn').click();
    cy.wait(1000);

    // Filter by priorities and check visibility
    cy.get('[data-filter="low"]').click();
    cy.get('.prio-low').should('exist');
    cy.get('.prio-medium').should('not.exist');
    cy.get('.prio-high').should('not.exist');
    cy.wait(1000);

    cy.get('[data-filter="medium"]').click();
    cy.get('.prio-medium').should('exist');
    cy.get('.prio-low').should('not.exist');
    cy.get('.prio-high').should('not.exist');
    cy.wait(1000);

    cy.get('[data-filter="high"]').click();
    cy.get('.prio-high').should('exist');
    cy.get('.prio-low').should('not.exist');
    cy.get('.prio-medium').should('not.exist');
    cy.wait(1000);

    cy.get('[data-filter="all"]').click();
    cy.get('.prio-low').should('exist');
    cy.get('.prio-medium').should('exist');
    cy.get('.prio-high').should('exist');
    cy.wait(1000);

    // Delete a task and verify it's removed when filtered
    cy.contains('.task', 'High priority task').find('.danger').click();
    cy.get('[data-filter="high"]').click();
    cy.get('.prio-high').should('not.exist');
  });
});
