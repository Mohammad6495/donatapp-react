import { AccessTime, CheckCircle, Timelapse } from "@mui/icons-material";



export const orderStatusFakeData = [
  { id: 0, text: "جعبه وزن نشده (منتظر تماس ما باشید)", Icon: Timelapse },
  { id: 1, text: "جعبه وزن شده", Icon: CheckCircle },
  { id: 2, text: "در انتظار تایید", Icon: AccessTime },
  { id: 3, text: "در حال ارسال", Icon: Timelapse },
  { id: 4, text: "پایان سفارش", Icon: CheckCircle },
];
export const noCookieOrderStatusFakeData = [
  { id: 2, text: "در انتظار تایید (منتظر تماس ما باشید)", Icon: AccessTime, },
  { id: 3, text: "در حال ارسال", Icon: Timelapse },
  { id: 4, text: "پایان سفارش", Icon: CheckCircle },
];
