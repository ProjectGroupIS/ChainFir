const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Fir = await ethers.getContractFactory("Fir");
  const fir = await Fir.deploy(deployer.address);

//   await fir.deployed();

  console.log("Fir contract deployed to:", await fir.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
