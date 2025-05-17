"use client";
import "../public/css/profilePage.css";
import "../public/css/modal.css";
import Link from "next/link";
import { logout } from "../actions/auth/loginAction";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/navigation";
export default function Layout({ children }) {
  const { logoutContext } = useContext(AuthContext);
  const router = useRouter();
  return (
    <section className="profile_section">
      <div className="profile-row">
        <div className="profile-article-sidebar">
          <ul className="list-group">
            <li className="list-group-item">
              <Link href="/profile">اطلاعات کاربر</Link>
            </li>
            <li className="list-group-item">
              <Link href="/profile/addresses">آدرس ها</Link>
            </li>
            <li className="list-group-item">
              <Link href="/profile/orders">سفارشات</Link>
            </li>
            <li className="list-group-item">
              <Link href="/profile/transactions">تراکنش ها</Link>
            </li>
            <li className="list-group-item">
              <a
                href="#"
                onClick={async () => {
                  await logout();
                  logoutContext();
                  router.push("/");
                }}
              >
                خروج
              </a>
            </li>
          </ul>
        </div>
        <div className="profile-form">{children}</div>
      </div>
    </section>
  );
}
