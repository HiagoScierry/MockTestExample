const userRepository = require("./userRepository");
const externalService = require("./externalService");

async function getUserWithDetails(userId) {
  const user = await userRepository.findById(userId);
  if (!user) throw new Error("User not found");

  const details = await externalService.getUserDetails(user.email);
  return { ...user, details };
}

module.exports = { getUserWithDetails };
