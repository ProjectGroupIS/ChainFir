// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Fir {

    struct IDProof {
        string idType;
        string idNumber;
    }

    struct Complainant {
        string fullName;
        string parentName;
        uint age;
        string gender;
        string dob;
        string nationality;
        string occupation;
        string addr;
        string phoneNumber;
        string email;
        IDProof idProof;
    }

    struct PoliceStation {
        string name;
        string district;
        string state;
    }

    struct Incident {
        uint256 occurrenceStart; // use timestamp
        uint256 occurrenceEnd;
        string place;
        string distanceFromStation;
        string offenceType;
        string description;
        string actSections;
    }

    struct Accused {
        string name;
        string aliasName;
        string addr;
        uint age;
        string gender;
        string relationWithComplainant;
    }

    struct Witness {
        string name;
        string addr;
        string contactInfo;
    }

    struct Evidence {
        string[] documents;
        string mediaType;
        string mediaDescription;
        string physicalDescription;
    }

    struct Investigation {
        bool started;
        string ioName;
        string ioRank;
        string ioBadgeNumber;
        string dispatchDate;
    }

    struct FIR {
        uint firId;
        string firNumber;
        uint256 filingDateTime;
        PoliceStation station;
        Complainant complainant;
        Incident incident;
        Accused[] accused;
        Witness[] witnesses;
        Evidence evidence;
        Investigation investigation;
    }

    uint public firCount = 0;
    mapping(uint => FIR) public firs;

    function fileFIR(
        string memory firNumber,
        PoliceStation memory station,
        Complainant memory complainant,
        Incident memory incident,
        Accused[] memory accused,
        Witness[] memory witnesses,
        Evidence memory evidence,
        Investigation memory investigation
    ) public  {
       FIR storage fir = firs[firCount++];
       fir.firNumber = firNumber;
       fir.station = station;
       fir.complainant = complainant;
       fir.incident = incident;
       for(uint i=0;i<accused.length;i++)
            fir.accused.push(accused[i]);
        for(uint i=0;i<witnesses.length;i++)
            fir.witnesses.push(witnesses[i]);
       fir.evidence = evidence;
       fir.investigation = investigation;
    }
}

