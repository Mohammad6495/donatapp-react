import { baseUrl } from "./baseUrl";

export const API_URLs = {
  home: {
    getAllCakeSize: baseUrl + "/app/categories/getall",
    getBranchProductsAvailability: baseUrl + "/branch/branchavailability",
  },
  saleTime: {
    saleTimeList: "https://api.caropastry.com/list",
  },
  calculatePrice: {
    calculateSendPrice: baseUrl + "/sendprice/calculatesendprice",
  },
  account: {
    getreffercode: baseUrl + "/account/getreffercode",
    getreffertext: baseUrl + "/account/getreffertext",
    exists: baseUrl + "/account/exists",
    register: baseUrl + "/app/authuser/login",
    verify: baseUrl + "/app/authuser/verify",
    verifyUser: baseUrl + "/account/verifyuser",
    getProfile: baseUrl + "/app/authuser/getprofile",
    editProfile: baseUrl + "/app/authuser/editprofile",
    increasebalance: baseUrl + "/account/increasebalance",
    balance: baseUrl + "/account/balance",
    didntreceivesms: baseUrl + "/account/didntreceivesms",
  },
  branch: {
    getBranchList: baseUrl + "/branch/list",
    getCurrentBranch: baseUrl + "/branch/current",
    get: baseUrl + "/branch/get",
    showsmsmessage: baseUrl + "/branch/showsmsmessage",
    getClosestBranch: baseUrl + "/branch/getclosestbranch",
    getBanner: baseUrl + "/branch/banner",
    getBranchAvailability: baseUrl + "/branch/branchavailability",
    getcreamycookieprice: baseUrl + "/branch/getcreamycookieprice",
  },
  customerAddress: {
    getCustomerAddressList: baseUrl + "/app/customeraddress/getall",
    createCustomerAddress: baseUrl + "/app/customeraddress/create",
    getCustomerAddressDetail: baseUrl + "/app/customeraddress/detail",
    editCustomerAddress: baseUrl + "/app/customeraddress/edit",
    deleteCustomerAddress: baseUrl + "/app/customeraddress/delete",
    setDefaultAddress: baseUrl + "/app/customeraddress/changestatusdefaultaddress",
    getAddressName: baseUrl + "/app/customeraddress/getaddressname",
  },
  extraCategory: {
    getExtraCategoryList: baseUrl + "/extracategory/list",
  },
  tomorrowCake: {
    // getTomorrowCakeList: baseUrl + "/tomorrowcake/list",
    getTomorrowCakeList: baseUrl + "/cake/tomorrowcakes",
    justtomorrowcakes: baseUrl + "/cake/justtomorrowcakes",
    justdayaftertomorrowcakes: baseUrl + "/cake/justdayaftertomorrowcakes",
    justtomorrowcakespagination:
      baseUrl + "/cake/justtomorrowcakeswithpagination",
    justdayaftertomorrowcakespagination:
      baseUrl + "/cake/justdayaftertomorrowcakeswithpagination",
    // getTomorrowCakeDetail: baseUrl + "/tomorrowcake/detail",
    getTomorrowCakeDetail: baseUrl + "/cake/tomorrowcakedetail",
    // prepaymentfactor: baseUrl + "/tomorrowcake/prepaymentfactor",
    prepaymentfactor: baseUrl + "/cake/prepaymentfactor",
    checkOut: baseUrl + "/tomorrowcakepurchaserequest/submitoffer",
    getOrdersList: baseUrl + "/tomorrowcakepurchaserequest/list",
    getOrderDetails: baseUrl + "/tomorrowcakepurchaserequest/detail",
    finalPayment: baseUrl + "/tomorrowcakepurchaserequest/payfinalprice",
    timesStatus: baseUrl + "/tomorrowcake/times",
    activelist: baseUrl + "/tomorrowcakepurchaserequest/activelist",
  },
  refrigeratorCake: {
    // getRefrigeratorCakeList: baseUrl + "/refrigeratorcake/list",
    getRefrigeratorCakeList: baseUrl + "/app/products/getall",
    directrefrigeratorcakedetail:
      baseUrl + "/cake/directrefrigeratorcakedetail",
    // getRefrigeratorCakeDetail: baseUrl + "/refrigeratorcake/detail",
    getRefrigeratorCakeDetail: baseUrl + "/app/products/detail",
    unreserveCake: baseUrl + "/cake/unreserve",
    reserveCake: baseUrl + "/cake/reserve",
    currentDate: baseUrl + "/cake/currentdate",
  },
  specialOffer: {
    getSpecialOffer: baseUrl + "/cake/directaccesscakedetail",
  },
  cookie: {
    getCookieList: baseUrl + "/cookie/list",
    getCreamyList: baseUrl + "/cookie/creamylist",
    getCategoriesList: baseUrl + "/cookie/categories",
  },
  payment: {
    getFactor: baseUrl + "/app/cart/getfactor",
    submitFactor: baseUrl + "/app/cart/submitfactor",
  },
  bakery: {
    getBakeryItemsList: baseUrl + "/bakerycategory/list",
  },
  products: {
    getBakeryList: baseUrl + "/products/bakery",
    getDessertList: baseUrl + "/products/dessert",
    getExtrasList: baseUrl + "/products/extra",
    getNorouziList: baseUrl + "/products/aid",
    getDessertItemsList: baseUrl + "/dessertcategory/list",
  },
  cart: {
    getAllUserOrdersList: baseUrl + "/app/cart/generalorderbyuser",
    getOrderDetail: baseUrl + "/app/cart/generalorderdetail",
    payFinalPrice: baseUrl + "/app/cart/payagainorder",
    payIncompleteOrder: baseUrl + "/cart/pay",
    activelist: baseUrl + "/cart/activelist",
  },
  calculatePrice: {
    calculateSendPrice: baseUrl + "/sendprice/calculatesendprice",
  },
  ticket: {
    createTicket: baseUrl + "/ticket/create",
    addMessageToTicket: baseUrl + "/ticket/addmessage",
    getAllTickets: baseUrl + "/ticket/list",
    getTicketDetail: baseUrl + "/ticket/detail",
  },
  favorites: {
    addTomarrowCakeToFavorites: baseUrl + "/cake/addtofavorite",
    removeTomarrowCakeFromFavorites: baseUrl + "/cake/removefromfavorites",
    getFavoriteTomarrowCakes: baseUrl + "/cake/favoritestomorrowcakes",
  },
  birthday: {
    getAllList: baseUrl + "/birthday/list",
    create: baseUrl + "/birthday/create",
    delete: baseUrl + "/birthday/delete",
  },
  picture: {
    getByCode: baseUrl + "/picture/getbycode",
    addPhoto: baseUrl + "/picture/addphoto",
    barnchlogin: baseUrl + "/picture/barnchlogin",
  },
  cakeOrder: {
    submit: baseUrl + "/cakeorder/submit",
    cakeorder: baseUrl + "/cakeorder/cakes",
    getTypes: baseUrl + "/cakeorder/types",
    setting: baseUrl + "/cakeorder/setting",
    customerorders: baseUrl + "/cakeorder/customerorders",
    customerorderdetail: baseUrl + "/cakeorder/customerorderdetail",
    pay: baseUrl + "/cakeorder/pay",
  },
  visit: {
    create: baseUrl + "/visit/create",
  },
  answer: {
    create: baseUrl + "/answer/create",
    cananswer: baseUrl + "/answer/cananswer",
  },
  ip: {
    getIpData: "http://ip-api.com/json/",
  },
  searchPlace: {
    search: "https://map.ir/search/v2",
  },
};
