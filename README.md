# Node.js Mock Example with Jest

This is a sample project demonstrating how to use **Jest** to mock dependencies such as database access and external services in a **Node.js** application. The focus is on unit testing and mocking behaviors, ensuring that external dependencies do not affect the logic of your application during testing.

## Features

- Mocking **database access** (e.g., using a repository layer).
- Mocking **external API calls** (e.g., using a service layer).
- Testing business logic without hitting real databases or APIs.
- Easy setup with **Jest** for running unit tests.

## Installation

1. **Clone the repository**:
    ```bash
    git clone git@github.com:HiagoScierry/MockTestExample.git
    cd MockTestExample
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

## Running the Tests

Once you’ve installed the dependencies, you can run the unit tests using Jest:

```bash
npm test
```

Jest will automatically find and run the tests in the project.

## Project Structure

- `userRepository.js`: The file simulates database access. In this example, it includes a method to find a user by ID.
- `externalService.js`: The file simulates interaction with an external API. Here, it includes a method to fetch user details.
- `userService.js`: The business logic layer that combines data from the repository and the external service.
- `userService.test.js`: The Jest test file where mocks are applied to isolate the tests from real dependencies.

## How the Mocks Work

- **`jest.mock()`** is used to replace the actual database and external service methods with mocked implementations.
- The mock functions are defined to resolve with specific values, ensuring that the business logic is tested without actual network/database calls.
- **`mockResolvedValue()`** is used to simulate resolved promises, mimicking successful database and API responses.

## Example Test Case

```javascript
it("should return user data with additional details", async () => {
  // Mock database response
  userRepository.findById.mockResolvedValue({
    id: 1,
    name: "John",
    email: "john@example.com",
  });

  // Mock external service response
  externalService.getUserDetails.mockResolvedValue({
    age: 30,
    location: "USA",
  });

  const result = await userService.getUserWithDetails(1);

  expect(result).toEqual({
    id: 1,
    name: "John",
    email: "john@example.com",
    details: { age: 30, location: "USA" },
  });
});
```

## Technologies Used

- **Node.js**: JavaScript runtime for building the application.
- **Jest**: A testing framework to run unit tests and mocks.

## Contributing

Feel free to open issues or make pull requests if you'd like to contribute to the project or suggest improvements!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

