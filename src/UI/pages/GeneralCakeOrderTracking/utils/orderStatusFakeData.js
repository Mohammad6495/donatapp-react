import { AccessTime, CheckCircle, Timelapse } from "@mui/icons-material";

export const orderStatusFakeData = [
  { id: 0, text: "جعبه وزن نشده (منتظر تماس ما باشید)", icon: Timelapse },
  { id: 1, text: "جعبه وزن شده", icon: CheckCircle },
  { id: 2, text: "در انتظار تایید", icon: AccessTime },
  { id: 3, text: "در حال ارسال", icon: Timelapse },
  { id: 4, text: "پایان سفارش", icon: CheckCircle },
];
export const noCookieOrderStatusFakeData = [
  { id: 2, text: "در انتظار تایید (منتظر تماس ما باشید)", icon: AccessTime },
  { id: 3, text: "در حال ارسال", icon: Timelapse },
  { id: 4, text: "پایان سفارش", icon: CheckCircle },
];
