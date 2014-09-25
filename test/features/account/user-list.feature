Feature: User list

@database=database-error
Scenario: A database error returns expected message

    Given I am logged in
    And I click the 'Users' link
    Then I see danger message 'We experienced a server problem, apologies!'
    
@Pending
Scenario: No results shows expected error message (i.e. not an admin)

    Given I am logged in
    
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
