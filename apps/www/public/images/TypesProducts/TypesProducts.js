import Image from "next/image";

export default function TypesProducts() {
  return (
    <article class="baner-category">
      <div class="container-category">
        <h2 class="text-category">انواع محصولات</h2>
        <div class="card-category">
          <div class="card-item">
            <a href="#" class="cart-link">
              <img src="./images/sandali-rak-300x300.webp" alt="cart-img" />
              <p class="name-category">صندلی راک</p>
            </a>
          </div>
          <div class="card-item">
            <a href="#" class="cart-link">
              <img src="./images/takht-300x300.webp" alt="cart-img" />
              <p class="name-category">تختخواب</p>
            </a>
          </div>
          <div class="card-item">
            <a href="#" class="cart-link">
              <img src="./images/sandali-rak-300x300.webp" alt="cart-img" />
              <p class="name-category">صندلی راک</p>
            </a>
          </div>
          <div class="card-item">
            <a href="#" class="cart-link">
              <img src="./images/takht-300x300.webp" alt="cart-img" />
              <p class="name-category">تختخواب</p>
            </a>
          </div>
          <div class="card-item">
            <a href="#" class="cart-link">
              <Image src="./images/sandali-rak-300x300.webp" alt="cart-img" />
              <p class="name-category">صندلی راک</p>
            </a>
          </div>
          <div class="card-item">
            <a href="#" class="cart-link">
              <Image src="./images/takht-300x300.webp" width={0} height={0} sizes="100vw" style={{width:"100%",height:"auto"}} alt="cart-img" />
              <p class="name-category">تختخواب</p>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
