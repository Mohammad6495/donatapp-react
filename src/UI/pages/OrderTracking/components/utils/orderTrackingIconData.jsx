import {
  AccessTime,
  CheckCircle,
  Timelapse,
  ScheduleSend,
  Paid,
  Microwave,
  LocalShipping,
} from "@mui/icons-material";

export const orderIconFakeData = [
  { id: 2, text: "در حال تایید(منتظر تماس ما باشید)", Icon: Timelapse },
  { id: 5, text: "در حال آماده سازی", Icon: Microwave },
  { id: 6, text: "در انتظار پرداخت نهایی", Icon: AccessTime },
  { id: 7, text: "پرداخت نهایی انجام شد", Icon: Paid },
  { id: 9, text: "در حال ارسال", Icon: ScheduleSend },
  { id: 10, text: "تحویل داده شد", Icon: LocalShipping },
];
