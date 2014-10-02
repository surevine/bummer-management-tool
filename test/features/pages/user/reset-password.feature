Feature: Reset password

Scenario: I am kicked from reset password page when not logged in

    Given I visit the reset password page of docbrown@localhost
    Then I am redirected to the login page

Scenario: Not supplying a user JID shows an error

    Given I am logged in
    And I visit the reset password page
    Then the JSON response has property 'error' with value 'No JID provided'

Scenario: Shows an error if an invalid JID is provided

    Given I am logged in
    And I visit the reset password page of not@a@valid@jid
    Then the JSON response has property 'error' with value 'Invalid JID provided'

Scenario: Shows an error if a server JID is provided

    Given I am logged in
    And I visit the reset password page of localhost
    Then the JSON response has property 'error' with value 'Invalid JID provided'


Scenario: Shows an error if server JID does not match users

    Given I am logged in
    And I visit the reset password page of user@somewhere-else
    Then the JSON response has property 'error' with value 'Invalid JID provided'

Scenario: Shows error if a full JID is provided

    Given I am logged in
    And I visit the reset password page of docbrown@localhost/lyon-estates
    Then the JSON response has property 'error' with value 'Invalid JID provided'

Scenario: Can not reset password for admin

    Given I am logged in
    And I visit the reset password page of admin@localhost
    Then the JSON response has property 'error' with value 'Sorry, this is a restricted user'
    
@database=database-error
Scenario: A database error returns expected message

    Given I am logged in
    And I visit the reset password page of docbrown@localhost
    Then the JSON response has property 'error' with value 'Unable to reset password'

@database=no-results
Scenario: No results shows expected error message (i.e. not an admin)

    Given I am logged in
    And I visit the reset password page of docbrown@localhost
    Then the JSON response has property 'error' with value 'Unable to reset password'
    
@database=is-admin-xmpp-fail
Scenario: XMPP authentication error returns expected error

    Given I am logged in
    And I visit the reset password page of docbrown@localhost
    Then the JSON response has property 'error' with value 'Unable to reset password'

@database=is-admin
@xmpp=reset-password-service-unavailable
Scenario: XMPP error (functionality not available or similar) returns expected error

    Given I am logged in
    And I visit the reset password page of docbrown@localhost
    Then the JSON response has property 'error' with value 'Unable to reset password'

@database=is-admin
@xmpp=user-does-not-exist
Scenario: User does not exist shows expected error

    Given I am logged in
    And I visit the reset password page of docbrown@localhost
    Then the JSON response has property 'error' with value 'Unable to reset password'

@database=is-admin
@xmpp=reset-password-success
Scenario: Password reset successfully shows expected page

    Given I am logged in
    And I visit the reset password page of docbrown@localhost
    Then the JSON response has property 'password' which matches '^[a-z0-9A-Z]{4}-[a-z0-9A-Z]{4}-[a-z0-9A-Z]{4}-[a-z0-9A-Z]{4}$'

@database=is-admin
@xmpp=user-list-with-users
Scenario: Can dismiss the reset user password modal (user list)

    Given I am logged in
    And I click the 'User List' link
    And I click to reset a user password
    When I see the password reset modal
    And I click the 'No' button in the 'reset-user-password' modal
    Then the password reset modal is closed
 
@database=is-admin
@xmpp=user-stats-with-2-resources
Scenario: Can dismiss the password reset modal (user page)

    Given I am logged in
    And I visit the user page of docbrown@localhost
    And I click to reset a user password
    When I see the password reset modal
    And I click the 'No' button in the 'reset-user-password' modal
    Then the password reset modal is closed

@database=is-admin,is-admin
@xmpp=user-stats-with-resources,reset-password-success
Scenario: Can reset a password from user info page

    Given I am logged in
    And I visit the user page of docbrown@localhost
    And I click to reset a user password
    When I see the password reset modal
    And I click the 'Yes' button in the 'reset-user-password' modal
    Then the password reset modal is closed
    And I see the password reset success modal
    And I see element '#reset-user-password-success p.jid' with value 'docbrown@localhost'
    And I see element '#reset-user-password-success p.hide-password' with value matching '^[a-z0-9A-Z]{4}-[a-z0-9A-Z]{4}-[a-z0-9A-Z]{4}-[a-z0-9A-Z]{4}$'

@database=is-admin,is-admin
@xmpp=user-list-with-users,reset-password-success
Scenario: Can reset a password from the user list page

    Given I am logged in
    And I visit the user list page
    And I click to reset a user password
    When I see the password reset modal
    And I click the 'Yes' button in the 'reset-user-password' modal
    Then the password reset modal is closed
    And I see the password reset success modal
    And I see element '#reset-user-password-success p.jid' with value 'docbrown@localhost'
    And I see element '#reset-user-password-success p.hide-password' with value matching '^[a-z0-9A-Z]{4}-[a-z0-9A-Z]{4}-[a-z0-9A-Z]{4}-[a-z0-9A-Z]{4}$'

@database=is-admin,is-admin
@xmpp=user-list-with-users,reset-password-error
Scenario: Failure to reset a password shows expected error

    Given I am logged in
    And I visit the user list page
    And I click to reset a user password
    When I see the password reset modal
    And I click the 'Yes' button in the 'reset-user-password' modal
    Then the password reset modal is closed
    And I see the password reset fail modal
    And I see error message 'Error! Unable to reset password'
    
@database=is-admin,is-admin
@xmpp=user-list-with-users,reset-password-success
Scenario: Can toggle password visibility

    Given I am logged in
    And I visit the user list page
    And I click to reset a user password
    When I see the password reset modal
    And I click the 'Yes' button in the 'reset-user-password' modal
    Then the password reset modal is closed
    And I see the password reset success modal
    And the new password has class 'hide-password-dark'
    And I click the new password
    And the new password does not have class 'hide-password-dark'
    And I click the new password
    And the new password has class 'hide-password-dark'
