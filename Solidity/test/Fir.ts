const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Fir Contract", function () {
  let FirContract;
  let fir;

  beforeEach(async function () {
    FirContract = await ethers.getContractFactory("Fir");
    fir = await FirContract.deploy();
    await fir.deployed();
  });

  it("Should start with zero FIRs", async function () {
    const count = await fir.firCount();
    expect(count).to.equal(0);
  });

  it("Should file a FIR and increase the count", async function () {
    const station = {
      name: "Central",
      district: "Test District",
      state: "Test State"
    };

    const idProof = {
      idType: "Aadhar",
      idNumber: "123456789012"
    };

    const complainant = {
      fullName: "John Doe",
      parentName: "Jane Doe",
      age: 30,
      gender: "Male",
      dob: "1990-01-01",
      nationality: "Indian",
      occupation: "Engineer",
      addr: "123 Main St",
      phoneNumber: "9876543210",
      email: "john@example.com",
      idProof
    };

    const incident = {
      occurrenceStart: Math.floor(Date.now() / 1000) - 3600,
      occurrenceEnd: Math.floor(Date.now() / 1000),
      place: "Market Street",
      distanceFromStation: "1km",
      offenceType: "Theft",
      description: "Stolen phone",
      actSections: "IPC 379"
    };

    const accused = [{
      name: "Thief",
      aliasName: "Shadow",
      addr: "Unknown",
      age: 25,
      gender: "Male",
      relationWithComplainant: "Unknown"
    }];

    const witnesses = [{
      name: "Alice",
      addr: "123 Witness Lane",
      contactInfo: "alice@example.com"
    }];

    const evidence = {
      documents: ["doc1.pdf"],
      mediaType: "CCTV",
      mediaDescription: "Footage from street camera",
      physicalDescription: "Black phone"
    };

    const investigation = {
      started: true,
      ioName: "Inspector Raj",
      ioRank: "Inspector",
      ioBadgeNumber: "ID123",
      dispatchDate: "2025-05-01"
    };

    const tx = await fir.fileFIR("FIR001", station, complainant, incident, accused, witnesses, evidence, investigation);
    await tx.wait();

    const count = await fir.firCount();
    expect(count).to.equal(1);
  });
});

