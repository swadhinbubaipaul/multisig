// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
	const [owner1, owner2] = hre.ethers.getSigners();
	const MultiSigWallet = await hre.ethers.getContractFactory("MultiSigWallet");
	const multiSigWallet = await MultiSigWallet.deploy(
		[owner1.address, owner2.address],
		2
	);
	await multiSigWallet.deployed();
	console.log(`MultiSigWallet  deployed to ${multiSigWallet.address}`);

	const TestContract = await hre.ethers.getContractFactory("TestContract");
	const testContract = await TestContract.deploy(multiSigWallet.address);
	await testContract.deployed();
	console.log(`TestContract deployed to ${testContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
