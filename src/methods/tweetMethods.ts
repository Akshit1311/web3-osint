import os from "os";
import fs from "fs/promises";

import * as dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import { createSpinner } from "nanospinner";
import inquirer from "inquirer";
import gradient from "gradient-string";

const token = process.env.TWIT_BEARER_TOKEN;

const headers = { Authorization: `Bearer ${token}` };

export const getTwitterUserByUsername = async (username: string) => {
  try {
    const { data } = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers,
      }
    );

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
export const getTweetById = async (id: string) => {
  try {
    const { data } = await axios.get(`https://api.twitter.com/2/tweets/${id}`, {
      headers,
    });

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const writeJsonOutputToFile = async (data: {}, path: string) => {
  const spinner = createSpinner(
    `Genrating JSON output file to path: ${gradient.pastel(path)} ...\n`
  ).start();

  try {
    await fs.writeFile(path, JSON.stringify(data, null, "\t"));

    spinner.success({
      text: `Output generated successfully: ${gradient.pastel(path)}`,
    });
  } catch (error) {
    spinner.error({ text: error.message });
  }
};

export const getTweetsByQuery = async (query: string) => {
  const spinner = createSpinner("Fetching Twitter Mentions...\n").start();

  const tweetFields =
    "author_id,created_at,entities,geo,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source";

  try {
    const { data } = await axios.get(
      `https://api.twitter.com/2/tweets/search/recent?query=${query}&tweet.fields=${tweetFields}`,
      {
        headers,
      }
    );

    if (data.meta.result_count) {
      spinner.success({
        text: `Found ${data.meta.result_count} Twitter Mentions`,
      });

      let doContinue = true;

      do {
        const answers = await inquirer.prompt([
          {
            name: "twitterResultAction",
            type: "list",
            message: "What action to perform on twitter results?",
            choices: ["Print JSON to console", "Export to JSON", "Exit"],
          },
        ]);

        if (answers.twitterResultAction === "Print JSON to console") {
          console.log(data.data);
        } else if (answers.twitterResultAction === "Export to JSON") {
          await writeJsonOutputToFile(
            data.data,
            `${os.homedir()}/Desktop/tweetsOSINTOutput_${query}.json`
          );
          console.log("\n");
        } else if (answers.twitterResultAction === "Exit") {
          doContinue = false;
        }

        if (answers.twitterResultAction !== "Exit") {
          const answers1 = await inquirer.prompt([
            {
              name: "doContinueTwitter",
              type: "list",
              message:
                "Do you wanna perform any other action on twitter results?",
              choices: ["Yes", "No"],
              default() {
                return "No";
              },
            },
          ]);

          if (answers1.doContinueTwitter === "No") {
            doContinue = false;
          }
        }
      } while (doContinue);

      // console.table(data.data);
    } else spinner.error({ text: "No twitter mentions found." });
  } catch (error) {
    spinner.error({ text: error.message });
  }
};
