// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Test {
  uint toggle;
  string name;
  uint256 value;
  string private privateStr;

  function getPrivateStr() public view returns (string memory) {
    return privateStr;
  }

  function setPrivateStr(string memory _privateStr) public {
    privateStr = _privateStr;
  }

}