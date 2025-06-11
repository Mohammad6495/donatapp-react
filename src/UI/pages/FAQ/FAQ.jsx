import React from "react";
import FaqItem from "./components/FaqItem";
import { faqItemFakeData } from "./utils/faqItemFakeData";

const FAQ = () => {
  return (
    <section
      style={{ overflowY: "auto" }}
      className="m-0 p-0 py-2 d-flex flex-column justify-content-start align-items-center w-100 hidden-scrollbar"
    >
      <div className="w-100">
        {faqItemFakeData?.map((it) => (
          <FaqItem
            key={it?.id}
            number={it?.id}
            question={it?.question}
            answer={it?.answer}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
