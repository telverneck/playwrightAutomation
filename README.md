# Playwright Test Automation Framework

## Overview

This framework leverages Playwright for end-to-end testing, providing a robust, scalable, and maintainable solution for automated testing. It includes fixtures, page objects, and helper methods to enhance test structure and maintainability.

## Table of Contents

- [Setup and Installation](#Setup_and_Installation)
- [Dependencies](#Dependencies)
- [Test Execution](#Test_Execution)
- [Viewing Reports](#Viewing_Reports)
- [Additional Information](#Additional_Information)

# Setup and Installation

Prerequisites

Ensure Node.js (>=14.x) is installed. You can download it from Node.js Official Website.

Install a package manager (npm or yarn).

Install Git for version control (Git Official Website).

Installation Steps

Clone the repository:

git clone <repository-url>
cd <repository-folder>

Install dependencies:
```bash
npm install
```

Install Playwright browsers:
```bash
npx playwright install
```

Verify the setup:
```bash
npx playwright test --version
```

# Dependencies

Key Dependencies

Playwright: End-to-end testing library.

Playwright Test Runner: Integrated testing framework.

Typescript: Adds type safety.

DevDependencies

eslint: Ensures code quality.

prettier: Formats the code.

dotenv: Manages environment variables securely.

Install all dependencies listed in package.json during setup.

# Test Execution

Running Tests

To execute all tests:
```bash
npx playwright test 
```

To run a specific test file:
```bash
npx playwright test <path-to-test-file>
```

Viewing Test in a Browser

Run tests with the browser visible for debugging:
```bash
npx playwright test --headed
```

Running Tests in Debug Mode
```bash
npx playwright test --debug
```

# Viewing Reports

Generating Reports

Playwright HTML Report

By default, Playwright generates an HTML report after tests run. Open the report with:
```bash
npx playwright show-report
```

# Additional Information

Environment Variables

All sensitive data (e.g., credentials) are stored in a JSON  file. Please check testData.json file for more


## Folder Structure

tests/: Contains test files.

pages/: Page Object Model (POM) files for better test organization.

helpers/: Common helper methods.

NOTE: the pages/BasePage.ts file contain the main used functions like Click, fill field, etc

