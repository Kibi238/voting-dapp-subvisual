import { expect } from "chai";
import pkg from "hardhat";

const { ethers } = pkg;
describe("Voting contract", () => {
  let Voting, voting, voter1;

  beforeEach(async () => {
    [, voter1] = await ethers.getSigners();
    Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy(["carolina", "other"]);
  });

  it("should allow a user to vote once", async () => {
    await voting.connect(voter1).vote(0);
    await expect(voting.connect(voter1).vote(1)).to.be.revertedWith(
      "you have already voted"
    );
  });
  it("should count votes correctly", async () => {
    await voting.connect(voter1).vote(0);
    const results = await voting.getVotes();
    expect(results[0]).to.equal(1);
  });
});
