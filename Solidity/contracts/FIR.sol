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
    uint public firCount = 0;
    mapping(uint => string) public firHashes;
    mapping(string => bool) public firIpfsHash;

    function fileFIR(string memory ipfsHash)public {
        require(hasRole(POLICE_ROLE, msg.sender) || hasRole(DEFAULT_ADMIN_ROLE,msg.sender),"Caller is not a police officer");
        require(!firIpfsHash[ipfsHash], "FIR already filed");// check if FIR already filed
        firHashes[firCount++] = ipfsHash;
        firIpfsHash[ipfsHash] = true;
    }

    function getFIR(uint _firId) public view returns (string memory) {
        require(_firId < firCount, "FIR not found");
        return firHashes[_firId];
    }
}

