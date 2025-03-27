// Mock dependencies BEFORE importing the service
jest.mock("./userRepository");
jest.mock("./externalService");

const userService = require("./userService");
const userRepository = require("./userRepository");
const externalService = require("./externalService");

describe("UserService", () => {
  beforeEach(() => {
    // Reset mocks before each test to avoid cross-test pollution
    jest.clearAllMocks();
  });

  it("should return user data with additional details", async () => {
    // Mock database response
    userRepository.findById.mockResolvedValue({
      id: 1,
      name: "Hiago",
      email: "hiago@example.com",
    });

    // Mock external service response
    externalService.getUserDetails.mockResolvedValue({
      age: 26,
      location: "USA",
    });

    // Call the function
    const result = await userService.getUserWithDetails(1);

    // Verify the expected output
    expect(result).toEqual({
      id: 1,
      name: "Hiago",
      email: "hiago@example.com",
      details: { age: 26, location: "USA" },
    });

    // Ensure the correct functions were called with expected arguments
    expect(userRepository.findById).toHaveBeenCalledWith(1);
    expect(externalService.getUserDetails).toHaveBeenCalledWith("hiago@example.com");
  });

  it("should throw an error if user is not found", async () => {
    userRepository.findById.mockResolvedValue(null);

    await expect(userService.getUserWithDetails(1)).rejects.toThrow("User not found");
  });
});
