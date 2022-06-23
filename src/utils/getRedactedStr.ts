const getRedactedStr = (str: string) => `${str.slice(0, 5)}...${str.slice(-5)}`;

export default getRedactedStr;
