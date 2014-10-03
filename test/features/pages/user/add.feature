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

Scenario: Entering a longer invalid user name displays an error

    Given I am logged in
    And I visit the add user page
    And I enter 'under-the-sea@dance' in the 'local' field
    When I click the 'Add User' button
    Then I see error message 'You must enter a valid user name'

Scenario: Entering a user name which is too long returns error

    Given I am logged in
    And I visit the add user page
    And I enter '01234567890123456789012345678901234567890123456789012345678901234567890123456789' in the 'local' field
    When I click the 'Add User' button
    Then I see error message 'You must enter a valid user name'
    
Scenario: Attempt to create 'admin' user returns error

    Given I am logged in
    And I visit the add user page
    And I enter 'admin' in the 'local' field
    And I click the 'Add User' button
    Then I see error message 'Sorry, this is a restricted user'
    
@database=database-error
Scenario: A database error returns expected message

    Given I am logged in
    And I visit the add user page
    And I enter 'mrstrickland' in the 'local' field
    When I click the 'Add User' button
    Then I see error message 'We experienced a server problem, apologies!'

@database=no-results
Scenario: No results shows expected error message (i.e. not an admin)

    Given I am logged in
    And I visit the add user page
    And I enter 'mrstrickland' in the 'local' field
    When I click the 'Add User' button
    Then I see error message 'You are not an admin and therefore can not add a user'

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
    Then I see error message 'Error adding user, please contact support'

@database=is-admin
@xmpp=add-user-already-exists
Scenario: User already exists returns an error

    Given I am logged in
    And I visit the add user page
    And I enter 'mrstrickland' in the 'local' field
    When I click the 'Add User' button
    Then I see error message 'User already exists'

@database=is-admin
@xmpp=add-user-success
Scenario: Shows error if user does not exist

    Given I am logged in
    And I visit the add user page
    And I enter 'mrstrickland' in the 'local' field
    When I click the 'Add User' button
    Then I see success message 'User has been created, see below for details'
    And I see the added user details

@database=is-admin
@xmpp=add-user-success
Scenario: I can toggle password visibility

    Given I am logged in
    And I visit the add user page
    And I enter 'mrstrickland' in the 'local' field
    When I click the 'Add User' button
    Then the new password has class 'hide-password-dark'
    And I click the new password
    And the new password does not have class 'hide-password-dark'
    And I click the new password
    And the new password has class 'hide-password-dark'