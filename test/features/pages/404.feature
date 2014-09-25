Feature: File not found

Scenario: I get a 404 as expected

    Given I visit a random page
    Then the browser returns 404 page