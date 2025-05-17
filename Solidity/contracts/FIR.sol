// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Fir is AccessControl {
    bytes32 public constant POLICE_ROLE = keccak256("POLICE_ROLE");

    constructor(address government) {
       _grantRole(DEFAULT_ADMIN_ROLE, government);
    }   
    function addPolice(address police) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(POLICE_ROLE, police);
    }
    function removePolice(address police) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(POLICE_ROLE, police);
    }
    function isPolice(address police) public view returns (bool) {
        return hasRole(POLICE_ROLE, police);
    }

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
    mapping(uint => string) public firHashes;
    mapping(string => bool) public firIpfsHash;
    function fileFIR(string memory ipfsHash)public{
        require(hasRole(POLICE_ROLE, msg.sender),"Caller is not a police officer");
        require(!firIpfsHash[ipfsHash], "FIR already filed");// check if FIR already filed
        firHashes[firCount++] = ipfsHash;
        firIpfsHash[ipfsHash] = true;
    }


    function getFIR(uint _firId) public view returns (string memory) {
        return firHashes[_firId];
    }
}

