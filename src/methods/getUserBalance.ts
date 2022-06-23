import { BigNumber, ethers, utils } from "ethers";
import { jsonRpcProvider } from "../config/initEthers";

export const getUserBalance = async (address: string) => {
  const balance = await jsonRpcProvider.getBalance(address);
  const balStr = balance.toString();

  return `${ethers.utils.formatEther(balStr)} ether`;
};
