async function main() {
  const Test = await hre.ethers.getContractFactory("Test");
  const test = await Test.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3');

  const privateStr = await test.getPrivateStr();
  console.log("privateStr", privateStr);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});