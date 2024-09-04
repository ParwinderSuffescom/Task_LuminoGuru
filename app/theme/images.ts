let PATH = '../assets/images/';

export const images = {
  randomPic: 'https://picsum.photos/300/600?random=',
  back: require(PATH + 'back.png'),
  bag: require(PATH + 'bag.png'),
  down: require(PATH + 'down.png'),
  favorite: require(PATH + 'favorite.png'),
  favoriteFilled: require(PATH + 'favoriteFilled.png'),
  minus: require(PATH + 'minus.png'),
  minusFilled: require(PATH + 'minusFilled.png'),
  plus: require(PATH + 'plus.png'),
  plusFilled: require(PATH + 'plusFilled.png'),
  search: require(PATH + 'search.png'),
  dummyImage: require(PATH + 'dummyImage.png'),
  success: require(PATH + 'success.png'),
  danger: require(PATH + 'danger.png'),
  warning: require(PATH + 'warning.png'),
  emptyCart: require(PATH + 'emptyCart.png'),
} as const;

export type AppImage = keyof typeof images;
