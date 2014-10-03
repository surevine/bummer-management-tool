Feature: Add an admin

Scenario: I am kicked from admin page when not logged in

    Given I visit the add admin page
    Then I am redirected to the login page

Scenario: Can see the add admin page

    Given I am logged in 
    When I click the 'Add Admin' link
    Then I see the add admin page

Scenario: Not entering a username displays an error

    Given I am logged in
    And I visit the add admin page
    When I click the 'Add Admin' button
    Then I see error message 'You must enter a valid user name'

Scenario: Entering an invalid user name displays an error

    Given I am logged in
    And I visit the add admin page
    And I enter '💩' in the 'local' field
    When I click the 'Add Admin' button
    Then I see error message 'You must enter a valid user name'

Scenario: Entering a longer invalid user name displays an error

    Given I am logged in
    And I visit the add admin page
    And I enter 'under-the-sea@dance' in the 'local' field
    When I click the 'Add Admin' button
    Then I see error message 'You must enter a valid user name'

Scenario: Entering a user name which is too long returns error

    Given I am logged in
    And I visit the add admin page
    And I enter '01234567890123456789012345678901234567890123456789012345678901234567890123456789' in the 'local' field
    When I click the 'Add Admin' button
    Then I see error message 'You must enter a valid user name'
    
Scenario: Attempt to add 'admin' user returns error

    Given I am logged in
    And I visit the add admin page
    And I enter 'admin' in the 'local' field
    And I click the 'Add Admin' button
    Then I see error message 'Sorry, this is a restricted user'
    
@database=database-error
Scenario: A database error returns expected message

    Given I am logged in
    And I visit the add admin page
    And I enter 'mrstrickland' in the 'local' field
    When I click the 'Add Admin' button
    Then I see error message 'We experienced a server problem, apologies!'

@database=no-results
Scenario: No results shows expected error message (i.e. not an admin)

    Given I am logged in
    And I visit the add admin page
    And I enter 'mrstrickland' in the 'local' field
    When I click the 'Add Admin' button
    Then I see error message 'You are not an admin and therefore can not obtain the admin list'

@database=is-admin,admins/is-admin
Scenario: Errors if user already exists

    Given I am logged in
    And I visit the add admin page
    And I enter 'mrstrickland' in the 'local' field
    When I click the 'Add Admin' button
    Then I see error message 'User is already an administrator'

@database=is-admin,admins/not-admin,database-error
Scenario: Generic database error returns error

    Given I am logged in
    And I visit the add admin page
    And I enter 'mrstrickland' in the 'local' field
    When I click the 'Add Admin' button
    Then I see error message 'We experienced a server problem, apologies!'

@database=is-admin,admins/not-admin,admins/success
Scenario: Can add an admin successfully

    Given I am logged in
    And I visit the add admin page
    And I enter 'mrstrickland' in the 'local' field
    When I click the 'Add Admin' button
    Then I see success message 'User has been added to list of administrators'
