import Web3 from "web3";
import { ethers } from "ethers";
import abi from "./BuildersFaucet.json";

export const contractAddress = "0x9B1D984506d0e02868403eC824e0f83286DdFB7B";
// export const correctNetworkId = 4;

const contractABI = abi.abi;

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};

export const getTotalFunds = async () => {
  const buildersFaucetContract = getContract();
  const totalLoot = await buildersFaucetContract.getTotalFunds();
  return totalLoot;
};

export const getTotalContributors = async () => {
  const buildersFaucetContract = getContract();
  const totalLoot = await buildersFaucetContract.getTotalContributors();
  return totalLoot;
};

export const getTotalRequests = async () => {
  const buildersFaucetContract = getContract();
  const totalLoot = await buildersFaucetContract.getTotalRequests();
  return totalLoot;
};

export const getTimeToWaitUntilNextRequest = async (userWalletAddress) => {
  const buildersFaucetContract = getContract();
  const totalLoot = await buildersFaucetContract.getTimeToWaitUntilNextRequest(
    userWalletAddress
  );
  return totalLoot;
};

export const deposit = async (priceInWei) => {
  const buildersFaucetContract = getContract();
  const depositTx = await buildersFaucetContract.deposit({ value: priceInWei });
  return depositTx;
};

export const subscribeToEvents = (
  userWalletAddress,
  toast,
  setIsSendingLoading,
  setIsReceivingLoading,
  setTotalFunds,
  setTotalContributors,
  setTotalRequests,
  updateUserFunds
) => {
  const buildersFaucetContract = getContract();

  buildersFaucetContract.on(
    "Deposited",
    (address, amountDeposited, totalFunds, totalContributors) => {
      setTotalContributors(parseInt(totalContributors));
      updateUserFunds();
      console.log(
        "DEPOSITED!!! WOHOOOO 🎸🎸🎸🎸🎸🎸 ",
        address,
        userWalletAddress
      );
      console.log(
        address,
        parseInt(amountDeposited),
        parseInt(totalFunds),
        parseInt(totalContributors)
      );
      const parsedTotalFunds = Web3.utils.fromWei(
        String(parseInt(totalFunds)),
        "ether"
      );
      setTotalFunds(parsedTotalFunds);
      if (userWalletAddress.toLowerCase() === address.toLowerCase()) {
        if (toast)
          toast({
            position: "top-right",
            title: "Funds received!",
            description: "Thank you for helping the community!!",
            status: "success",
            duration: 6500,
            isClosable: true,
          });
        setIsSendingLoading(false);
      }
    }
  );

  buildersFaucetContract.on(
    "TokensSent",
    (address, value, totalFunds, totalInteractions) => {
      setTotalRequests(parseInt(totalInteractions));

      const parsedTotalFunds = Web3.utils.fromWei(
        String(parseInt(totalFunds)),
        "ether"
      );
      setTotalFunds(parsedTotalFunds);
      updateUserFunds();
      console.log(
        "RECEIVED BY USER!!! WOHOOOO 🍕🍕🍕🍕🍕🍕",
        parseInt(value),
        address,
        userWalletAddress,
        parseInt(totalInteractions),
        parseInt(totalFunds)
      );
      if (userWalletAddress.toLowerCase() === address.toLowerCase()) {
        if (toast) {
          if (value > 0) {
            toast({
              position: "top-right",
              description: "Received in your wallet!!!",
              status: "success",
              duration: 4000,
              isClosable: true,
            });
          } else {
            toast({
              position: "top-right",
              description: "Please wait 24 hours since your last request",
              status: "success",
              duration: 4000,
              isClosable: true,
            });
          }
        }
        setIsReceivingLoading(false);
      }
    }
  );
};
