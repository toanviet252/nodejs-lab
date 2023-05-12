export const revertNumber = (stringData) => {
  if (!stringData || typeof stringData !== "string")
    throw new Error("Invalid value");
  return +stringData.replaceAll(",", "");
};
