const { expect } = require("chai");

describe("VotingSystem", function () {
    let VotingSystem, votingSystem, owner, addr1, addr2;
    
    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        VotingSystem = await ethers.getContractFactory("VotingSystem");
        votingSystem = await VotingSystem.deploy(["Alice", "Bob", "Charlie"]);
        // await votingSystem.deployed();   
    });

    it("Should allow a user to vote and track their vote", async function () {
        await votingSystem.connect(addr1).vote(1);
        expect(await votingSystem.hasVoted(addr1.address)).to.equal(true);
    });

    it("Should not allow double voting", async function () {
        await votingSystem.connect(addr1).vote(1);
        await expect(votingSystem.connect(addr1).vote(1)).to.be.revertedWith("You have already voted");
    });

    it("Should return the correct winner", async function () {
        await votingSystem.connect(addr1).vote(1);
        await votingSystem.connect(addr2).vote(1);
        expect(await votingSystem.getWinner()).to.equal("Bob");
    });
});
