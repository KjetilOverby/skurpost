import React from "react";

interface BladeProps {
  blade: number;
}

const Blade: React.FC<BladeProps> = ({ blade }) => {
  return (
    <div className="relative z-20 grid h-48 w-[1px] place-items-center bg-secondary sm:h-60 sm:w-[2px] md:h-96 md:w-1">
      <p className="absolute bottom-96 text-sm ">{blade}</p>

      <p className="absolute top-96 text-sm ">
        {(blade + 1.4).toFixed(1)}{" "}
        <span className="text-transparent">{blade}</span>
      </p>
    </div>
  );
};

export default Blade;
