Feature: User list

Scenario: I am kicked from accounts page when not logged in

    Given I visit the user list page
    Then I am redirected to the login page

@database=database-error
Scenario: A database error returns expected message

    Given I am logged in
    And I click the 'User List' link
    Then I see danger message 'We experienced a server problem, apologies!'
    And the user table has warning row 'You currently have no users'

@database=no-results
Scenario: No results shows expected error message (i.e. not an admin)

    Given I am logged in
    And I click the 'User List' link
    Then I see danger message 'You are not an admin and therefore can not obtain user details'
    And the user table has warning row 'You currently have no users in your system'

@database=is-admin-xmpp-fail
Scenario: XMPP authentication error returns expected error

    Given I am logged in
    And I click the 'User List' link
    Then I see danger message 'Could not access your XMPP account, please contact support'
    And the user table has warning row 'You currently have no users in your system'

@database=is-admin
@xmpp=user-list-service-unavailable
Scenario: XMPP error (functionality not available or similar) returns expected error

    Given I am logged in
    And I click the 'User List' link
    Then I see danger message 'Error retrieving user data, please contact support'
    And the user table has warning row 'You currently have no users in your system'
 
@database=is-admin
@xmpp=user-list-no-users
Scenario: No XMPP users shows expected table

    Given I am logged in
    And I click the 'User List' link
    Then the user table has warning row 'You currently have no users in your system'

@database=is-admin
@xmpp=user-list-with-users
Scenario: Shows a list of XMPP users

    Given I am logged in
    And I click the 'User List' link
    Then the user table has 5 users    

@database=is-admin
@xmpp=user-list-with-users
Scenario: Does not show the admin user

    Given I am logged in
    And I click the 'User List' link
    Then the user table has 5 users
    And none of the users is 'admin@localhost'
    
@database=is-admin
@xmpp=user-list-with-11-users
Scenario: Shows a list of XMPP users limited by the data table plugin

    Given I am logged in
    And I click the 'User List' link
    Then the user table has 10 users

@database=is-admin
@xmpp=user-list-with-11-users
Scenario: Can filter the user list table

    Given I am logged in
    And I click the 'User List' link
    When I search users for 'if'
    Then the user table has 2 users

@database=is-admin
@xmpp=user-list-with-11-users
Scenario: Can show all results

    Given I am logged in
    And I click the 'User List' link
    When I select to view 25 users
    Then the user table has 11 users

@database=is-admin
@xmpp=user-list-with-11-users
Scenario: I can skip to page 2

    Given I am logged in
    And I click the 'User List' link
    When I click the '2' link
    Then the user table has 1 users

@database=is-admin
@xmpp=user-list-with-2-users
Scenario: Five users are required for the datatable plugin to load

    Given I am logged in
    And I click the 'User List' link
    Then I do not see the user search box

@database=is-admin
@xmpp=user-list-with-11-users
Scenario: I can sort the results

    Given I am logged in
    And I click the 'User List' link
    When I click the 'User' header
    Then user-table row 1 contains 'strickland@localhost'
    And user-table row 2 contains 'sherman@localhost'
    And user-table row 3 contains 'marvin@localhost'