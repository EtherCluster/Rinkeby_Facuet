import Web3 from "web3";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import axios from "axios";
import {
  getTimeToWaitUntilNextRequest,
  deposit,
  getTotalContributors,
  getTotalFunds,
  getTotalRequests,
  subscribeToEvents,
} from "../web3lib";
import IntroAndConnectWallet from "./IntroAndConnectWallet";
import styled from "styled-components";
import Button from "./Button";
import { motion } from "framer-motion";

function FaucetLayer({
  totalFunds,
  setTotalFunds,
  setTotalContributors,
  setTotalRequests,
}) {
  const toast = useToast();

  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [userFunds, setUserFunds] = useState(0);
  const [userWalletAddress, setUserWalletAddress] = React.useState("");
  const [isSendingLoading, setIsSendingLoading] = React.useState(false);
  const [isReceivingLoading, setIsReceivingLoading] = React.useState(false);
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
    const info = await provider.getNetwork().catch((e) => {
      // console.log("Error 1");
      // console.log(e);
    });
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
      const userFunds = await provider
        .getBalance(userWalletAddress)
        .catch((e) => {
          // console.log("Error 2");
          // console.log(e);
        });

      const userFundsInEnth = Web3.utils.fromWei(
        String(parseInt(userFunds)),
        "ether"
      );
      setUserFunds(userFundsInEnth);

      // console.log("User's Balance 🐷: ", userFundsInEnth);
    };

    if (isCorrectNetwork) if (userWalletAddress) fetchUserBalance();
  }, [isCorrectNetwork, userWalletAddress]);

  const checkIfWalletIsConnected = () => {
    const { ethereum } = window;
    if (!ethereum) {
      // console.log("Install metamask!");
      setIsPageLoading(false);
      return;
    }

    ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      if (accounts) {
        // console.log({ accounts });
        if (accounts.length !== 0) {
          const theUsersWalletAddress = accounts[0];
          // console.log("wallet address found: " + theUsersWalletAddress);
          setUserWalletAddress(theUsersWalletAddress);
        } else {
          // console.log("No account found");
        }
      }
      setIsPageLoading(false);
    });
  };

  React.useEffect(() => {
    const fetchTotalFunds = async () => {
      const fetchedFunds = await getTotalFunds().catch((e) => {
        // console.log("Error 3.a");
        // console.log(e);
      });

      const fetchedFundsInEnth = Web3.utils.fromWei(
        String(parseInt(fetchedFunds)),
        "ether"
      );
      setTotalFunds(fetchedFundsInEnth);
      // console.log("Faucet's Balance 🐷: ", fetchedFundsInEnth);
    };

    const fetchTotalContributors = async () => {
      const fetchedContributors = await getTotalContributors().catch((e) => {
        // console.log("Error 3.b");
        // console.log(e);
      });
      setTotalContributors(parseInt(fetchedContributors));
      // console.log("Contributors 🙆🏻‍♂️: ", parseInt(fetchedContributors));
    };

    const fetchTotalRequests = async () => {
      const fetchedRequests = await getTotalRequests().catch((e) => {
        // console.log("Error 3.b");
        // console.log(e);
      });
      setTotalRequests(parseInt(fetchedRequests));
      // console.log("Requests ⚡️: ", parseInt(fetchedRequests));
    };

    checkIfWalletIsConnected();
    if (userWalletAddress) {
      if (isCorrectNetwork) {
        fetchTotalFunds();
        fetchTotalContributors();
        fetchTotalRequests();
      }
    }
  }, [
    userWalletAddress,
    isCorrectNetwork,
    setTotalFunds,
    setTotalContributors,
    setTotalRequests,
  ]);

  const updateUserFunds = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const userFunds = await provider
      .getBalance(userWalletAddress)
      .catch((e) => {
        // console.log("Error 2");
        // console.log(e);
      });

    const userFundsInEnth = Web3.utils.fromWei(
      String(parseInt(userFunds)),
      "ether"
    );
    setUserFunds(userFundsInEnth);
  };

  useEffect(() => {
    if (userWalletAddress) {
      subscribeToEvents(
        userWalletAddress,
        toast,
        setIsSendingLoading,
        setIsReceivingLoading,
        setTotalFunds,
        setTotalContributors,
        setTotalRequests,
        updateUserFunds
      );
      // console.log("🦥🦥🦥🦥 subscribed!! 🦥🦥🦥🦥");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userWalletAddress,
    toast,
    setTotalFunds,
    setTotalContributors,
    setTotalRequests,
  ]);

  const contribute = async () => {
    setIsSendingLoading(true);

    const priceInWei = Web3.utils.toWei(
      "0.1".toLocaleString(undefined, {
        minimumFractionDigits: 18,
        maximumFractionDigits: 18,
      }),
      "ether"
    );

    await deposit(priceInWei).catch((e) => {
      // console.log("Error on tx!");
      // console.log(e);
      setIsSendingLoading(false);
      if (e.code === "INSUFFICIENT_FUNDS") {
        toast({
          position: "top-right",
          title: "You don't have enough funds to contribute :(",
          description: "...but we thank you for your good intentions!",
          status: "error",
          duration: 14000,
          isClosable: true,
        });
      } else {
        toast({
          position: "top-right",
          description: "Looks like you cancelled the transaction? 😢",
          status: "info",
          duration: 4200,
          isClosable: true,
        });
      }
      setIsSendingLoading(false);
      return false;
    });
  };

  const requestEth = async () => {
    if (!isReceivingLoading) {
      if (parseFloat(totalFunds) <= 0.25) {
        toast({
          position: "top-right",
          title: "The aren't enough funds right now",
          description: "Please consider contributing if you can...",
          status: "info",
          duration: 4300,
          isClosable: true,
        });
      } else {
        setIsReceivingLoading(true);

        const secondsUntilNextRequest = await getTimeToWaitUntilNextRequest(
          userWalletAddress
        );
        const seconds = parseInt(secondsUntilNextRequest);
        const hours = Math.floor(seconds / 60 / 60);
        // console.log({ hours });
        const minutes = Math.floor(seconds / 60 + 1);
        // console.log({ minutes });
        // console.log(seconds / 60 / 60);
        // return false;
        if (parseInt(secondsUntilNextRequest) === 0) {
          toast({
            position: "top-right",
            title: "We're sending you 0.05 ETH",
            description: "The funds are on their way to you... 💸",
            status: "info",
            duration: 12000,
            isClosable: true,
          });

          // console.log("🔥Hello REQUEST eth button clicked! GOGOGO");
          const urlToCall =
            "https://2crr8obxgf.execute-api.eu-central-1.amazonaws.com/default/faucet2?address=" +
            userWalletAddress;
          axios
            .get(urlToCall, {
              // data: {
              //   address: "0x061294782b7C73a675cF54124853c8133e3463FC",
              //   amount: "40000",
              // },
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                  "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              },
            })
            .then(function (response) {
              // console.log("response");
              // console.log(response);
            })
            .catch(function (error) {
              // console.log("error");
              // console.log(error);
            });

          // console.log("....GET EXECUTED....", urlToCall);
        } else {
          toast({
            position: "top-right",
            description:
              hours > 0
                ? "Please wait " + hours + " hours to request funds again."
                : "Please wait " + minutes + " minutes to request funds again.",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          setIsReceivingLoading(false);
        }
      }
    } else {
      toast({
        position: "top-right",
        description: "Please wait for the transaction to happen...",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      // setIsReceivingLoading(false);
    }
  };

  if (isPageLoading) return <Wrapper></Wrapper>;
  if (!userWalletAddress)
    return (
      <IntroAndConnectWallet setUserWalletAddress={setUserWalletAddress} />
    );
  if (!isCorrectNetwork)
    return (
      <Wrapper>
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex justify-center w-full p-6"
        >
          Please change network to Rinkeby!
        </motion.div>
      </Wrapper>
    );

  return (
    <Wrapper className="flex flex-col justify-start items-justify">
      <div
        className="z-20 flex flex-col items-center justify-center w-full px-4 py-2 pb-8 bg-white"
        style={{
          boxShadow: "0px 44px 39px -22px rgb(0 0 0 / 4%)",
        }}
      >
        <AddressIndicatorWrapper className="flex items-center justify-center">
          {userWalletAddress}
        </AddressIndicatorWrapper>

        <div className="flex justify-between w-full mt-4">
          <div className="flex flex-col items-center justify-center w-full py-3">
            <TextLabel className="">Your Balance</TextLabel>
            <TextNumber className="">
              {parseFloat(userFunds).toLocaleString(undefined, {
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
              })}{" "}
              rETH
            </TextNumber>
          </div>

          {/* {totalFunds && (
          <div>
            <div>Faucet's Balance:</div>
            <div>{totalFunds} ETH</div>
          </div>
        )} */}
        </div>

        <div className="flex items-center justify-between my-2">
          <div className="mt-4 mr-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.12,
              }}
            >
              <Button isLoading={isReceivingLoading} onClick={requestEth}>
                Request 0.05 rETH
              </Button>
            </motion.div>{" "}
          </div>
          {/* {totalFunds === 0 && (
          <div className="mt-4 mr-4 text-xs text-red-600">
            no funds at the moment, please collaborate contributing.
          </div>
        )} */}
          <div className="mt-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.12,
              }}
            >
              <Button
                secondary
                isLoading={isSendingLoading}
                onClick={() => {
                  if (!isSendingLoading) contribute();
                }}
              >
                Contribute 0.1 rETH
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      <Credits className="flex justify-center w-full">
        Proudly built by @EtherCluster and @javi
      </Credits>
    </Wrapper>
  );
}

export default FaucetLayer;

const Wrapper = styled.div`
  width: 1140px;
  min-height: 360px;
  background: #ffffff;
  border-radius: 10px;
  padding-top: 40px;
`;

const AddressIndicatorWrapper = styled.div`
  width: 485px;
  height: 45px;
  border: 1px solid #f53855;
  box-sizing: border-box;
  border-radius: 50px;
  color: #f53855;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
`;

const TextLabel = styled.div`
  /* position: absolute; */
  width: 128px;
  height: 23px;
  text-align: center;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  /* or 156% */
  color: #f53838;
`;

const TextNumber = styled.div`
  text-align: center;
  width: 189px;
  height: 25px;
  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 25px;
  color: #f53838;
`;

const Credits = styled.h4`
  transform: translateY(20px);
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 30px;
  /* identical to box height, or 187% */
  color: #4f5665;
`;
