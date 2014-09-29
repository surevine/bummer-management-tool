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
    And I visit the end session page
    Then I am redirected to the user list page

@database=is-admin
@xmpp=user-list-no-users
Scenario: Redirects to user list page if an invalid JID is provided

    Given I am logged in
    And I visit the end session page of not@a@valid@jid
    Then I am redirected to the user list page

@database=is-admin
@xmpp=user-list-no-users
Scenario: Redirects to user list page if a server JID is provided

    Given I am logged in
    And I visit the end session page of localhost
    Then I am redirected to the user list page

@database=is-admin
@xmpp=user-list-no-users
Scenario: Redirects to user list page if a JID server does not match users

    Given I am logged in
    And I visit the end session page of user@somewhere-else
    Then I am redirected to the user list page

@database=database-error,is-admin
@xmpp=user-stats-no-resources
Scenario: A database error returns expected message

    Given I am logged in
    And I visit the end session page of docbrown@localhost
    Then I am redirected to the user page for docbrown@localhost
    And I see error message 'We experienced a server problem, apologies!'

@database=no-results,is-admin
@xmpp=user-list-no-users
Scenario: No results shows expected error message (i.e. not an admin)

    Given I am logged in
    And I visit the end session page of docbrown@localhost
    Then I see error message 'You are not an admin and therefore can not obtain user details'
    And the user table has warning row 'This user currently has no active sessions'

@database=is-admin-xmpp-fail,is-admin
@xmpp=user-stats-no-resources
Scenario: XMPP authentication error returns expected error

    Given I am logged in
    And I visit the end session page of docbrown@localhost
    Then I am redirected to the user page for docbrown@localhost
    And I see danger message 'Error retrieving user information, please contact support'
    And the user table has warning row 'This user currently has no active sessions'

@database=is-admin,is-admin
@xmpp=session-end-service-unavailable,user-stats-no-resources
Scenario: XMPP error (functionality not available or similar) returns expected error

    Given I am logged in
    And I visit the end session page of docbrown@localhost
    Then I am redirected to the user page for docbrown@localhost
    And I see danger message 'Error retrieving user information, please contact support'
    And the user table has warning row 'This user currently has no active sessions'

@database=is-admin,is-admin
@xmpp=user-does-not-exist,user-stats-no-resources
Scenario: User does not exist shows expected error

    Given I am logged in
    And I visit the end session page of docbrown@localhost
    Then I am redirected to the user page for docbrown@localhost
    And I see danger message 'Error retrieving user information, please contact support'
    And the user table has warning row 'This user currently has no active sessions'

@database=is-admin,is-admin
@xmpp=session-cleared-successfully,user-stats-no-resources
Scenario: Session is cleared successfully

    Given I am logged in
    And I visit the end session page of docbrown@localhost
    Then I am redirected to the user page for docbrown@localhost
    And I see success message 'Session(s) ended successfully'
    And the user table has warning row 'This user currently has no active sessions'

@database=is-admin,is-admin,is-admin
@xmpp=user-stats-with-2-resources,session-cleared-successfully,user-stats-no-resources
Scenario: Can clear a single session

    Given I am logged in
    And I visit the user page of docbrown@localhost
    And I click to end a session
    When I see the end session modal
    And I click the 'End Session' button
    Then I am redirected to the user page for docbrown@localhost
    And I see success message 'Session(s) ended successfully'

@database=is-admin
@xmpp=user-stats-with-2-resources
Scenario: Can dismiss the end session modal

    Given I am logged in
    And I visit the user page of docbrown@localhost
    And I click to end a session
    When I see the end session modal
    And I click the 'No' button in the 'end-session' modal
    Then the end session modal is closed

@database=is-admin,is-admin,is-admin
@xmpp=user-stats-with-2-resources,session-cleared-successfully-bare-jid,user-stats-no-resources
Scenario: Can clear a all user sessions

    Given I am logged in
    And I visit the user page of docbrown@localhost
    And I click the 'Close all sessions' button
    When I see the end session modal
    And I click the 'End Session' button
    Then I am redirected to the user page for docbrown@localhost
    And I see success message 'Session(s) ended successfully'