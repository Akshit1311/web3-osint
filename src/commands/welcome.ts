import figlet from "figlet";
import gradient from "gradient-string";

export const welcome = async () => {
  const greeting = "Web3 OSINT";
  figlet(greeting, (error, data) => {
    console.log(gradient.pastel.multiline(data));

    if (error) console.log({ error });
  });
};
