Feature: Authentication

@Pending
Scenario: Can log in successfully

    Given I visit the login page
    And I enter 'user@localhost' in the 'jid' field
    And I enter 'secret' in the 'password' field
    When I click the 'Sign in' button
    Then I am redirected to the account page

@Pending
Scenario: I am kicked from /account when not logged in

    Given I navigate to the account page
    Then I am redirected to the home page

@Pending   
Scenario: Once logged in I am logged in

    Given I am logged in
    When I refresh the page
    Then I am redirected to teh account page

@Pending   
Scenario: When I log out I am logged out

    Given I am logged in
    When I click 'Logout'
    And I navigate to the account page
    Then I am redirected to the home page

@Pending   
Scenario: I am log in from the top bar

    Given I visit the home page
    When I enter 'user@localhost' in the navigation 'jid' field
    And I enter 'secret' in the navigation 'password' field
    And I click the 'Sign in' button 