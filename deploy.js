const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners(); 
    console.log(`Deploying contract with address: ${deployer.address}`);

    const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
    const votingSystem = await VotingSystem.deploy(["Alice", "Bob", "Charlie"]);
        
    await votingSystem.waitForDeployment();

    console.log(`VotingSystem deployed to: ${await votingSystem.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
