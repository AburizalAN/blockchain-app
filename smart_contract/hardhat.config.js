// https://eth-sepolia.g.alchemy.com/v2/bTU8skpAeE0dgvrI2w5rY8UpV5unxgq7

require("@nomiclabs/hardhat-waffle")

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/bTU8skpAeE0dgvrI2w5rY8UpV5unxgq7",
      accounts: ["42043a708450594183879d8004d4937b6d9526686331c8dc545ad1cfdbe4003c"]
    }
  }
}