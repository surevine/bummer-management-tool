Feature: Remove admin

Scenario: I am kicked from remove admin page when not logged in

    Given I visit the remove admin page of docbrown@localhost
    Then I am redirected to the login page

Scenario: I am kicked from remove admin page when not logged in 

    Given I visit the remove admin page
    Then I am redirected to the login page

@database=is-admin,admins/11-list
Scenario: Not supplying a user JID redirects to admin list page

    Given I am logged in
    And I visit the remove admin page
    Then I am redirected to the admin list page

@database=is-admin,admins/11-list
Scenario: Redirects to admin list page if an invalid JID is provided

    Given I am logged in
    And I visit the remove admin page of not@a@valid@jid
    Then I am redirected to the admin list page

@database=is-admin,admins/11-list
Scenario: Redirects to admin list page if a server JID is provided

    Given I am logged in
    And I visit the remove admin page of localhost
    Then I am redirected to the admin list page

@database=is-admin,admins/11-list
Scenario: Redirects to admin list page if a JID server does not match users

    Given I am logged in
    And I visit the remove admin page of user@somewhere-else
    Then I am redirected to the admin list page

@database=is-admin,admins/11-list
Scenario: Redirects to admin list page if a full JID is provided

    Given I am logged in
    And I visit the remove admin page of docbrown@localhost/lyon-estates
    Then I am redirected to the admin list page

@database=database-error,is-admin,admins/11-list
Scenario: A database error returns expected message

    Given I am logged in
    And I visit the remove admin page of docbrown@localhost
    Then I am redirected to the admin list page
    And I see error message 'Error! Administrator could not be removed'

@database=is-admin,admins/multi-admin,admins/success,is-admin,admins/11-list
Scenario: Admin is removed successfully

    Given I am logged in
    And I visit the remove admin page of docbrown@localhost
    Then I am redirected to the admin list page
    And I see success message 'Great! Administrator was removed successfully'

@database=is-admin,admins/11-list
Scenario: Can dismiss the remove modal

    Given I am logged in
    And I click the 'Admin List' link
    And I click to remove an admin
    When I see the remove admin modal
    And I click the 'No' button in the 'remove-admin' modal
    Then the remove admin modal is closed

@database=is-admin,admins/11-list,is-admin,admins/multi-admin,admins/success,is-admin,admins/11-list
Scenario: Can remove admin from the admin list page

    Given I am logged in
    And I visit the admin list page
    And I click to remove an admin
    When I see the remove admin modal
    And I click the 'Yes' button in the 'remove-admin' modal
    Then I am redirected to the admin list page
    And I see success message 'Great! Administrator was removed successfully'

@database=is-admin,admins/11-list,is-admin,database-error,is-admin,admins/11-list
Scenario: Failure to delete from the admin list page returns to admin list page with error

    Given I am logged in
    And I visit the admin list page
    And I click to remove an admin
    When I see the remove admin modal
    And I click the 'Yes' button in the 'remove-admin' modal
    Then I am redirected to the admin list page
    And I see error message 'Error! Administrator could not be removed'

@database=is-admin,admins/11-list,is-admin,admins/11-list
Scenario: Can not remove oneself as an administrator

    Given I am logged in
    And I visit the admin list page
    When I search users for 'marty'
    And I click to remove an admin
    When I see the remove admin modal
    And I click the 'Yes' button in the 'remove-admin' modal
    Then I am redirected to the admin list page
    And I see error message 'Hold on! You can not remove yourself as an administrator'

@database=is-admin,admins/single-admin,is-admin,admins/11-list
Scenario: Can not remove if there's only one administrator

    Given I am logged in
    And I visit the remove admin page of docbrown@localhost
    Then I am redirected to the admin list page
    And I see error message 'Stop! There must be at least one administrator'
