import { ethers } from "ethers";
import { createSpinner } from "nanospinner";
import { jsonRpcProvider } from "../config/initEthers";

export const getUserBalance = async (address: string) => {
  const spinner = createSpinner("Fetching wallet balance...\n").start();

  try {
    const balance = await jsonRpcProvider.getBalance(address);
    const balStr = balance.toString();

    spinner.success({ text: `${ethers.utils.formatEther(balStr)} ether` });
  } catch (error) {
    spinner.error({ text: error.message });
  }
};
