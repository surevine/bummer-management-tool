@Only
Feature: Add a user

Scenario: I am kicked from user page when not logged in

    Given I visit the add user page
    Then I am redirected to the login page

Scenario: Can see the add user page

    Given I am logged in 
    When I click the 'Add User' link
    Then I see the add user page

Scenario: Not entering a username displays an error

    Given I am logged in
    And I visit the add user page
    When I click the 'Add User' button
    Then I see error message 'You must enter a valid user name'

Scenario: Entering an invalid user name displays an error

    Given I am logged in
    And I visit the add user page
    And I enter '💩' in the 'local' field
    When I click the 'Add User' button
    Then I see error message 'You must enter a valid user name'

@database=database-error
Scenario: A database error returns expected message

    Given I am logged in
    And I visit the add user page
    And I enter 'mrstrickland' in the 'local' field
    When I click the 'Add User' button
    Then I see error message 'We experienced a server problem, apologies!'

@pending
@database=no-results
Scenario: No results shows expected error message (i.e. not an admin)

    Given I am logged in
    And I visit the add user page
    And I enter 'mrstrickland' in the 'local' field
    When I click the 'Add User' button
    Then I see error message 'You are not an admin and therefore can not obtain user details'

@database=is-admin-xmpp-fail
Scenario: XMPP authentication error returns expected error

    Given I am logged in
    And I visit the add user page
    And I enter 'mrstrickland' in the 'local' field
    When I click the 'Add User' button
    Then I see danger message 'Could not access your XMPP account, please contact support'

@database=is-admin
@xmpp=add-user-service-unavailable
Scenario: XMPP error (functionality not available or similar) returns expected error

    Given I am logged in
    And I visit the add user page
    And I enter 'mrstrickland' in the 'local' field
    When I click the 'Add User' button
    Then I see error message 'Error adding a user, please contact support'

@database=is-admin
@xmpp=add-user-already-exists
Scenario: User already exists returns an error

    Given I am logged in
    And I visit the add user page
    And I enter 'mrstrickland' in the 'local' field
    When I click the 'Add User' button
    Then I see error message 'User already exists, see mrstrickland@localhost'

@database=is-admin,is-admin
@xmpp=add-user-success,user-stats-no-resources
Scenario: Shows error if user does not exist

    Given I am logged in
    And I visit the add user page
    And I enter 'mrstrickland' in the 'local' field
    When I click the 'Add User' button
    Then I am redirected to the user page for mrstrickland@localhost
    And I see success message 'User created successfully'