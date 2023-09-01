require('@nomicfoundation/hardhat-toolbox')
require("dotenv").config()

const { PRIVATE_KEY, SEPOLIA_RPC_URL } = process.env
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.18',
  defaultNetwork: 'hardhat',
  networks: {
    // goerli: {
    //   url: GOERLI_RPC_URL,
    //   accounts: [PRIVATE_KEY],
    //   chainId: 5
    // },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    localhost: {
      url: 'http://127.0.0.1:8545/',
      // accounts: Thanks to hardhat
      chainId: 31337,
    },
  },
}
