import dayjs from 'dayjs'

const currentMonth = dayjs().format('DD/MM/YYYY')

describe('test_name', function() {

  it('User should log in successfully', function() {
 
  
      cy.visit('https://app.klausapp-staging.com/login')
    
      cy.get('[type="email"]').type('klaus-test-automation+fuku@klausapp-staging.com')
      
      //would be better to create a cookie and use it, instead of a plain text pw
      cy.get('[type="password"]').type('Fuku-T3stTask')
     
      cy.get('button[type=submit]').contains('Log in').click()

      cy.contains('.ticket-listing', 'Conversations').should('be.visible')
  
  })


  it('Sessions link should refer to Sessions page', () => {

    cy.get('button[data-testid="navbar-coaching"]').click()

    cy.get('[class="tippy-content"] div > a').eq(2)
      .should('have.attr', 'href').and('include', '/coaching/sessions')
    
    cy.get('[class="tippy-content"] div > a').eq(2).click({force: true})

    cy.get('h1').should(($h1) => {
      expect($h1.first()).to.have.text('Coaching insights')
    })

  })

  it('Create a new session', () => {

    cy.get('[data-testid="new-session-btn"]').click()

    //would be better to use a sequence number from dropdown to remove dependency
    cy.get('[data-testid="select-coachee"]').contains('Agent Songbird').click({force: true})

    cy.get('[data-testid="session-name-input"]').clear().type('Session created on '+currentMonth)

    cy.get('[type="tel"]').should('exist')

    cy.get('[data-testid="create-session-btn"]').click()

    cy.get('[class="toast__text"]').should('contain','A new session between Fuku and Agent Songbird has been created.')

  })

  it('Remove created session', () => {

    cy.get('[data-testid="session-actions"]').first().click()

    cy.get('button').contains('Remove').click()

    cy.get('button').contains('Delete').click()

  })

})