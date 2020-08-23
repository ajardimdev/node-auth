const bcrypt = require("bcryptjs");
const truncate = require("../utils/truncate");
const factory = require("../factories");
describe("Unit User Tests", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should encrypt user password", async () => {
    const user = await factory.create("User");
    const hashCompare = await bcrypt.compare(user.password, user.password_hash);
    expect(hashCompare).toBe(true);
  });
});
