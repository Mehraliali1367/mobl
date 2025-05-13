import Image from "next/image";

export default function Divider({ img_src }) {
  return (
    <div className="divider-product">
      <Image
        src={img_src}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        alt="image-slider"
      />
    </div>
  );
}
