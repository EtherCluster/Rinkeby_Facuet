const main = async () => {
  const buildersFaucetContractFactory = await hre.ethers.getContractFactory(
    "BuildersFaucet"
  );
  const buildersFaucetContract = await buildersFaucetContractFactory.deploy();
  await buildersFaucetContract.deployed();
  console.log("Contract deployed to:", buildersFaucetContract.address);

  let totalFunds = await buildersFaucetContract.getTotalFunds();
  totalFunds = parseInt(totalFunds);
  console.log("totalFunds: ", totalFunds);

  const amountToDeposit = 80000000;
  console.log("💰 → 🐷 depositing => ", amountToDeposit);
  let tx = await buildersFaucetContract.deposit({ value: amountToDeposit });
  await tx.wait();

  totalFunds = await buildersFaucetContract.getTotalFunds();
  totalFunds = parseInt(totalFunds);
  console.log("totalFunds: ", totalFunds);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
