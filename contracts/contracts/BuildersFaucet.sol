// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract BuildersFaucet {
    uint256 public totalFunds;
    uint256 public payOutAmt;
    uint public totalInteractions;
    address[] public contributors;
    mapping(address => uint) public lastTimeSentAt;

    event Deposited(address indexed userAddress, uint256 weiAmount, uint totalInteractions, uint256 totalFunds, uint totalInteractors);
    event TokensSent(address indexed userAddress, uint256 weiAmount, uint totalInteractions, uint256 totalFunds);

    address public owner;

    constructor() payable {
        totalFunds = 0;
        payOutAmt = 50000000000000000;
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


    function getTimeToWaitUntilNextRequest(address userAddress) public view returns (uint256) {
        uint256 canSendMoney = 0;
        if (lastTimeSentAt[userAddress] > 0) {
            if (lastTimeSentAt[userAddress] + 24 hours  > block.timestamp) {
                canSendMoney = lastTimeSentAt[userAddress] + 24 hours - block.timestamp;
            }
        }
        return canSendMoney;
    }

    //this will pay out users who request -- the reason we have address as input paramter and not msg.sender is becasue we will use web3 on the frontend to get the user's address
    function sendTokensToAddress(address userAddress) public {
        uint256 timeToWait = getTimeToWaitUntilNextRequest(userAddress);
        if (timeToWait > 0) {
            emit TokensSent(userAddress, 0, totalInteractions, totalFunds);
        } else {
            require(payable(userAddress).send(payOutAmt));
            lastTimeSentAt[userAddress] = block.timestamp;
            totalInteractions = totalInteractions + 1;
            totalFunds = totalFunds - payOutAmt;
            emit TokensSent(userAddress, payOutAmt, totalInteractions, totalFunds);
        }
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