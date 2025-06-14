import moment from "jalali-moment";

export const createArrayByLength = (length, staticValue = "##") => {
  const arr = [];
  if (length === 1) {
    return [null];
  }
  for (let i = 0; i < length; i++) {
    arr.push(staticValue);
  }

  return arr;
};

export function TravellerCollection(array) {
  let finalPrice = 0
  for (var i = 0; i < array.length; i++) {
    finalPrice += array[i].price * array[i].count
  }
  return finalPrice
}

export const just_persian = (str) => {
  var p = /^[\u0600-\u06FF\s]+$/;

  if (!p.test(str)) return false;
  else return true;
};
export const hasPersianCharacter = (str) => {
  const symbols = [" ", ".", "-", "_", "=", ")", "(", ",", "<", ">", "?"];
  let hasPersian = false;

  str.split("").every((char) => {
    if (!symbols.includes(char)) {
      if (just_persian(char)) {
        hasPersian = true;
        return false;
      }
    }
    return true;
  });

  return hasPersian;
};

export const getCustomDate = (sendingDayCount) => {
  const days = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهار شنبه",
    "پنج شنبه",
    "جمعه",
  ];

  const pd =
    days[moment().locale("fa").add(sendingDayCount, "days").weekday()] +
    " " +
    moment().locale("fa").add(sendingDayCount, "days").format("D MMMM");

  return pd;
};

export const getTomarrow = (d, day = 1) => {
  const days = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهار شنبه",
    "پنج شنبه",
    "جمعه",
  ];

  const pd =
    days[
    moment(d, "YYYY-MM-DDTHH:mm:ss").locale("fa").add(day, "days").weekday()
    ] +
    " " +
    moment(d, "YYYY-MM-DDTHH:mm:ss")
      .locale("fa")
      .add(1, "days")
      .format("D MMMM");

  return pd;
};

export const toPersianDate = (d) => {
  const days = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهار شنبه",
    "پنج شنبه",
    "جمعه",
  ];

  const pd =
    days[moment(d, "YYYY-MM-DDTHH:mm:ss").locale("fa").weekday()] +
    " " +
    moment(d, "YYYY-MM-DDTHH:mm:ss").locale("fa").format("D MMMM");

  return pd;
};

export const now = () => {
  let convertedDate = new Date().toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return convertedDate;
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export function convertToPersianPhoneNumber(phoneNumber) {
  // تعریف یک دیکشنری برای مپ کردن اعداد انگلیسی به فارسی
  const numberMap = {
    '0': '۰',
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹'
  };

  // تبدیل هر رقم به فارسی
  const persianPhoneNumber = phoneNumber.replace(/\d/g, digit => numberMap[digit] || digit);

  return persianPhoneNumber;
}

export const formatPrice = (number) => {
  if (number) {
    if (number.toString().length > 3) {
      let arr2 = [];
      let arr = number.toString().split("");

      let addedLength = 0;

      if (arr.length % 3 !== 0) {
        arr.unshift("0");

        addedLength += 1;

        if (arr.length % 3 !== 0) {
          arr.unshift("0");
          addedLength += 1;
        }
      }

      arr.forEach((item, index) => {
        if (index !== 0 && index % 3 === 0 && index !== arr.length - 1) {
          arr2.push(",");
          arr2.push(item);
        } else {
          arr2.push(item);
        }
      });

      if (addedLength > 0) arr2.splice(0, addedLength);

      let str = "";
      arr2.forEach((item) => {
        str += item.toString();
      });

      return str;
    } else {
      return number;
    }
  } else {
    return 0
  }
};

// CALCULATE DIFF
export const calculateDiff = (to, from, currentDate) => {
  const toDate = new Date(to).getTime();
  let fromDate = 0;
  if (from) {
    fromDate = new Date(from).getTime();
  } else if (currentDate) {
    fromDate = new Date(currentDate).getTime();
  } else {
    fromDate = new Date().getTime();
  }
  var distance = toDate - fromDate;
  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    timeLeft: distance,
    d,
    h,
    m,
    s,
  };
};

// export const calculateDiff = (to, from) => {
//   const toDate = new Date(to).getTime();
//   var fromDate = 0;
//   if (from) {
//     fromDate = from;
//   } else fromDate = new Date().getTime();
//   /////
//   var distance = toDate - fromDate;

//   const d = Math.floor(distance / (1000 * 60 * 60 * 24));
//   const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   const s = Math.floor((distance % (1000 * 60)) / 1000);

//   return {
//     timeLeft: distance,
//     d,
//     h,
//     m,
//     s,
//   };
// };

export const isOutdated = (time) => {
  var d1 = new Date();
  var d2 = new Date(isOutdated);
  if (d1.getTime() > d2.getTime()) return true;
  return false;
};

export const getRemainingTime = (timeLeft) => {
  const hours = parseInt(timeLeft.hours);
  const minutes = parseInt(timeLeft.minutes);
  const seconds = parseInt(timeLeft.seconds);

  let str = "";
  if (hours) {
    str += `${hours} ساعت`;
    if (minutes) {
      str += " و ";
    } else if (seconds) {
      str += " و ";
    }
  }
  if (minutes) {
    str += `${minutes} دقیقه`;
    if (seconds) {
      str += " و ";
    } else {
      str += "‌ی";
    }
  }
  if (seconds) {
    str += `${seconds} ثانیه‌ی`;
  }

  return str;
};



export const locationSearchStringToObject = (str) => {
  if (typeof str !== "string") return undefined;
  if (!str) return undefined;
  if (!str.trim()) return undefined;
  /////
  let queryString = decodeURIComponent(str);
  if (queryString.startsWith("?")) queryString = queryString.replace("?", "");
  if (queryString.length === 0) return undefined;
  /////
  const queryArray = queryString.split("&").map((pair) => pair.split("="));
  /////
  const queryObject = Object.fromEntries(queryArray);
  /////
  return queryObject;
};

export function locationSearchStringToObject2(search) {
  const params = new URLSearchParams(search);
  const result = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
}
export const objectToQueryString = (queryObject) => {
  if (typeof queryObject === "object") {
    if (Object.keys(queryObject).length > 0) {
      let qs = "?";
      const qoEntries = Object.entries(queryObject);
      qoEntries.forEach(([key, value], index) => {
        qs += `${key}=${value}${index < qoEntries.length - 1 ? "&" : ""}`;
      });
      //////
      return qs;
    }
    return "";
  }
  return "";
};

const persianNumbers = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
],
  arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
export const toEnglishDigit = function (str) {
  let newStr = str;
  for (let i = 0; i < 10; i++) {
    newStr = newStr
      .replace(persianNumbers[i], i.toLocaleString("en-US"))
      .replace(arabicNumbers[i], i.toLocaleString("en-US"));
  }
  return newStr;
};


export const convertPersianTime = (time) => {
  if (time) {
    const result = moment(time).locale('fa').format("dddd DD MMMM jYYYY");
    return result;
  } else {
    return "---";
  }
};