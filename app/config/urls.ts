const URLs = {
  base: 'https://dummyjson.com/',
  getProducts: (skip: number) => `products?limit=10&skip=${skip}`,
};
export default URLs;
