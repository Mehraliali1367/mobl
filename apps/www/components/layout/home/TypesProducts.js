import Image from "next/image";
export default function TypesProducts(){
  return (
    <article className="baner-category section-center">
      <div className="container-category">
        <h2 className="text-category">انواع محصولات</h2>
        <div className="card-category">
          <div className="card-item">
            <a href="#" className="cart-link">
              <Image src="/images/TypesProducts/clasic.jpg" width={0} height={0} sizes="50" style={{width:"100%",height:"auto",margin:"auto"}}alt="cart-Image" />
              <p className="name-category">مبلمان کلاسیک</p>
            </a>
          </div>
          <div className="card-item">
            <a href="#" className="cart-link">
              <Image src="/images/TypesProducts/sofa.jpg" width={0} height={0} sizes="50" style={{width:"100%",height:"auto",margin:"auto"}}alt="cart-Image" />
              <p className="name-category">راحتی یا ال</p>
            </a>
          </div>
          <div className="card-item">
            <a href="#" className="cart-link">
              <Image src="/images/TypesProducts/bed.jpg" width={0} height={0} sizes="50" style={{width:"100%",height:"auto",margin:"auto"}}alt="cart-Image" />
              <p className="name-category">تختخواب</p>
            </a>
          </div>
          <div className="card-item">
            <a href="#" className="cart-link">
              <Image src="/images/TypesProducts/rock.jpg" width={0} height={0} sizes="50" style={{width:"100%",height:"auto",margin:"auto"}}alt="cart-Image" />
              <p className="name-category">صندلی راک</p>
            </a>
          </div>
          <div className="card-item">
            <a href="#" className="cart-link">
              <Image src="/images/TypesProducts/office.jpg" width={0} height={0} sizes="50" style={{width:"100%",height:"auto",margin:"auto"}}alt="cart-Image" />
              <p className="name-category">اداری</p>
            </a>
          </div>
          <div className="card-item">
            <a href="#" className="cart-link">
              <Image src="/images/TypesProducts/dinner.jpg" width={0} height={0} sizes="50" style={{width:"100%",height:"auto",margin:"auto"}}alt="cart-Image" />
              <p className="name-category">ناهارخوری</p>
            </a>
          </div>
          <div className="card-item">
            <a href="#" className="cart-link">
              <Image src="/images/TypesProducts/tv.jpg" width={0} height={0} sizes="50" style={{width:"100%",height:"auto",margin:"auto"}}alt="cart-Image" />
              <p className="name-category">میز تلویزیون</p>
            </a>
          </div>
          <div className="card-item">
            <a href="#" className="cart-link">
              <Image src="/images/TypesProducts/baby.jpg" width={0} height={0} sizes="50" style={{width:"100%",height:"auto",margin:"auto"}}alt="cart-Image" />
              <p className="name-category">کودک و نوجوان</p>
            </a>
          </div>
          <div className="card-item">
            <a href="#" className="cart-link">
              <Image src="/images/TypesProducts/hour.jpg" width={0} height={0} sizes="50" style={{width:"100%",height:"auto",margin:"auto"}}alt="cart-Image" />
              <p className="name-category">ساعت</p>
            </a>
          </div>
          <div className="card-item">
            <a href="#" className="cart-link">
              <Image src="/images/TypesProducts/luster.jpg" width={0} height={0} sizes="50" style={{width:"100%",height:"auto",margin:"auto"}}alt="cart-Image" />
              <p className="name-category">لوستر</p>
            </a>
          </div>
          <div className="card-item">
            <a href="#" className="cart-link">
              <Image src="/images/TypesProducts/console.jpg" width={0} height={0} sizes="50" style={{width:"100%",height:"auto",margin:"auto"}}alt="cart-Image" />
              <p className="name-category">آینه و کنسول</p>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
