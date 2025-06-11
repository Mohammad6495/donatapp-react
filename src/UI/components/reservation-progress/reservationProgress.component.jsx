import React, { useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";
import { MaterialLtrTheme } from "../../../core/contexts/MaterialThemeContext/MaterialThemeContext";
import { calculateDiff, getRemainingTime } from "../../../core/utility/utils";
import moment from "moment";
import "./ReservationProgress.scss";

const getFrom = (time) => {
  const miliseconds =  1000 * 60 * 6;
  const total = new Date(time).getTime() - miliseconds;
  const from = new Date(total);
  return from;
};

const ReservationProgress = ({
  reservationDate,
  onReservertionExpired,
  currentDate,
}) => {
  const [progress, setProgress] = useState(0);
  const [timeLeftObject, setTimeLeftObject] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const initialDate = new Date(currentDate);
    setFormattedTime(initialDate);
  }, [currentDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTime((prevFormattedTime) => {
        const updatedDate = new Date(prevFormattedTime);
        updatedDate.setSeconds(updatedDate.getSeconds() + 1);
        return updatedDate;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Asia/Tehran'
  };
  const date = new Date(formattedTime);
  
  const formatted = date.toLocaleString('en-US', options);
  const format = "dddd MMM DD YYYY HH:mm:ss";
  const result = moment(formatted, format).format("YYYY-MM-DD HH:mm:ss");
  useEffect(() => {
    let timer = null;
    const firstDiff = calculateDiff(
      reservationDate,
      getFrom(reservationDate),
      formatted
    );
    if (firstDiff.timeLeft > 0) {
      setTimeLeftObject({
        hours: firstDiff.h,
        minutes: firstDiff.m,
        seconds: firstDiff.s,
      });
      const diff = calculateDiff(reservationDate, undefined, formatted);

      setTimeLeftObject({
        hours: diff.h,
        minutes: diff.m,
        seconds: diff.s,
      });
      
      const percent = (diff.timeLeft * 100) / firstDiff.timeLeft;
      setProgress(Math.floor(percent));

      if (diff.timeLeft <= 0) {
        if (onReservertionExpired) {
          onReservertionExpired();
        }
        clearInterval(timer);
        return;
      }
    }
  }, [result]);

  return (
    <MaterialLtrTheme>
      {progress > 0 && (
        <div className="p-2 pb-0 m-0 w-100">
          <LinearProgress dir="ltr" variant="determinate" value={progress} />
          <div
            style={{ height: "30px" }}
            className="progress-text text-right mt-2 fs-10"
          >
            {`رزرو شده تا ${getRemainingTime(timeLeftObject)} دیگر`}
          </div>
          {/* <p>{formatted}</p> */}
        </div>
      )}
    </MaterialLtrTheme>
  );
};

export default ReservationProgress;

// import React, { useState, useEffect } from "react";
// import { LinearProgress } from "@mui/material";
// import { MaterialLtrTheme } from "../../../core/contexts/MaterialThemeContext/MaterialThemeContext";
// import { calculateDiff, getRemainingTime } from "../../../core/utility/utils";
// import "./ReservationProgress.scss";
// ///
// const getFrom = (time) => {
//   const miliseconds = 1000 * 60 * 6;
//   const total = new Date(time).getTime() - miliseconds;
//   const from = new Date(total);
//   return from;
// };
// const ReservationProgress = ({ reservationDate, onReservertionExpired }) => {
//   ///////////// States ///////////////
//   const [progress, setProgress] = useState(0);
//   const [timeLeftObject, setTimeLeftObject] = useState({
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   ///////////// useEffect ///////////////
//   useEffect(() => {
//     let timer = null;
//     // check if 'timeLeft' is bigger than zero, set it in 'timeLeftObject' (for first initialization)
//     const firstDiff = calculateDiff(reservationDate, getFrom(reservationDate));
//     if (firstDiff.timeLeft > 0) {
//       setTimeLeftObject({
//         hours: firstDiff.h,
//         minutes: firstDiff.m,
//         seconds: firstDiff.s,
//       });

//       // starting 'setInterval' :
//       timer = setInterval(() => {
//         const diff = calculateDiff(reservationDate);
//         setTimeLeftObject({
//           hours: diff.h,
//           minutes: diff.m,
//           seconds: diff.s,
//         });
//         // const from = getFrom(reservationDate);
//         // if(from.getHours() < new Date().getHours()) {

//         // }
//         const percent = (diff.timeLeft * 100) / firstDiff.timeLeft;
//         setProgress(Math.floor(percent));
//         if (diff.timeLeft <= 0) {
//           if (onReservertionExpired) {
//             onReservertionExpired();
//           }
//           clearInterval(timer);
//           return;
//         }
//       }, 1000);
//     }
//     // clear 'setInterval' if 'timer' is mounted:
//     return () => {
//       if (timer) clearInterval(timer);
//     };
//   }, []);
//   // Retrun Method
//   return (
//     <MaterialLtrTheme>
//       {progress > 0 && (
//         <div className="p-2 pb-0 m-0 w-100">
//           <LinearProgress dir="ltr" variant="determinate" value={progress} />
//           <div
//             style={{ height: "30px" }}
//             className="progress-text text-right mt-2 fs-10"
//           >{`
//       رزرو شده تا
//       ${getRemainingTime(timeLeftObject)} دیگر`}</div>
//         </div>
//       )}
//     </MaterialLtrTheme>
//   );
// };

// export default ReservationProgress;
