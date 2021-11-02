// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract BuildersFaucet {
    uint256 public totalFunds;
    uint256 public payOutAmt;
    uint public totalInteractions;
    address[] public contributors;

    event Deposited(address indexed userAddress, uint256 weiAmount, uint totalInteractions, uint256 totalFunds, uint totalInteractors);
    event TokensSent(address indexed userAddress, uint256 weiAmount, uint totalInteractions, uint256 totalFunds);

    address public owner;

    constructor() payable {
        totalFunds = 0;
        payOutAmt = 50000000;
        owner = msg.sender;
    }

    //lets user deposit to the contract
    function deposit() public payable {
        totalInteractions = totalInteractions + 1;
        totalFunds = totalFunds + msg.value;

        bool contributorExist = false;
        for (uint i=0; i<contributors.length; i++) {
            if (contributors[i] == msg.sender) {
                contributorExist = true;
            }
        }
        if (!contributorExist) {
            contributors.push(msg.sender);
        }

        emit Deposited(msg.sender, msg.value, totalInteractions, totalFunds, contributors.length);
    }

    //functio where owners can set payout amount
    function setPayoutAmt(uint256 weiAmtPayout) public{
        require(msg.sender == owner);
        payOutAmt = weiAmtPayout;
    }

    //this will pay out users who request -- the reason we have address as input paramter and not msg.sender is becasue we will use web3 on the frontend to get the user's address
    function sendTokensToAddress(address userAddress) public {
        require(payable(userAddress).send(payOutAmt));
        totalInteractions = totalInteractions + 1;
        totalFunds = totalFunds - payOutAmt;
        emit TokensSent(userAddress, payOutAmt, totalInteractions, totalFunds);
    }

    //returns total fund sin contract
    function getTotalFunds() public view returns (uint256) {
        // console.log("We have %d total funds!", totalFunds);
        return totalFunds;
    }

    //returns total contributors
    function getTotalContributors() public view returns (uint256) {
        // console.log("We have %d total funds!", totalFunds);
        return contributors.length;
    }

    //returns total requests
    function getTotalRequests() public view returns (uint256) {
        // console.log("We have %d total funds!", totalFunds);
        return totalInteractions;
    }
}