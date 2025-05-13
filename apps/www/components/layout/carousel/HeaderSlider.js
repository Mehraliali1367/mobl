import { getBlurDataUrl } from "@/utils/helper";
import Image from "next/image";

export default function HeaderSlider() {
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
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  alt="image1"/>
                <div className="text">مبل کلاسیک</div>
              </div>
              <div className="mySlides fade">
                <Image
                  src="/images/Header/2.webp"
                  placeholder="blur"
                  blurDataURL={getBlurDataUrl()}
                  width={0}
                  height={0}
                  sizes="100vw"
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
                  sizes="100vw"
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
                sizes="100vw"
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
                sizes="100vw"
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
