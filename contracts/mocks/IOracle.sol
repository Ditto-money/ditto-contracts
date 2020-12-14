// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17 <0.8.0;

interface IOracle {
    function getData() external view returns (uint256);
    function update() external;
}