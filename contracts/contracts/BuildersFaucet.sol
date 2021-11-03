// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract BuildersFaucet {
    //total funds in faucet at the moment
    uint256 public totalFunds;
    //total funds sent to an address per given request
    uint256 public payOutAmt;
    //total amount of contributos
    uint256 public totalContributors;
    
    //total amount Contributed
        uint public totalContributed;
        
       //total amount paid to users
        uint public totalRequested;
            //total times paid to users
        uint public totalRequests;
    //
    struct Contributor{
        uint amtRequested;
        uint amtDeposited;
        uint lastTimeSentAt;
        bool alreadyContributed;
    
    }
    
    
    //mapping user address to user(contributor) struct
     mapping(address => Contributor) public contributors;
     
     
    // timestamp when a certain addresss requested funds
    mapping(address => uint) public lastTimeSentAt;


//deopist event
    event Deposited(address indexed userAddress, uint256 weiAmount, uint256 totalFunds, uint totalInteractors);
//requested event
    event TokensSent(address indexed userAddress, uint256 weiAmount,  uint256 totalFunds);
//contract owner
    address public owner;

    constructor() payable {
        totalFunds = 0;
        totalContributors = 0;
        totalRequested =0;
        totalRequests = 0;
        totalContributed =0;
        payOutAmt = 50000000000000000; //default on launch ( will be chanegeable via function)
        owner = msg.sender;
    }

    //lets user deposit to the contract
    function deposit() public payable {
    
        totalFunds = totalFunds + msg.value;
  
        if(contributors[msg.sender].alreadyContributed == false){
            
    //update public variables        
            totalContributors = totalContributors+1;
            totalContributed = totalContributed+msg.value;
            
    //update user variables        
            contributors[msg.sender].alreadyContributed = true;
            contributors[msg.sender].amtDeposited = contributors[msg.sender].amtDeposited + msg.value;
            
        }else{
            
            //update public variables        
            totalContributed = totalContributed+msg.value;
            
    //update user variables        
            contributors[msg.sender].amtDeposited = contributors[msg.sender].amtDeposited + msg.value;
            
        }
        
        
        emit Deposited(msg.sender, msg.value, totalFunds,totalContributors);
    }
    
    
    
    

    //functio where owners can set payout amount
    function setPayoutAmt(uint256 weiAmtPayout) public{
        require(msg.sender == owner);
        payOutAmt = weiAmtPayout;
    }

//for backend purposes only
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
        require((block.timestamp - contributors[msg.sender].lastTimeSentAt) > 1 days);
        
           require(payable(userAddress).send(payOutAmt));
           
           
             //update public variables        
       totalRequested = totalRequested+payOutAmt;
       totalRequests = totalRequests++;
            
    //update user variables        
         
            contributors[msg.sender].amtRequested = contributors[msg.sender].amtRequested + payOutAmt;
            contributors[msg.sender].lastTimeSentAt = block.timestamp;
           
        
            emit TokensSent(userAddress, payOutAmt, totalFunds);
        
        
    }

    //returns total fund sin contract
    function getTotalFunds() public view returns (uint256) {
        // console.log("We have %d total funds!", totalFunds);
        return totalContributed;
    }
    
    
    
    

    //returns total contributors
    function getTotalContributors() public view returns (uint256) {
        // console.log("We have %d total funds!", totalFunds);
        return totalContributors;
    }

    //returns total requests
    function getTotalRequests() public view returns (uint256) {
        // console.log("We have %d total funds!", totalFunds);
        return totalRequested;
    }
}