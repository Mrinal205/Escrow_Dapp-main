// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


struct Escrows {
    address escrow;
    address owner;
    uint256 id;
}

interface EscrowFactoryInterface {

    function addEscrow(address _escrow, address _owner) external;
    function getEscrowById(uint256 _id) external view returns (Escrows memory);
    function allEscrows() external view returns (Escrows[] memory);
}