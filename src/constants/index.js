import hnImg from "../assets/images/Ha Noi.jpg";
import hcmImg from "../assets/images/HCM.jpg";
import dnImg from "../assets/images/Da Nang.jpg";

export const Feature = [
  {
    name: "Ha Noi",
    properties: 0,
    imgUrl: hnImg,
  },
  {
    name: "Ho Chi Minh",
    properties: 0,
    imgUrl: hcmImg,
  },
  {
    name: "Da Nang",
    properties: 0,
    imgUrl: dnImg,
  },
];

export const PropertyTypes = [
  {
    name: "Hotels",
    imgUrl:
      "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    count: 0,
    key: "hotel",
  },
  {
    name: "Apartments",
    imgUrl:
      "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    count: 0,
    key: "apartment",
  },
  {
    name: "Resorts",
    imgUrl:
      "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    count: 0,
    key: "resort",
  },
  {
    name: "Villas",
    imgUrl:
      "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    count: 0,
    key: "villa",
  },
  {
    name: "Cabins",
    imgUrl:
      "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
    count: 0,
    key: "cabin",
  },
];

export const initialDate = [
  {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  },
];
export const initalOptions = {
  adult: 1,
  children: 0,
  room: 1,
};
