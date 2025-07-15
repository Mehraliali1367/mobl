"use client";
import { useEffect } from "react";
import { getBlurDataUrl } from "../../../utils/helper";
import Image from "next/image";

export default function HeaderSlider() {
  function startSetInterval() {
    let slideIndex = 0;
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    dots[0].className = dots[0].className.replace(" active", "");
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }

  useEffect(() => {
    try {
      startSetInterval();
      let slideIndex = 0;
      const interval = setInterval(() => {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
          slideIndex = 1;
        }
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
      }, 5000);
      return () => clearInterval(interval);
    } catch (error) {
      console.log("error event in slider header");
    }
  }, []);
  return (
    <section className="baner-home section-center">
      <article className="baner-pic">
        <div className="conteiner-silder section-center">
          <div className="conteiner-silder-item baner-slider">
            <div className="slideshow-container">
              <div className="mySlides fade">
                <Image
                  src="/images/Header/1.webp"
                  placeholder="blur"
                  blurDataURL={getBlurDataUrl()}
                  width={0}
                  height={0}
                  sizes="100"
                  style={{ width: "100%", height: "auto" }}
                  alt="image1"
                />
                <div className="text">مبل کلاسیک</div>
              </div>
              <div className="mySlides fade">
                <Image
                  src="/images/Header/2.webp"
                  placeholder="blur"
                  blurDataURL={getBlurDataUrl()}
                  width={0}
                  height={0}
                  sizes="100"
                  style={{ width: "100%", height: "auto" }}
                  alt="image2"
                />
                <div className="text">مدل سوسولی</div>
              </div>

              <div className="mySlides fade">
                <Image
                  src="/images/Header/3.webp"
                  placeholder="blur"
                  blurDataURL={getBlurDataUrl()}
                  width={0}
                  height={0}
                  sizes="100"
                  style={{ width: "100%", height: "auto" }}
                  alt="image3"
                />
                <div className="text">مدل ثمین</div>
              </div>
              <div className="container-dot">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>
          <div className="conteiner-silder-item baner-collection">
            <div className="baner-collection-item">
              <Image
                src="/images/Header/1-1.webp"
                placeholder="blur"
                blurDataURL={getBlurDataUrl()}
                width={0}
                height={0}
                sizes="80"
                style={{ width: "100%", height: "auto" }}
                alt="image1-1"
              />
            </div>
            <div className="baner-collection-item">
              <Image
                src="/images/Header/1_2.webp"
                placeholder="blur"
                blurDataURL={getBlurDataUrl()}
                width={0}
                height={0}
                sizes="80"
                style={{ width: "100%", height: "auto" }}
                alt="image1_2"
              />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
