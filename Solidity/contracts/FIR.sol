// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

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
        uint256 occurrenceStart;
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
    ) public {
        firs[firCount] = FIR({
            firId: firCount,
            firNumber: firNumber,
            filingDateTime: block.timestamp,
            station: station,
            complainant: complainant,
            incident: incident,
            accused: accused,
            witnesses: witnesses,
            evidence: evidence,
            investigation: investigation
        });
        firCount++;
    }
}
