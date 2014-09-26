@Only
Feature: End user session

Scenario: I am kicked from end user session page when not logged in

    Given I visit the end session page of docbrown@localhost
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

@Pending
Scenario: Shows error if attempting to view user page for admin@$domain

    Given I am logged in
    And I visit the user page of admin@localhost
    Then I see error message 'Sorry, this is a restricted user'
    And the user table has warning row 'This user currently has no active sessions'

@Pending
@database=database-error
Scenario: A database error returns expected message

    Given I am logged in
    And I visit the user page of docbrown@localhost
    Then I see error message 'We experienced a server problem, apologies!'
    And the user table has warning row 'This user currently has no active sessions'

@Pending
@database=no-results
Scenario: No results shows expected error message (i.e. not an admin)

    Given I am logged in
    And I visit the user page of docbrown@localhost
    Then I see error message 'You are not an admin and therefore can not obtain user details'
    And the user table has warning row 'This user currently has no active sessions'

@database=is-admin-xmpp-fail
Scenario: XMPP authentication error returns expected error

    Given I am logged in
    And I visit the user page of docbrown@localhost
    Then I see danger message 'Could not access your XMPP account, please contact support'
    And the user table has warning row 'This user currently has no active sessions'

@Pending
@database=is-admin
@xmpp=user-stats-service-unavailable
Scenario: XMPP error (functionality not available or similar) returns expected errror

    Given I am logged in
    And I visit the user page of docbrown@localhost
    Then I see danger message 'Error retrieving user information, please contact support'
    And the user table has warning row 'This user currently has no active sessions'

@Pending
@database=is-admin
@xmpp=user-stats-no-resources
Scenario: No XMPP sessions shows expected table

    Given I am logged in
    And I visit the user page of docbrown@localhost
    Then the user table has warning row 'This user currently has no active sessions'

@Pending
@database=is-admin,is-admin
@xmpp=user-list-with-users,user-stats-no-resources
Scenario: Shows a the user information page

    Given I am logged in
    And I click the 'Users' link
    When I click to view information for user docbrown@localhost

@Pending
@database=is-admin
@xmpp=user-stats-with-resources
Scenario: Shows a list of XMPP resources

    Given I am logged in
    And I visit the user page of docbrown@localhost
    Then the user table has 5 resources    

@Pending
@database=is-admin
@xmpp=user-stats-with-11-resources
Scenario: Shows a list of resources limited by the data table plugin

    Given I am logged in
    And I visit the user page of docbrown@localhost
    Then the user table has 10 resources

@Pending
@database=is-admin
@xmpp=user-stats-with-11-resources
Scenario: Can filter the resource list table

    Given I am logged in
    And I visit the user page of docbrown@localhost
    When I search resources for 'lyon'
    Then the user table has 2 resources

@Pending
@database=is-admin
@xmpp=user-stats-with-11-resources
Scenario: Can show all results

    Given I am logged in
    And I visit the user page of docbrown@localhost
    When I select to view 25 resources
    Then the user table has 11 resources

@Pending
@database=is-admin
@xmpp=user-stats-with-11-resources
Scenario: I can skip to page 2

    Given I am logged in
    And I visit the user page of docbrown@localhost
    When I click the '2' link
    Then the user table has 1 resources

@Pending
@database=is-admin
@xmpp=user-stats-with-2-resources
Scenario: Five resources are required for the datatable plugin to load

    Given I am logged in
    And I visit the user page of docbrown@localhost
    Then I do not see the resource search box

@Pending
@database=is-admin
@xmpp=user-stats-with-11-resources
Scenario: I can sort the results

    Given I am logged in
    And I visit the user page of docbrown@localhost
    When I click the 'Resource' header
    Then user-table row 1 contains 'under-the-sea-dance'
    And user-table row 2 contains 'twin-pines-mall'
    And user-table row 3 contains 'oak-park-cemetery'
