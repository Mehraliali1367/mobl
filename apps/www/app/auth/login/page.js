"use client";
import Login from "../components/layout/auth/login/Login";
import Verify from "../components/layout/auth/login/Verify";
import { useState } from "react";

export default function loginPage() {
  //shwostate=100 ,show login and showstate=101,shio verify
  const [showState, setShowState] = useState(100);
  return (
    <>
      {showState === 100 && <Login showSetState={setShowState} />}
      {showState === 101 && <Verify showSetState={setShowState} />}
    </>
  );
}
