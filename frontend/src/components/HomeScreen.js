import Web3 from "web3";
import React, { useEffect, useState } from "react";
import { useToast, Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import axios from "axios";
import { deposit, getTotalFunds } from "../web3lib";

function HomeScreen() {
  const toast = useToast();

  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [userFunds, setUserFunds] = useState(false);
  const [totalFunds, setTotalFunds] = useState(false);
  const [userWalletAddress, setUserWalletAddress] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPageLoading, setIsPageLoading] = React.useState(true);

  const checkNetwork = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const info = await provider.getNetwork();
    if (info.name === "rinkeby") {
      setIsCorrectNetwork(true);
    } else {
      setIsCorrectNetwork(false);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      detectEthereumNetwork();
    }
  }, []);

  const detectEthereumNetwork = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const info = await provider.getNetwork();
    if (info.name !== "rinkeby") {
      setIsCorrectNetwork(false);
    } else {
      setIsCorrectNetwork(true);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (network) => {
        setIsCorrectNetwork(network === "0x4");
      });
      checkNetwork();
    }
  }, []);

  useEffect(() => {
    const fetchUserBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const userFunds = await provider.getBalance(userWalletAddress);

      const userFundsInEnth = Web3.utils.fromWei(
        String(parseInt(userFunds)),
        "ether"
      );
      setUserFunds(userFundsInEnth);

      console.log("User's Balance 🐷: ", userFundsInEnth);
    };

    if (isCorrectNetwork) fetchUserBalance();
  }, [isCorrectNetwork, userWalletAddress]);

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      const { ethereum } = window;

      if (!ethereum) {
        toast({
          position: "top-right",
          title: "Please install the MetaMask extension",
          description: "Playing this game requires MetaMask and a Wallet!",
          status: "error",
          duration: 4200,
          isClosable: true,
        });
        setIsLoading(false);
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log("Connected", accounts[0]);

      toast({
        position: "top",
        title: "Connected to Ethereum!!",
        status: "success",
        duration: 2200,
        isClosable: true,
      });

      setUserWalletAddress(accounts[0]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Install metamask!");
      setIsPageLoading(false);
      return;
    }

    ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      if (accounts) {
        console.log({ accounts });
        if (accounts.length !== 0) {
          const theUsersWalletAddress = accounts[0];
          console.log("wallet address found: " + theUsersWalletAddress);
          setUserWalletAddress(theUsersWalletAddress);
        } else {
          console.log("No account found");
        }
      }
      setIsPageLoading(false);
    });
  };

  React.useEffect(() => {
    const fetchTotalFunds = async () => {
      const fetchedFunds = await getTotalFunds();

      const fetchedFundsInEnth = Web3.utils.fromWei(
        String(parseInt(fetchedFunds)),
        "ether"
      );
      setTotalFunds(fetchedFundsInEnth);
      console.log("Faucet's Balance 🐷: ", fetchedFundsInEnth);
    };

    checkIfWalletIsConnected();
    if (userWalletAddress) {
      if (isCorrectNetwork) fetchTotalFunds();
    }
  }, [userWalletAddress, isCorrectNetwork]);

  const contribute = async () => {
    // ! This is 0.1 ETH in wei: 100000000000000000
    setIsLoading(true);

    const priceInWei = Web3.utils.toWei(
      "0.001".toLocaleString(undefined, {
        minimumFractionDigits: 18,
        maximumFractionDigits: 18,
      }),
      "ether"
    );

    const tx = await deposit(priceInWei).catch((e) => {
      console.log("Error on tx!");
      console.log(e);
      setIsLoading(false);
      if (e.code === "INSUFFICIENT_FUNDS") {
        toast({
          position: "top-right",
          title: "You don't have enough funds to contribute. Sorry ",
          description:
            "If you need fake ETH to try this, please, send me a message on twitter (@ezpe) and I'll transfer you some!",
          status: "error",
          duration: 14000,
          isClosable: true,
        });
      } else {
        toast({
          position: "top-right",
          title: "Looks like you cancelled the transaction? 😢",
          status: "info",
          duration: 4200,
          isClosable: true,
        });
      }
      setIsLoading(false);
      return false;
    });
    console.log("The transaction: ");
    console.log(tx);
  };

  const requestEth = () => {
    console.log("🔥Hello REQUEST eth button clicked!");
    axios
      .get(
        "https://2crr8obxgf.execute-api.eu-central-1.amazonaws.com/default/faucet2?address=" +
          userWalletAddress,
        {
          // data: {
          //   address: "0x061294782b7C73a675cF54124853c8133e3463FC",
          //   amount: "40000",
          // },
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      )
      .then(function (response) {
        console.log("response");
        console.log(response);
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
      });
  };

  if (isPageLoading) return <div></div>;
  if (!userWalletAddress)
    return (
      <div className="m-12">
        <Button
          colorScheme="blue"
          onClick={connectWallet}
          isLoading={isLoading}
        >
          Connect Wallet!
        </Button>
      </div>
    );
  if (!isCorrectNetwork) return <div>Please change network to Rinkeby!</div>;

  return (
    <div className="inline-block p-6 m-4 mx-auto bg-purple-200 rounded-lg">
      <div className="mb-4 font-semibold">
        Builder's Rinkeby Faucet, by @EtherCluster and @javi
      </div>
      <div className="p-2 font-mono text-xs text-center bg-purple-100 rounded select-none">
        {userWalletAddress}
      </div>

      <div className="flex justify-between mt-4">
        {userFunds && (
          <div>
            <div>User's Balance:</div>
            <div>{userFunds} ETH</div>
          </div>
        )}
        {totalFunds && (
          <div>
            <div>Faucet's Balance:</div>
            <div>{totalFunds} ETH</div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        {totalFunds > 0 && (
          <div className="mt-4 mr-4">
            <Button onClick={requestEth} colorScheme="blue">
              Give me ETH
            </Button>
          </div>
        )}
        {totalFunds === 0 && (
          <div className="mt-4 mr-4 text-xs text-red-600">
            no funds at the moment, please collaborate contributing.
          </div>
        )}
        <div className="mt-4">
          <Button
            colorScheme="green"
            isLoading={isLoading}
            onClick={contribute}
          >
            Contribute with 0.1 ETH
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
