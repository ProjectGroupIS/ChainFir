const { ethers } = require("hardhat");

async function main() {
const [deployer] = await ethers.getSigners();
console.log("Deploying with:", deployer.address);
console.log("Balance:", (await deployer.provider.getBalance(deployer.address)).toString());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });