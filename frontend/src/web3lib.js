import { ethers } from "ethers";
import abi from "./BuildersFaucet.json";

export const contractAddress = "0xc1e9961da80a6F2D052dD4C8Da3725ed98E2162b";
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

export const deposit = async (priceInWei) => {
  const buildersFaucetContract = getContract();
  const depositTx = await buildersFaucetContract.deposit({ value: priceInWei });
  return depositTx;
};
