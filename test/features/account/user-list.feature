Feature: User list

@database=database-error
Scenario: A database error returns expected message

    Given I am logged in
    And I click the 'Users' link
    Then I see danger message 'We experienced a server problem, apologies!'
    And the user table has warning row 'You currently have no users'

@database=no-results
Scenario: No results shows expected error message (i.e. not an admin)

    Given I am logged in
    And I click the 'Users' link
    Then I see danger message 'You are not an admin and therefore can not obtain user details'
    And the user table has warning row 'You currently have no users in your system'
    
@Pending
Scenario: XMPP authentication error returns expected error

    Given I am logged in
    
@Pending
Scenario: XMPP error (functionality not available or similar) returns expected errror

    Given I am logged in
    
@Pending
Scenario: No XMPP users shows expected table

    Given I am logged in

@Pending
Scenario: Shows a list of XMPP users

    Given I am logged in
    
    
@Pending
Scenario: Does not show the admin user

   Given I am logged in
