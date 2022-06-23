import * as dotenv from "dotenv";
dotenv.config();

import { ethers } from "ethers";

// env variables (SENSITIVE)
const { RPC_URL, ETHERSCAN_API_KEY } = process.env;

//constants
export const jsonRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);
export const etherscanProvider = new ethers.providers.EtherscanProvider(
  "homestead",
  ETHERSCAN_API_KEY
); // Connect to mainnet (homestead) with an API key
