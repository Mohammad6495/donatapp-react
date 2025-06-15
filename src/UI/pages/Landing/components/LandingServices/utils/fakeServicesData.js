import cake1 from "../../../../../../assets/images/cake1.jpg";
import cake2 from "../../../../../../assets/images/cake2.jpg";
import cake4 from "../../../../../../assets/images/cake4.jpg";
import cake5 from "../../../../../../assets/images/bak.jpg";

import newCakeimg from '../../../../../../assets/images/one-caro/The cakes.png'
import newBakeryimg from '../../../../../../assets/images/one-caro/bakery.png'
import newCookieimg from '../../../../../../assets/images/sweets.png'
import newramadanimg from '../../../../../../assets/images/Ramadan 1.png'
import newnorozi from '../../../../../../assets/images/new-nourzi.png'
import newramadan from '../../../../../../assets/images/new-ramadan.png'
import newCookieCreamyimg from '../../../../../../assets/images/one-caro/Sweetness.png'
import newDessertCreamyimg from '../../../../../../assets/images/one-caro/Dessert & halva.png'
import birthdaysuppliesImg from '../../../../../../assets/images/one-caro/birthday supplies.png'

export const fakeServicesData = [
  {
    id: "3",
    title: "شیرینی",
    imageUrl: cake1,
    path: "/cookie",
    cakeAlias: "",
  },
  {
    id: "1",
    title: "شیرینی تَر",
    imageUrl: cake2,
    path: "/creamy-cookie",
    cakeAlias: "creamy",
  },

  {
    id: "4",
    title: "دسر و حلوا",
    imageUrl: cake4,
    path: "/dessert",
    cakeAlias: "dessert",
  },
  {
    id: "2",
    title: "بیکری",
    imageUrl: cake5,
    path: "/bakery",
    cakeAlias: "bakery",
  },
];
export const fakeServicesDataOne = [
  {
    id: "2",
    title: "بیکری (ساری)",
    imageUrl: cake5,
    path: "/bakery",
    cakeAlias: "bakery",
  },
];

export const newfakeDataServiceColomnOne = [
  {
    id: 1,
    className: '',
    image: newCakeimg,
    path: "/refrigerator-cake",
    cakeAlias: "",
  },

  {
    id: 3,
    className: '',
    image: newBakeryimg,
    path: "/bakery",
    cakeAlias: "bakery",

  }
]

export const newfakeDataServiceColomnTwo = [
  {
    id: 3,
    className: '',
    image: newCookieimg,
    path: "/cookie",
    cakeAlias: "",
  },
  // {
  //   id: 4,
  //   className: '',
  //   image: newCookieCreamyimg,
  //   path: "/cookie",
  //   cakeAlias: "creamy",

  // },
  {
    id: 5,
    className: '',
    image: newDessertCreamyimg,
    cakeAlias: "dessert",
    path: "/dessert",
    cakeAlias: "dessert",
  },
  {
    id: 2,
    className: '',
    image: birthdaysuppliesImg,
    path: "/extra-products",
    cakeAlias: "",

  },
] 

export const newfakeDataServiceRamadan = [
  {
    id: 1,
    className: '',
    image: newnorozi,
    path: "/norouzi",
    cakeAlias: "norouzi",
  },
  {
    id: 2,
    className: '',
    image: newramadan,
    path: "/ramadan",
    cakeAlias: "",
  },
] 
