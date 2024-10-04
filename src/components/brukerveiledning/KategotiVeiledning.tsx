import React from "react";

interface KategotiVeiledningProps {
  title: string;
  img: string;
  orderText: string;
  orderImg: string;
  description: string;
}

const KategotiVeiledning: React.FC<KategotiVeiledningProps> = ({
  title,
  img,
  orderText,
  orderImg,
  description,
}) => {
  return (
    <div className={`mb-40 grid grid-cols-2 gap-4`}>
      <div className={`w-full ${orderImg}`}>
        <img className="w-full" src={img} alt="" />
      </div>
      <div className={`${orderText}`}>
        <h1 className="mb-5 text-5xl text-black">{title}</h1>
        <p className="text-black">{description}</p>
        <div className="mt-10">
          <button className="btn">Les mer</button>
        </div>
      </div>
    </div>
  );
};

export default KategotiVeiledning;
