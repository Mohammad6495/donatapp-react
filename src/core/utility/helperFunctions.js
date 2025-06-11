import React, { useState, useEffect } from "react";
import moment from "moment-jalaali";

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

export const now = ({
  locale = "en-US",
  options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  },
}) => {
  let convertedDate = new Date().toLocaleDateString(locale, options);

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

export const formatNumber = (num) => {
  if (num === 0) {
    return 0;
  }
  if (!num) {
    return "";
  }
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const formatPrice = (number) => {
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
};

export const clockCrypto = () => {
  let endTime = new Date("29 April 2020 00:00:00 GMT+00:00");
  endTime = Date.parse(endTime) / 1000;

  let now = new Date();
  now = Date.parse(now) / 1000;

  const timeLeft = endTime - now;

  const days = Math.floor(timeLeft / 86400);
  const hours = Math.floor((timeLeft - days * 86400) / 3600);
  const minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
  const seconds = Math.floor(
    timeLeft - days * 86400 - hours * 3600 - minutes * 60
  );

  // return { hours: hours * 60 * 60, minutes: minutes * 60, seconds: seconds };
  return { hours: hours, minutes: minutes, seconds: seconds };
};
export const calcRemainingToMidnight = () => {
  function getUTCTime() {
    var tDate = new Date();
    var utcDate = tDate.toUTCString();

    var splittedUtcDate = utcDate.split("");
    var indexOfFirst = splittedUtcDate.indexOf(":") - 2;
    var indexOfLast = splittedUtcDate.indexOf(":") + 6;

    const greenWitchTime = utcDate.substring(indexOfFirst, indexOfLast);
    return greenWitchTime;
  }

  const time = getUTCTime();
  const splittedTime = time.split(":").map((item) => parseInt(item));

  const h = 23 - splittedTime[0];
  const m = 59 - splittedTime[1];
  const s = 60 - splittedTime[2];

  // return h + ":" + m + ":" + s;
  return { hours: h, minutes: m, seconds: s };
};

export const toFixedIfIsFloat = (number, floatCount = 3) => {
  if (!number) return;
  if (number === 0) return number;
  if (number?.toString()?.split(".")?.length > 1) {
    let newNumber =
      number?.toString()?.split(".")[0] +
      "." +
      number?.toString()?.split(".")[1]?.substring(0, floatCount);
    return newNumber;
  } else return number;
};

// get User Location Hook
export const useGetUserLocationHook = () => {
  const [userHasLocation, setUserHasLocation] = useState();
  const [userLatLng, setUserLatLng] = useState({
    lat: "36.54281568682346",
    lng: "53.01228299322737",
  });

  useEffect(() => {
    navigator?.geolocation?.getCurrentPosition(
      // Success
      (resp) => {
        setUserHasLocation(true);
        // 36.54281568682346, 53.01228299322737
        setUserLatLng({ lat: "36.54281568682346", lng: "53.01228299322737" });
      },
      // Error
      (err) => {
        setUserHasLocation(false);
        setUserLatLng({ lat: "36.54281568682346", lng: "53.01228299322737" });
      }
    );
  }, []);

  return {
    userLatLng,
    userHasLocation,
  };
};

// UTC Date to Persian Date Converter
export const toPersianDateConverter = (utcDate) => {
  const convertedDate = moment(utcDate).format("jYYYY/jM/jD HH:mm:ss");
  return convertedDate;
};

// Truncate Function
export const truncateStringFunction = (myString, length) => {
  const myTruncatedString = myString.substring(0, length) + "....";
  return myTruncatedString;
};
