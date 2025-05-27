// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
import "@openzeppelin/contracts/access/AccessControl.sol";
contract Fir is AccessControl {
    struct FIR {
        string complaiantName;
        string ipfsHash;
        address filedBy;
        uint256 timestamp;
    }
    
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
        return hasRole(POLICE_ROLE, police) || hasRole(DEFAULT_ADMIN_ROLE, police);
    }
    uint public firCount = 0;
    mapping(uint => FIR) public firs;
    mapping(string => bool) public firIpfsHash;

    function fileFIR(string memory complaiantName,string memory ipfsHash)public {
        require(hasRole(POLICE_ROLE, msg.sender) || hasRole(DEFAULT_ADMIN_ROLE,msg.sender),"Caller is not a police officer");
        require(!firIpfsHash[ipfsHash], "FIR already filed");// check if FIR already filed
        firs[firCount++] = FIR(complaiantName, ipfsHash, msg.sender, block.timestamp);
        firIpfsHash[ipfsHash] = true;
    }

    function getFIRByIpfsHash(string memory ipfsHash) public view returns (FIR memory) {
        require(firIpfsHash[ipfsHash], "FIR not found");
        for (uint i = 0; i < firCount; i++) {
            if (keccak256(abi.encodePacked(firs[i].ipfsHash)) == keccak256(abi.encodePacked(ipfsHash))) {
                return firs[i];
            }
        }
        revert("FIR not found");
    }
    
    function getFIRByIndex(uint index) public view returns (
        string memory complaiantName,
        string memory ipfsHash,
        address filedBy,
        uint256 timestamp
    ) {
        require(index < firCount, "Index out of bounds");
        return (
            firs[index].complaiantName,
            firs[index].ipfsHash,
            firs[index].filedBy,
            firs[index].timestamp
        );
    }

    function getFIRCount() public view returns (uint) {
        return firCount;
    }
    
    function getAllFirs() public view returns (FIR[] memory) {
        FIR[] memory allFIRs = new FIR[](firCount);
        for (uint i = 0; i < firCount; i++) {
            allFIRs[i] = firs[i];
        }
        return allFIRs;
    }
}