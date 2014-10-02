Feature: Delete user

Scenario: I am kicked from delete user page when not logged in

    Given I visit the delete user page of docbrown@localhost
    Then I am redirected to the login page

Scenario: I am kicked from invalid user page when not logged in 

    Given I visit the delete user page
    Then I am redirected to the login page

@database=is-admin
@xmpp=user-list-no-users
Scenario: Not supplying a user JID redirects to user list page

    Given I am logged in
    And I visit the delete user page
    Then I am redirected to the user list page

@database=is-admin
@xmpp=user-list-no-users
Scenario: Redirects to user list page if an invalid JID is provided

    Given I am logged in
    And I visit the delete user page of not@a@valid@jid
    Then I am redirected to the user list page

@database=is-admin
@xmpp=user-list-no-users
Scenario: Redirects to user list page if a server JID is provided

    Given I am logged in
    And I visit the delete user page of localhost
    Then I am redirected to the user list page

@database=is-admin
@xmpp=user-list-no-users
Scenario: Redirects to user list page if a JID server does not match users

    Given I am logged in
    And I visit the delete user page of user@somewhere-else
    Then I am redirected to the user list page

@database=is-admin
@xmpp=user-list-no-users
Scenario: Redirects to user list page if a full JID is provided

    Given I am logged in
    And I visit the delete user page of docbrown@localhost/lyon-estates
    Then I am redirected to the user list page
 
@database=database-error,is-admin
@xmpp=user-stats-no-resources
Scenario: A database error returns expected message

    Given I am logged in
    And I visit the delete user page of docbrown@localhost
    Then I am redirected to the user page for docbrown@localhost
    And I see error message 'Error! User could not be deleted'

@database=no-results,is-admin
@xmpp=user-list-no-users
Scenario: No results shows expected error message (i.e. not an admin)

    Given I am logged in
    And I visit the delete user page of docbrown@localhost
    Then I see error message 'Error! User could not be deleted'
    And the user table has warning row 'This user currently has no active sessions'

@database=is-admin-xmpp-fail,is-admin
@xmpp=user-stats-no-resources
Scenario: XMPP authentication error returns expected error

    Given I am logged in
    And I visit the delete user page of docbrown@localhost
    Then I am redirected to the user page for docbrown@localhost
    And I see danger message 'Error! User could not be deleted'
    And the user table has warning row 'This user currently has no active sessions'

@database=is-admin,is-admin
@xmpp=delete-user-service-unavailable,user-stats-no-resources
Scenario: XMPP error (functionality not available or similar) returns expected error

    Given I am logged in
    And I visit the delete user page of docbrown@localhost
    Then I am redirected to the user page for docbrown@localhost
    And I see error message 'Error! User could not be deleted'

@database=is-admin,is-admin
@xmpp=user-does-not-exist,user-stats-no-resources
Scenario: User does not exist shows expected error

    Given I am logged in
    And I visit the delete user page of docbrown@localhost
    Then I am redirected to the user page for docbrown@localhost
    And I see error message 'Error! User could not be deleted'
    And the user table has warning row 'This user currently has no active sessions'

@database=is-admin,is-admin
@xmpp=delete-user-success,user-list-no-users
Scenario: User is deleted successfully from user info page

    Given I am logged in
    And I visit the delete user page of docbrown@localhost
    Then I am redirected to the user list page
    And I see success message 'Great! User account was deleted'

@database=is-admin
@xmpp=user-list-with-users
Scenario: Can dismiss the delete modal (user list)

    Given I am logged in
    And I click the 'User List' link
    And I click to delete a user
    When I see the delete user modal
    And I click the 'No' button in the 'delete-user' modal
    Then the delete user modal is closed
 
@database=is-admin
@xmpp=user-stats-with-2-resources
Scenario: Can dismiss the delete modal (user page)

    Given I am logged in
    And I visit the user page of docbrown@localhost
    And I click to delete a user
    When I see the delete user modal
    And I click the 'No' button in the 'delete-user' modal
    Then the delete user modal is closed

@database=is-admin,is-admin,is-admin
@xmpp=user-stats-with-resources,delete-user-success,user-list-no-users
Scenario: Can delete user from user info page

    Given I am logged in
    And I visit the user page of docbrown@localhost
    And I click to delete a user
    When I see the delete user modal
    And I click the 'Yes' button
    Then I am redirected to the user list page
    And I see success message 'Great! User account was deleted'

@database=is-admin,is-admin,is-admin
@xmpp=user-list-with-users,delete-user-success,user-list-no-users
Scenario: Can delete user from the user list page

    Given I am logged in
    And I visit the user list page
    And I click to delete a user
    When I see the delete user modal
    And I click the 'Yes' button
    Then I am redirected to the user list page
    And I see success message 'Great! User account was deleted'

@database=is-admin,is-admin,is-admin
@xmpp=user-list-with-users,delete-user-error,user-list-no-users
Scenario: Failure to delete from the user list page returns to user list page with error

    Given I am logged in
    And I visit the user list page
    And I click to delete a user
    When I see the delete user modal
    And I click the 'Yes' button
    Then I am redirected to the user list page
    And I see error message 'Error! User could not be deleted'

@database=is-admin,is-admin,is-admin
@xmpp=user-stats-with-resources,delete-user-error,user-stats-with-resources
Scenario: Failure to delete from user page returns there with error

    Given I am logged in
    And I visit the user page of docbrown@localhost
    And I click to delete a user
    When I see the delete user modal
    And I click the 'Yes' button
    Then I am redirected to the user page for docbrown@localhost
    And I see error message 'Error! User could not be deleted'

