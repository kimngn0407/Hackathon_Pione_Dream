import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

export default {
  solidity: "0.8.20",
  networks: {
    pzo: {
      url: "https://rpc.zeroscan.org",
      chainId: 5080,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};

