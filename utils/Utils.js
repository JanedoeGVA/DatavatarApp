export const toTitleCase = string => {
  let str = string.replace(/_/g, ' ');
  return str.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
