export const capFirstChar = (s: string) => {
  let result = s.slice(1, s.length);
  result = s[0].toLocaleUpperCase() + result;
  return result;
};

export const filer = () => {};
