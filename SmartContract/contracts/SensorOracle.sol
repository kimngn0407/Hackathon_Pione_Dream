// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SensorOracle {
    // hash dạng 0x... (keccak256 của canonical JSON)
    event SensorHashStored(address indexed sender, uint256 indexed time, string hash);

    function storeHash(uint256 time, string calldata dataHash) external {
        emit SensorHashStored(msg.sender, time, dataHash);
    }
}

