import { createSpinner } from "nanospinner";

export const handleAsync = async (func: (...args: any[]) => Promise<any>) => {
  const spinner = createSpinner("Fetching wallet balance...\n").start();
  try {
    const res = await func();

    spinner.success({ text: res });

    return res;
  } catch (error) {
    spinner.error({ text: error.message });
  }
};
