import React from "react";

const SearchSection = () => {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold text-black">Skurliste og søk</h1>
      <p className="text-lg text-gray-500">
        For å søke etter poster går du til{" "}
        <span className="text-blue-500">Skurliste</span> og klikker på posten du
        vil søke på. Da vil du få opp en liste over poster som har samme data
        som du har klikket på. Hvis du vil søke på flere data så kan du legge
        inn flere data i input feltene og klikke på{" "}
        <span className="text-blue-500">Søk</span> knappen.
      </p>
    </section>
  );
};

export default SearchSection;
