import React from "react";

const AltUtfyllingSection = () => {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold text-black">
        Alternativ utfylling
      </h1>
      <p className="mb-10 text-lg text-gray-500">
        Hvis du vil lage en alternativ utfylling kan du klikke på{" "}
        <span className="text-blue-500">Vis alternativ</span> knappen som er på
        hver side under beregningen. Legge inn utfylling foregår da akkurat på
        samme måte som standard utfyllingen, det vil stå{" "}
        <span className="text-green-600">utfylling foran/bak Alternativ</span>{" "}
        over input på utfyllingsringer.
      </p>
      <br />
      <p className="mb-10 text-lg text-gray-500"></p>
      <div className="w-[50rem] 3xl:w-[50rem]">
        <img
          className="w-full"
          src="https://lh3.googleusercontent.com/pw/AP1GczOkuZGfpNKwmTG40JC3vyWNmQ8daTLo8Tmv3su_DBH-P_zDys7r6uDUNpN-XGyb6Xwwa9XI0M3V8PVxyETZ5V09Q86Co2rE48RsMx5kzA8NmWTRrZQ-diW-SYe4OQqTTFFxQsAFFK9ZJBLXnSFjEzjQ=w1088-h432-s-no?authuser=0"
          alt=""
        />
      </div>
      <p className="mt-10 text-lg text-gray-500">
        Når man er på postoppsettsiden så vil man få opp en knapp som det står{" "}
        <span className="text-green-600">Alt</span> på dersom det er et
        alternativ. Dersom det ikke finnes alternativ vises heller ingen knapp.
      </p>
    </section>
  );
};

export default AltUtfyllingSection;
