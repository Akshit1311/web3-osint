#!/usr/bin/env node

import { getUserBalance } from "./methods/getUserBalance";
import { getUserTransactions } from "./methods/getUserTransactions";
import { handleAsync } from "./utils/handleAsync";

console.log("web3-osint pkg works");

const run = async () => {
  console.log("Running..");
  const data = await handleAsync(() => getUserBalance("axit.eth"));
  console.log({ data });

  console.log("Fetching..");
  const txns = await handleAsync(() => getUserTransactions("axit.eth"));

  console.table(txns);
};

run();
