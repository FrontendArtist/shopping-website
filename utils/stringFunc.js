const shortenText = (text) => {
  const newtext = text.split(" ").slice(0, 3).join(" ");
  return newtext;
};

export { shortenText };
