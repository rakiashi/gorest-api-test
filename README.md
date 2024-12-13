### GoRest api Test Assesment

This repository provides a comprehensive api testing framework using playwright and typescript for the GoRest v2 API, including:

- OpenAPI documentation for API specifications.
- Functional testing of CRUD operations and generic api tests of different status codes
- Schema validation, logging api response and reporting using built in playwright report
- Automated workflows with GitHub Actions.

### Project-Structure

gorest-api-test/

    ├── enviornments/
    │   ├── .env.develop                # Environment variables for the development environment
    │   ├── .env.prod                   # Environment variables for the production environment
    ├── api-test/
    │   ├── tests/
    |   |     ├── goRest-CRUD.test.ts   # CRUD Functional test cases
    │   |     ├── goRest-tests.test.ts  # Generic Functional test cases of different status codes
    |   ├──schemas/                     # Request and Response JSON schema files
    │   ├──utils/                       # Services , Test-Data and resuable files
    │       ├── services                # Services
    │       ├── test-data               # test-data for api requests
    ├── playwright-report               # Playwright report
    ├── .github/
    │   └── workflows/                  # GitHub Actions workflows
    ├── goRest-OpenApi.yaml             # OpenAPI specification
    ├── package.json                    # NPM dependencies and scripts
    └── README.md                       # Project documentations

### Usage

**_Swagger/OpenAPI Documentation_**

The openapi.yml file documents all API endpoints. Use any Swagger UI tool to render it as interactive API documentation:

- Open openapi.yml in an editor.
- Use an online Swagger Editor: *https://editor.swagger.io.*
- Explore, validate, and visualize API endpoints.

**_Testing Functionality_**

- Functional tests for CRUD operations and error handling are implemented in the *[./api-test/tests/]* directory using Playwright + TypeScript.
- Data-driven tests utilize JSON *[test-data.json]* with custom dynamic email and reusable methods.
- JSON schema validator for api response and logging the response to playwright report for ease debugging.

### Setup and Installation

- node version\* -> v22.0.x
- git
- npm

### Installation Steps

- Use _git clone https://github.com/rakiashi/gorest-api-test.git_
- Unzip the project and navigate to project directory from your terminal
- Install dependencies using npm command
  ```bash
   npm install
  ```
- Run Functional tests on production enviornement for CRUD operations using npm command 
  ```bash
   npm run test:prod:crud
  ```
- To view/open latest tests report of playwright use npm command 
  ```bash
   npm run test:report:open
  ```

### Github Actions

- The github action workflow file is located in directory .github/workflows file name nodjs.yml
- The workflow is triggered on every push to main branch or when a pull request is created
- The workflow consist of jobs: 
-  Run Lint              # which performs lint checks using the command *npm run lint*
-  Run CRUD Tests        # Run CRUD tests with the command *npm run test:prod:crud* , but only if the lint job completes successfully
-  Run Regression Tests  # Runs regression tests only if the CRUD tests job succeeds, using the command: *npm run test:prod:regression*.
