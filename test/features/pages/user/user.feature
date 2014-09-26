Feature: User page

Scenario: I am kicked from user page when not logged in

    Given I visit the user page of docbrown@localhost
    Then I am redirected to the login page

Scenario: I am kicked from invalid user page when not logged in 

    Given I visit the user page
    Then I am redirected to the login page
    
@database=is-admin
@xmpp=user-list-no-users
Scenario: Not supplying a user JID redirects to user list page

    Given I am logged in
    And I visit the user page
    Then I am redirected to the user list page

@database=is-admin
@xmpp=user-list-with-users
Scenario: Shows a the user information page

    Given I am logged in
    And I click the 'Users' link
    When I click to view information for user docbrown@localhost
    Then I see the user information page

Scenario: Shows error if attempting to view user page for admin@$domain

    Given I am logged in
    When I visit the user page of admin@localhost
    Then I see error message 'Sorry, this is a restricted user'
    And the user table has warning row 'This user currently has no active sessions'
