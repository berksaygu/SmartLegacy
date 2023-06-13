// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "./Legacy.sol";

contract LegacyFactory {
    mapping(address => address[]) public legacies;

    // get all Legacies associated with given address
    function getLegacy(address _owner) public view returns (address[] memory) {
        return legacies[_owner];
    }

    event NewLegacy(address legacy, address owner);

    // create new legacy
    function newLegacy(
        string memory _name,
        address _owner,
        uint256 _lockingTime,
        address _heir
    ) external {
        // create new legacy
        Legacy legacy = new Legacy(_name, _owner, _lockingTime, _heir);

        // Add mapping
        legacies[_owner].push(address(legacy));

        // emit new legacy event
        emit NewLegacy(address(legacy), _owner);
    }
}
