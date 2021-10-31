const main = async () => {
  console.log("✅ Deploying contract... 📤");
  const buildersFaucetContractFactory = await hre.ethers.getContractFactory(
    "BuildersFaucet"
  );
  const buildersFaucetContract = await buildersFaucetContractFactory.deploy();
  await buildersFaucetContract.deployed();
  console.log("✅ Contract deployed to:", buildersFaucetContract.address);
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
