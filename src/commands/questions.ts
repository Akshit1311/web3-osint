import inquirer from "inquirer";
import { getUserBalance } from "../methods/getUserBalance";
import { getUserTransactions } from "../methods/getUserTransactions";
import { getTweetsByQuery } from "../methods/tweetMethods";

interface Methods {
  [key: string]: (data: any) => void;
}

const methods: Methods = {
  "Get user balance": async (address: string) => getUserBalance(address),
  "Get transactions": async (address: string) => getUserTransactions(address),
  "Search for wallet owner": async (query) =>
    getTweetsByQuery(query.split(".")[0]),
  // "Full OSINT": () => {},
};

export const askActionToPerform = async () => {
  const answers = await inquirer.prompt([
    {
      name: "wallet_addr",
      type: "input",
      message: "Enter wallet address/ens name:",
      default() {
        return "axit.eth";
      },
    },
    {
      name: "question_1",
      type: "list",
      message: "What action to perform?",
      choices: Object.keys(methods),
    },
  ]);

  return methods[answers.question_1](answers.wallet_addr);
};
