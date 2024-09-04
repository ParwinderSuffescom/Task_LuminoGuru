let PATH = '../assets/images/';

export const images = {
  randomPic: 'https://picsum.photos/300/600?random=',
  back: require(PATH + 'back.png'),
  bag: require(PATH + 'bag.png'),
  down: require(PATH + 'down.png'),
  favourite: require(PATH + 'favourite.png'),
  favouriteFilled: require(PATH + 'favouriteFilled.png'),
  minus: require(PATH + 'minus.png'),
  minusFilled: require(PATH + 'minusFilled.png'),
  plus: require(PATH + 'plus.png'),
  plusFilled: require(PATH + 'plusFilled.png'),
  search: require(PATH + 'search.png'),
  dummyImage: require(PATH + 'dummyImage.png'),
  success: require(PATH + 'success.png'),
  danger: require(PATH + 'danger.png'),
  warning: require(PATH + 'warning.png'),
} as const;

export type AppImage = keyof typeof images;
