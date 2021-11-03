const main = async () => {
  console.log("✅ Deploying contract... 📤");
  const buildersFaucetContractFactory = await hre.ethers.getContractFactory(
    "BuildersFaucet"
  );
  const buildersFaucetContract = await buildersFaucetContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await buildersFaucetContract.deployed();
  console.log("Contract deployed to:", buildersFaucetContract.address);

  let totalFunds = await buildersFaucetContract.getTotalFunds();
  totalFunds = parseInt(totalFunds);
  console.log("🏦 totalFunds: ", totalFunds);

  const amountToDeposit = 80000000;
  console.log("💰 → 🐷 depositing => ", amountToDeposit);
  let tx = await buildersFaucetContract.deposit({ value: amountToDeposit });
  await tx.wait();

  totalFunds = await buildersFaucetContract.getTotalFunds();
  totalFunds = parseInt(totalFunds);
  console.log("🏦 totalFunds: ", totalFunds);

  console.log("setting payout amount => ", 40000);
  tx = await buildersFaucetContract.setPayoutAmt(40000);
  await tx.wait();

  totalFunds = await buildersFaucetContract.getTotalFunds();
  totalFunds = parseInt(totalFunds);
  console.log("🏦 totalFunds: ", totalFunds);

  console.log(
    "💸 💸 💸 💸 💸  sending money to => ",
    "0x061294782b7C73a675cF54124853c8133e3463FC"
  );
  tx = await buildersFaucetContract.sendTokensToAddress(
    "0x061294782b7C73a675cF54124853c8133e3463FC"
  );
  await tx.wait();

  totalFunds = await buildersFaucetContract.getTotalFunds();
  totalFunds = parseInt(totalFunds);
  console.log("🏦 totalFunds: ", totalFunds);

  console.log(
    "💸 💸 💸 💸 💸  sending money to => ",
    "0x061294782b7C73a675cF54124853c8133e3463FC"
  );
  tx = await buildersFaucetContract.sendTokensToAddress(
    "0x061294782b7C73a675cF54124853c8133e3463FC"
  );
  await tx.wait();

  totalFunds = await buildersFaucetContract.getTotalFunds();
  totalFunds = parseInt(totalFunds);
  console.log("🏦 totalFunds: ", totalFunds);
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

// const main = async () => {
//   const buildersFaucetContractFactory = await hre.ethers.getContractFactory(
//     "BuildersFaucet"
//   );
//   const buildersFaucetContract = await buildersFaucetContractFactory.deploy();
//   await buildersFaucetContract.deployed();
//   console.log("Contract deployed to:", buildersFaucetContract.address);

//   let totalFunds = await buildersFaucetContract.getTotalFunds();
//   totalFunds = parseInt(totalFunds);
//   console.log("🏦 totalFunds: ", totalFunds);

//   const amountToDeposit = 80000000;
//   console.log("💰 → 🐷 depositing => ", amountToDeposit);
//   let tx = await buildersFaucetContract.deposit({ value: amountToDeposit });
//   await tx.wait();

//   totalFunds = await buildersFaucetContract.getTotalFunds();
//   totalFunds = parseInt(totalFunds);
//   console.log("🏦 totalFunds: ", totalFunds);

//   console.log("setting payout amount => ", 40000);
//   tx = await buildersFaucetContract.setPayoutAmt(40000);
//   await tx.wait();

//   totalFunds = await buildersFaucetContract.getTotalFunds();
//   totalFunds = parseInt(totalFunds);
//   console.log("🏦 totalFunds: ", totalFunds);

//   console.log(
//     "💸 💸 💸 💸 💸  sending money to => ",
//     "0x061294782b7C73a675cF54124853c8133e3463FC"
//   );
//   tx = await buildersFaucetContract.sendTokensToAddress(
//     "0x061294782b7C73a675cF54124853c8133e3463FC"
//   );
//   await tx.wait();

//   totalFunds = await buildersFaucetContract.getTotalFunds();
//   totalFunds = parseInt(totalFunds);
//   console.log("🏦 totalFunds: ", totalFunds);
// };

// const runMain = async () => {
//   try {
//     await main();
//     process.exit(0);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// runMain();
