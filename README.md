# Playwright E2E Testing Framework

This framework is designed for end-to-end testing using Playwright, featuring structured directories for pages, utilities, and decorators. It supports both UI and API testing.

## Project Structure

- **`pages/`** - Contains Page Object models for each page in your application. These classes encapsulate all interactions with the web page.
- **`tests/`** - Contains all test files, split into subdirectories for different types of tests (UI and API).
- **`utils/`** - Utility classes and functions, including a `HttpService` class for API interactions.
- **`decorators/`** - Decorator functions to enhance or modify behavior dynamically.
- **`strategies/`** - Strategy pattern implementations for various algorithms or actions.
- **`fluentInterfaces/`** - Fluent interfaces to enable method chaining for more readable code.

## Setup

Ensure Node.js is installed on your system, then install the dependencies:

```bash
npm install
```

## Configuration
Edit the playwright.config.js to match your specific testing environment, such as setting a different base URL or enabling/disabling certain browsers for testing.

## How to Implement
Pages
Create a new file in the pages/ directory for each page object:

```javascript
class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

module.exports = LoginPage;
```
## API Calls
Use the HttpService in the utils/ directory for making API requests:

```javascript
// utils/HttpService.js
const axios = require('axios');

class HttpService {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    get(url, params = {}) {
        return this.client.get(url, { params });
    }

    post(url, data = {}) {
        return this.client.post(url, data);
    }
}

module.exports = HttpService;
```
## Running Tests
To run your tests, use the Playwright test runner as configured in your package.json. For example:
```
npx playwright test exercisetwo.spec.js
```
or

```
npm run test
```
This command executes tests based on the configuration in playwright.config.js, which includes setting up browsers and reporting.

## Additional Information
For more advanced configurations and examples, refer to the official Playwright documentation.
