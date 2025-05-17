const { ethers } = require("hardhat");
async function main(){
     FirContract = await ethers.getContractFactory("Fir");
     const filter = contract.filters.FIRCreated();
    const events = await contract.queryFilter(filter, 0, 'latest');

    console.log(events);
}
main()