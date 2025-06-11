import { Button } from "@mui/material";

export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      style={{ padding: "2rem", width: "100%", minHeight: "100vh" }}
      role="alert"
    >
      <p>لطفا از این صفحه اسکرین شات بگیرید و برای پشتیبانی ارسال نمایید .</p>
      <p style={{ margin: "0 1.5rem" }} className="text-wrap my-3" dir="ltr">
        {error.message}
      </p>
      <div className="m-0 p-3 d-flex flex-row justify-content-center align-items-center">
        <Button
          className="flex-grow-1"
          variant="contained"
          color="primary"
          onClick={() => {
            window.location.reload();
          }}
        >
          بارگذاری مجدد
        </Button>
        <span
          style={{
            width: "1rem",
          }}
        ></span>
        <Button
          className="flex-grow-1"
          variant="contained"
          color="primary"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          رفتن به صفحه خانه
        </Button>
      </div>
    </div>
  );
}
