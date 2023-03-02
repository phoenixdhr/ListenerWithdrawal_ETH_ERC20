/** @type import('hardhat/config').HardhatUserConfig */

import { HardhatUserConfig } from "hardhat/config";

import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-etherscan"
import "@nomicfoundation/hardhat-chai-matchers"
import "@nomicfoundation/hardhat-network-helpers"
import "@openzeppelin/hardhat-upgrades"
import "hardhat-gas-reporter"

import dotenv from "dotenv"
dotenv.config()


const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: "0.8.17" },
      { version: "0.8.10" },
      { version: "0.8.7" },
    ],
  },


  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },

  // mocha: {
  //   timeout: 40000
  // },

  defaultNetwork: "hardhat",

  networks: {

    hardhat: {
      chainId: 1337, // We set 1337 to make interacting with MetaMask simpler

      forking: {
        url: process.env.API_QUIK_TEST_BSC?? "Ingresar URL correcta",
        blockNumber: 16520000,
        enabled:false
      },

      
      accounts: {
        mnemonic: process.env.SEED,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
        accountsBalance:"15000000000000000000000",
        passphrase: "",
      },

      mining: {
        auto: false,
        interval: 15000, // un bloque se mina cada 15 segundos
      }



    },


    goerli: {

      url: process.env.API_INFURA_GOERLI,

      accounts: {
        mnemonic: process.env.SEED,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
        passphrase: "",
      },
    },


    ETH_Mainet: {

      url: process.env.API_ALCHEMY_MAINET,

      accounts: {
        mnemonic: process.env.SEED,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
        passphrase: "",
      },
    },


    Test_Polygon_Mumbai: {

      url: "https://endpoints.omniatech.io/v1/matic/mumbai/public",

      accounts: {
        mnemonic: process.env.SEED,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
        passphrase: "",
      },
    },



    Test_BSC: {

      url: "https://endpoints.omniatech.io/v1/bsc/testnet/public",

      chainId: 97,

      accounts: {
        mnemonic: process.env.SEED,
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
        passphrase: "",
      },
    },
   
  },

  etherscan : {
    apiKey: process.env.API_ETHERSCAN
  },


}

export default config;