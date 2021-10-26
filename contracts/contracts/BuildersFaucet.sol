// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract BuildersFaucet {
    uint256 totalFunds;

    event Deposited(address indexed userAddress, uint256 weiAmount);
    event TokensSent(address indexed userAddress, uint256 weiAmount);

    constructor() {
        console.log("Hello! This is the Builders Faucet contract!!");
    }

    function deposit() public payable {
        emit Deposited(msg.sender, msg.value);
        totalFunds = totalFunds + msg.value;
    }


    function sendTokensToAddress(address userAddress, uint256 amount) public {
        require(payable(userAddress).send(amount));
        totalFunds = totalFunds - amount;
        console.log("We just sent %d to %s ", amount, userAddress);
        emit TokensSent(userAddress, amount);
    }

    function getTotalFunds() public view returns (uint256) {
        console.log("We have %d total funds!", totalFunds);
        return totalFunds;
    }
}