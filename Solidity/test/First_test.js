const { expect } = require("chai");
const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-chai-matchers");

describe("Fir Contract", function () {
  let Fir, fir;
  let deployer, government, police1, police2, user;

  beforeEach(async function () {
    [government,deployer, police1, police2, user] = await ethers.getSigners();

    const FirFactory = await ethers.getContractFactory("Fir");
    fir = await FirFactory.deploy(government.address);
    // await fir.deployed();
  });

  it("should set government as admin", async function () {
    const DEFAULT_ADMIN_ROLE = await fir.DEFAULT_ADMIN_ROLE();
    expect(await fir.hasRole(DEFAULT_ADMIN_ROLE, government.address)).to.be.true;
  });

  it("should allow admin to add and remove police", async function () {
    const POLICE_ROLE = await fir.POLICE_ROLE();

    await fir.connect(government).addPolice(police1.address);
    expect(await fir.hasRole(POLICE_ROLE, police1.address)).to.be.true;

    await fir.connect(government).removePolice(police1.address);
    expect(await fir.hasRole(POLICE_ROLE, police1.address)).to.be.false;
  });

  it("should allow police to file FIR", async function () {
    await fir.connect(government).addPolice(police1.address);
    // const POLICE_ROLE = await fir.POLICE_ROLE();
    const ipfsHash = "QmHash123";
  
    await fir.connect(police1).fileFIR(ipfsHash);

    const firId = await fir.firCount();
    expect(firId).to.equal(1);
    expect(await fir.getFIR(0)).to.equal(ipfsHash);
  });

  it("should not allow non-police to file FIR", async function () {
    await expect(fir.connect(user).fileFIR("QmInvalid"))
      .to.be.revertedWith("Caller is not a police officer");
  });

  it("should not allow duplicate FIR", async function () {
    await fir.connect(government).addPolice(police1.address);

    const ipfsHash = "QmUniqueHash";
      await fir.connect(police1).fileFIR(ipfsHash);

    await expect(fir.connect(police1).fileFIR(ipfsHash)).to.be.revertedWith("FIR already filed");
  });
});
