export const handleAsync = async (func: (...args: any[]) => Promise<any>) => {
  try {
    const res = await func();

    return res;
  } catch (error) {
    console.log({ error });
    process.exit(1);
  }
};
