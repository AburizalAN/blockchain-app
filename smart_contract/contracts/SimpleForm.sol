// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract SimpleForm {
  string name;
  string birthdate;
  uint number;
  string desc;

  struct DataStruct {
    string name;
    string birthdate;
    uint number;
    string desc;
  }

  function setData(string memory _name, string memory _birthdate, uint _number, string memory _desc) public {
    name = _name;
    birthdate = _birthdate;
    number = _number;
    desc = _desc;
  }

  function getData() public view returns (DataStruct memory) {
    DataStruct memory data = DataStruct(name, birthdate, number, desc);
    return data;
  }
}