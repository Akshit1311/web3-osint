#!/usr/bin/env node

// import {
//   getTweetById,
//   getTweetsByQuery,
//   getTwitterUserByUsername,
// } from "./methods/tweetMethods";
// import { getUserBalance } from "./methods/getUserBalance";
// import { getUserTransactions } from "./methods/getUserTransactions";
// import { handleAsync } from "./utils/handleAsync";
import { welcome } from "./commands/welcome";
import { askActionToPerform } from "./commands/questions";
import { sleep } from "./utils/sleep";
import inquirer from "inquirer";

let isRunning = true;

const run = async () => {
  await welcome();
  await sleep(1000);

  do {
    await askActionToPerform();

    console.log("\n");
    const answers = await inquirer.prompt([
      {
        name: "doContinue",
        type: "list",
        message: "Do you perform any other OSINT?",
        choices: ["Yes", "No"],
        default() {
          return "No";
        },
      },
    ]);
    console.log("\n");

    if (answers.doContinue === "No") {
      console.log("Happy Hacking!");
      isRunning = false;
    }
  } while (isRunning);
};

run();
