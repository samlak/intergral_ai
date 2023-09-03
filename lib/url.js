const customUrl = (param) => {
  const newUrl = new URL(`${process.env.NODE_ENV == "production" ? 'https://' : 'http://'}${process.env.VERCEL_URL}${param}`);
  console.log(newUrl)
  return newUrl;
};

export { customUrl };
