import Image from "next/image";
import { GetPhoneClientAction } from "@/actions/homeActions/Home";
import GetPhoneClientForm from "./GetPhoneClientForm";

export default function Footer() {
  return (
    <section className="footer">
      <article className="container">
        <div className="accordion">
          <input
            className="accordion__trigger"
            id="accordion"
            type="checkbox"
          />
          <div className="container-title-drawer" htmlFor="accordion">
            <span className="title-icon">
              <i className="bi bi-diamond-fill"></i>
            </span>
            <label className="accordion__title" htmlFor="accordion">
              شهرمبل
            </label>
          </div>

          <div className="accordion__content-wrapper">
            <div className="accordion__content">
              <a href="">
                <p>درباره ما</p>
              </a>
              <a href="">
                <p>تماس با ما</p>
              </a>
              <a href="">
                {" "}
                <p>چرا شهر مبل</p>
              </a>
              <a href="">
                <p>مقالات</p>
              </a>
              <a href="">
                <p>همکاری در فروش</p>
              </a>
            </div>
          </div>
        </div>
        <div className="accordion">
          <input
            className="accordion__trigger"
            id="accordion-2"
            type="checkbox"
          />
          <div className="container-title-drawer">
            <span className="title-icon">
              <i className="bi bi-diamond-fill"></i>
            </span>
            <label className="accordion__title" htmlFor="accordion-2">
              خدمات به مشتریان
            </label>
          </div>
          <div className="accordion__content-wrapper">
            <div className="accordion__content">
              <a href="">
                {" "}
                <p>راهنمای ثبت سفارش</p>
              </a>
              <a href="">
                {" "}
                <p>پیگیری سفارش</p>
              </a>
              <a href="">
                {" "}
                <p>ارسال کالا و هزینه ارسال</p>
              </a>
              <a href="">
                <p>شرایط ضمانت</p>
              </a>
              <a href="">
                <p>پاسخ به سوالات متداول</p>
              </a>
            </div>
          </div>
        </div>
        <div className="accordion">
          <input
            className="accordion__trigger"
            id="accordion-3"
            type="checkbox"
          />
          <div className="container-title-drawer">
            <span className="title-icon">
              <i className="bi bi-diamond-fill"></i>
            </span>
            <label className="accordion__title" htmlFor="accordion-3">
              سایر اطلاعات
            </label>
          </div>
          <div className="accordion__content-wrapper">
            <div className="accordion__content">
              <a href="">
                <p>قوانین و مقررات ما</p>
              </a>
              <a href="">
                <p>نظرات خریدران</p>
              </a>
              <a href="">
                <p>تعمیرات مبل</p>
              </a>
            </div>
          </div>
        </div>
      </article>
      <article className="container-cer">
        <div className="contact-container">
          <div className="contact-title">
            <h3>شما چگونه میتوانید با ما در ارتباط باشید ؟</h3>
            <p>
              با ارسال شماره همراه خود ما با جدیدترین اخبار با شما در ارتباط هستیم
            </p>
          </div>
          <GetPhoneClientForm />
        </div>
        <div className="social">
          <span>
            <a className="social-telegram" href="">
              <i className="bi bi-telegram"></i>
            </a>
          </span>
          <span>
            <a className="social-eitaa" href="">
              <Image
                className="eitaa"
                width={10}
                height={10}
                src="/images/logo/eitaa.svg"
                alt="image-slider"
              />
            </a>
          </span>
          <span>
            <a className="social-intsagram" href="">
              <i className="bi bi-instagram"></i>
            </a>
          </span>
          <span>
            <a className="social-bale" href="">
              <Image
                className="bale"
                width={10}
                height={10}
                src="/images/logo/bale.svg"
                alt="image-slider"
              />
            </a>
          </span>
        </div>
        <div className="certifications">
          <div className="enamad">
            <Image
              className="cart-img"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              src="/images/logo/enamad.png"
              alt="image-slider"
            />
          </div>
        </div>
      </article>
    </section>
  );
}
