"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function NextNProgress({ children }) {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#fca311"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </>
  );
}
