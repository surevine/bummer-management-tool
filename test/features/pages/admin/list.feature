Feature: Admin list

Scenario: I am kicked from accounts page when not logged in

    Given I visit the admin list page
    Then I am redirected to the login page

@database=database-error
Scenario: A database error returns expected message

    Given I am logged in
    And I click the 'Admin List' link
    Then I see danger message 'We experienced a server problem, apologies!'
    And the user table has warning row 'There are currently no admins'

@database=no-results
Scenario: No results shows expected error message (i.e. not an admin)

    Given I am logged in
    And I click the 'Admin List' link
    Then I see danger message 'You are not an admin and therefore can not obtain the admin list'
    And the user table has warning row 'There are currently no admins'

@database=is-admin,admins/none
Scenario: No admins users shows expected table

    Given I am logged in
    And I click the 'Admin List' link
    Then the user table has warning row 'There are currently no admins'

@database=is-admin,admins/5-list
Scenario: Shows a list of admin users

    Given I am logged in
    And I click the 'Admin List' link
    Then the user table has 5 users    
 
@database=is-admin,admins/11-list
Scenario: Shows a list of admin users limited by the data table plugin

    Given I am logged in
    And I click the 'Admin List' link
    Then the user table has 10 users

@database=is-admin,admins/11-list
Scenario: Can filter the admin list table

    Given I am logged in
    And I click the 'Admin List' link
    When I search users for 'if'
    Then the user table has 2 users

@database=is-admin,admins/11-list
Scenario: Can show all results

    Given I am logged in
    And I click the 'Admin List' link
    When I select to view 25 users
    Then the user table has 11 users

@database=is-admin,admins/11-list
Scenario: I can skip to page 2

    Given I am logged in
    And I click the 'Admin List' link
    When I click the '2' link
    Then the user table has 1 users

@database=is-admin,admins/2-list
Scenario: Five users are required for the datatable plugin to load

    Given I am logged in
    And I click the 'Admin List' link
    Then I do not see the user search box

@database=is-admin,admins/11-list
Scenario: I can sort the results

    Given I am logged in
    And I click the 'Admin List' link
    When I click the 'Admin' header
    Then user-table row 1 contains 'strickland@localhost'
    And user-table row 2 contains 'sherman@localhost'
    And user-table row 3 contains 'marvin@localhost'