export const formatDateKR = (num: number) => {
  const str = num.toString();
  const year = str.slice(0, 4);
  const month = str.slice(4);

  return { year, month };
};
