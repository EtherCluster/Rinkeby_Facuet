import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import Button from "./Button";

function IntroAndConnectWallet({ setUserWalletAddress }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      const { ethereum } = window;

      if (!ethereum) {
        toast({
          position: "top-right",
          //   title: "Please install the MetaMask extension",
          description: "Please install the MetaMask extension",
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

  return (
    <div style={{ width: 799, marginTop: 40 }}>
      <div className="font-semibold text-center" style={{ fontSize: 50 }}>
        Get some Rinkeby Ethereum via the{" "}
        <span className="font-normal">BlockchainBuilders</span>
        <span className="font-bold">Faucet</span>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 0 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          delay: 0.05,
        }}
      >
        <div
          style={{ marginTop: 71, marginBottom: 20 }}
          className="flex justify-center w-full mx-auto"
        >
          <Button
            colorScheme="blue"
            onClick={connectWallet}
            isLoading={isLoading}
          >
            Connect Wallet
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default IntroAndConnectWallet;
