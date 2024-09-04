import {getProductPayload} from '../slices/home.types';

const URLs = {
  base: 'https://dummyjson.com/',
  getProducts: ({skip, search}: getProductPayload) =>
    `/products/search?q=${search}&limit=10&skip=${skip}`,
};
export default URLs;
