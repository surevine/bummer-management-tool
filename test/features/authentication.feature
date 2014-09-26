Feature: Authentication

Background:

    Given a fresh session
    
Scenario: Can log in successfully

    Given I visit the login page
    And I enter 'user@localhost' in the 'jid' field
    And I enter 'secret' in the 'password' field
    When I click the 'Sign in' button
    Then I am redirected to the account page

Scenario: I am kicked from /account when not logged in

    Given I visit the account page
    Then I am redirected to the login page

Scenario: Once logged in I am logged in

    Given I am logged in
    When I refresh the page
    Then I am redirected to the account page

Scenario: When I log out I am logged out

    Given I am logged in
    When I click the 'Logout' link
    And I visit the account page
    Then I am redirected to the login page
    And I see warning message 'You need to be logged in to see this page'
  
Scenario: I am log in from the top bar

    Given I visit the home page
    When I enter 'user@localhost' in the 'jid' field
    And I enter 'secret' in the 'password' field
    And I click the 'Sign in' button
    Then I am redirected to the account page
    
Scenario: Incorrect login details show me the login form and an error

    Given I visit the login page
    And I enter 'user@localhost' in the 'jid' field
    And I enter 'not-secret-at-all' in the 'password' field
    When I click the 'Sign in' button
    Then I am redirected to the login page
    And I see error message 'Username &/or password incorrect'