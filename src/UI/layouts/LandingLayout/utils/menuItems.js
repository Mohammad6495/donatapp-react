import personIcon from "../../../../assets/images/profile-icons/person.svg";
import receiptIcon from "../../../../assets/images/profile-icons/receipt.svg";
import receiptSearchIcon from "../../../../assets/images/profile-icons/receiptSearch.svg";
import judgeIcon from "../../../../assets/images/profile-icons/judge.svg";
import warningIcon from "../../../../assets/images/profile-icons/warning.svg";
import messageIcon from "../../../../assets/images/profile-icons/message.svg";
import logoutIcon from "../../../../assets/images/profile-icons/logout.svg";
import birthDay from '../../../../assets/images/profile-icons/birthday-cake.svg'
import qrCode from '../../../../assets/images/icons/icons8-qrcode-100.png'
export const authenticatedProfileDrawerLinksInformation = [
  {
    id: "2",
    title: "ادرس های من",
    iconUrl: personIcon,
    linkPath: "/profile",
  },
  {
    id: "2",
    title: "سفارشات",
    iconUrl: receiptIcon,
    linkPath: "/general-order-tracking",
  },
 

  { id: "8", title: "خروج", iconUrl: logoutIcon, linkPath: "#" },
  {
    id: "9",
    title: "ثبت نام / ورود",
    iconUrl: logoutIcon,
    linkPath: "/register",
  },
];

export const unAuthenticatedProfileDrawerLinksInformation = [

  {
    id: "3",
    title: "ثبت نام / ورود",
    iconUrl: logoutIcon,
    linkPath: "/register",
  }
];
