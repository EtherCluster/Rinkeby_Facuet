import Head from "next/head";
import Header from "../components/Header";
import Stats from "../components/Stats";
import FaucetLayer from "../components/FaucetLayer";
import React, { useState } from "react";

export default function Home() {
  const [totalFunds, setTotalFunds] = useState(0);
  const [totalContributors, setTotalContributors] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);

  return (
    <div className="">
      <Head>
        <title>BlockchainBuilders Rinkeby Faucet</title>
        <meta
          name="description"
          content="A modern Rinkeby Faucet for the BlockchainsBuilders community"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex flex-col items-center justify-center w-full mb-20 bg-white">
        <div className="z-10 flex items-center justify-center w-full bg-white">
          <FaucetLayer
            totalFunds={totalFunds}
            setTotalFunds={setTotalFunds}
            setTotalContributors={setTotalContributors}
            setTotalRequests={setTotalRequests}
          />
        </div>
        <Stats
          totalFunds={totalFunds}
          totalContributors={totalContributors}
          totalRequests={totalRequests}
        />
      </div>
    </div>
  );
}
