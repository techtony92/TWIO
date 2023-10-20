export const arrayToObject = (source) => {
  let outboundData = {};
  source.forEach((entry) => (outboundData = { ...outboundData, entry }));
  return outboundData;
};
