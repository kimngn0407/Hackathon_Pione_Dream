import hre from "hardhat";

const { ethers } = hre;

async function main() {
  const SensorOracle = await ethers.getContractFactory("SensorOracle");
  const contract = await SensorOracle.deploy();
  await contract.waitForDeployment();
  console.log("Deployed contract at:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

