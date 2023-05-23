const main = async () => {
  const Test = await hre.ethers.getContractFactory("Test");
  const test = await Test.deploy();

  await test.deployed();

  console.log("Transactions deployed to: ", test.address);
  console.log("test", test);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log("error", err);
    process.exit(1);
  }
}

runMain();
