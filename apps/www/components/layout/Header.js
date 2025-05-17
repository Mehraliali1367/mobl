"use client";
import Image from "next/image";
import Link from "next/link";
import logo_shop from "../../public/images/logo/logo_shop.webp";
import { getBlurDataUrl } from "../../utils/helper";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useSelector } from "react-redux";
export default function Header() {
  const pathname = usePathname();
  const { user } = useContext(AuthContext);
  const state = useSelector((state) => state.shoppingCart);
  return (
    <section className="header">
      <article className="header-art-nav section-center">
        <div className="header-art-nav-item con-baner-img">
          <Image
            src={logo_shop}
            placeholder="blur"
            blurDataURL={getBlurDataUrl()}
            priority
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt="image-logo"
          ></Image>
        </div>
        <div className="header-art-nav-item con-icon-baner">
          <div className="con-icon-baner-item">
            <Link className="bascket" href="/cart">
              <i className="bi bi-basket"></i>
              <span className="bascket-count">{state.cart.length}</span>
            </Link>
          </div>
          <div className="con-icon-baner-item con-">
            {user ? (
              <Link className="profile" href="/profile/">
                <i className="bi bi-person-circle"></i>
              </Link>
            ) : (
              <Link className="profile" href="/auth/login/">
                <i className="bi bi-door-open-fill"></i>
              </Link>
            )}
          </div>
        </div>
        <div className="search-group">
          <input type="text" placeholder="نام مبل یا مدل خود را جستجو کنید" />
          <button className="btn btn-search">
            <i className="bi bi-search"></i>
          </button>
        </div>
      </article>
      <article className="header-nav">
        <ul className="nav-page-master-list">
          <li
            className={
              pathname === "/"
                ? "nav-page-master-list active"
                : "nav-page-master-list"
            }
          >
            <Link
              className="nav-page-master-link nav-page-master-link-ltr"
              href={"/"}
            >
              صفحه اصلی
            </Link>
          </li>
          <li
            className={
              pathname === "/products"
                ? "nav-page-master-list active"
                : "nav-page-master-list"
            }
          >
            <Link
              className="nav-page-master-link nav-page-master-link-ltr"
              href={"/products"}
            >
              محصولات
            </Link>
          </li>
          <li
            className={
              pathname === "/articles"
                ? "nav-page-master-list active"
                : "nav-page-master-list"
            }
          >
            <Link
              className="nav-page-master-link nav-page-master-link-ltr"
              href={"/articles"}
            >
              مقالات
            </Link>
          </li>
          <li
            className={
              pathname === "/rules"
                ? "nav-page-master-list active"
                : "nav-page-master-list"
            }
          >
            <Link
              className="nav-page-master-link nav-page-master-link-ltr"
              href={"/rules"}
            >
              قوانین
            </Link>
          </li>
          <li
            className={
              pathname === "/about"
                ? "nav-page-master-list active"
                : "nav-page-master-list"
            }
          >
            <Link
              className="nav-page-master-link nav-page-master-link-ltr"
              href={"/about"}
            >
              درباره ما
            </Link>
          </li>
        </ul>
      </article>
      <article className="breadcrumb section-center">
        <div className="art-breadcrumb">
          {/* <ul className="list-breadcrumb">
            <li className="item-breadcrumb">
              <a className="link-breadcrumb" href="#">
                صفحه اصلی
              </a>
            </li>
            <li className="item-breadcrumb">
              <a className="link-breadcrumb" href="#">
                محصولات
              </a>
            </li>
            <li className="item-breadcrumb">
              <a className="link-breadcrumb" href="#">
                مبلمان
              </a>
            </li>
            <li className="item-breadcrumb">
              <a className="link-breadcrumb" href="#">
                مبل کلاسیک
              </a>
            </li>
          </ul> */}
        </div>
      </article>
    </section>
  );
}
