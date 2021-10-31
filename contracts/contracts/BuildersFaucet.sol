// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract BuildersFaucet {
    uint256 public totalFunds;
    uint256 public payOutAmt;

    event Deposited(address indexed userAddress, uint256 weiAmount);
    event TokensSent(address indexed userAddress, uint256 weiAmount);
    address public owner;

    constructor() payable {
        totalFunds = 0;
        payOutAmt = 6000;
        owner = msg.sender;
        // console.log("Hello! This is the Builders Faucet contract!!");
    }

//lets user deposit to the contract
    function deposit() public payable {
        emit Deposited(msg.sender, msg.value);
        totalFunds = totalFunds + msg.value;
    }

//functio where owners can set payout amount
function setPayoutAmt(uint256 weiAmtPayout) public{
    require(msg.sender == owner);
       payOutAmt = weiAmtPayout;
    }

//this will pay out users who request -- the reason we have address as input paramter and not msg.sender is becasue we will use web3 on the frontend to get the user's address
    function sendTokensToAddress(address userAddress) public {
        require(payable(userAddress).send(6000));
        totalFunds = totalFunds - 6000;
        // console.log("We just sent %d to %s ", amount, userAddress);
        emit TokensSent(userAddress, 6000);
    }

//returns total fund sin contract
    function getTotalFunds() public view returns (uint256) {
        // console.log("We have %d total funds!", totalFunds);
        return totalFunds;
    }
}