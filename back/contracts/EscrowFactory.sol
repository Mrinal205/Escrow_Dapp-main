// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


contract EscrowFactory {

    struct Escrows {
        address escrow;
        address owner;
        uint256 id;
    }

    uint256 escrowsId = 0;

    Escrows[] public escrows;

    function addEscrow(address _escrow, address _owner) external {
        escrows.push(Escrows(_escrow, _owner, escrowsId));
        escrowsId++;
    }

    function allEscrows() external view returns (Escrows[] memory) {
        uint256 len = escrows.length;
        Escrows[] memory escrowList = new Escrows[](len);
        for (uint i = 0; i < len; i++) {
            escrowList[i] = escrows[i];
        }
        return escrowList;
    }

    function getEscrowById(uint256 _id) external view returns (Escrows memory) {
        return escrows[_id];
    }
}