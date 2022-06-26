import { ethers } from "ethers";
import { createSpinner } from "nanospinner";
import { etherscanProvider } from "../config/initEthers";
import getRedactedStr from "../utils/getRedactedStr";

export const getUserTransactions = async (address: string) => {
  const spinner = createSpinner("Fetching transactions...\n").start();

  try {
    const txns = await etherscanProvider.getHistory(address);

    const formattedTxns = txns.map(
      ({ hash, from, to, value, nonce, timestamp }) => ({
        hash: getRedactedStr(hash),
        from: getRedactedStr(from),
        to: getRedactedStr(to || ""),
        value: ethers.utils.formatEther(value),
        nonce,
        timestamp,
      })
    );

    spinner.success({ text: "Transaction History:" });

    console.table(formattedTxns);
  } catch (error) {
    spinner.error({ text: error.message });
  }
};
