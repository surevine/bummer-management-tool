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