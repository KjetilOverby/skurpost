import React from "react";
import Image from "next/image";

const DivideRingsSection = () => {
  const ringdivideskjerm = "/assets/ringdivideskjerm.png";
  const ringdivide = "/assets/ringdivide.png";
  const ringdivide2 = "/assets/ringdivide2.png";
  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold text-black">
        Del opp ringene på råmål
      </h1>
      <p className="text-lg text-gray-500">
        Noen ganger kan et råmål gi en ringverdi som ikke eksisterer og må deles
        opp med ring og skims. Her skal vi gå gjennom et eksempel på hvordan
        dette skal gjøres.
      </p>
      <br />
      <p className="mb-10 text-lg text-gray-500">
        Når man er inne på siden der man lager poster så vil ringene som er for
        plankeuttak ha et + knapp. Trykk på denn og man får opp denne skjermen.
      </p>
      <div className="border shadow-xl">
        <Image
          src={ringdivideskjerm}
          alt="Ring divide skjerm"
          layout="responsive"
          width={1920}
          height={1080}
        />
      </div>
      <p className="mb-10 mt-10 text-lg text-gray-500">
        På høyre side ser man det står X-verdi det er verdien som er på den
        ringen man klikker på. I dette tilfellet 53,6. Etter det så velger man
        en ring eller skriver inn verdien på ringen manuelt og da vil man se hva
        som blir igjen. Vi prøver 53,1 i dette tilfellet. Når man har valgt ring
        eller skrevet inn verdien så klikker man på kanappen som det står Ring
        på å da vil resultatet bli som dette
      </p>

      <div>
        <p className="text-3xl text-secondary">X-verdi: 53.6</p>
        <p className="text-2xl">Ring: 53.1</p>
        <p className="text-2xl">shims: 0</p>
        <p className="text-2xl">Shims2: 0.5</p>
      </div>
      <p className="mb-10 mt-10 text-lg text-gray-500">
        her ser man at ringen man valgte kommer på Ring og da regner programmet
        ut hva som blir igjen. i dette tilfellet er det igjen 0.5 og det er en
        skims som er tilgjengelig. da kan man velge 0.5 og klikke på SKIMS
        kanppen og resultatet blir slik:
      </p>
      <div>
        <p className="text-3xl text-secondary">X-verdi: 53.6</p>
        <p className="text-2xl">Ring: 53.1</p>
        <p className="text-2xl">shims: 0.5</p>
        <p className="text-2xl">Shims2: 0</p>
      </div>
      <p className="mb-10 mt-10 text-lg text-gray-500">
        Da flytter 0.5 opp til Shims og skrives under ringen.
      </p>
      <div className="w-96 ">
        <Image
          src={ringdivide}
          alt="Ring divide skjerm"
          layout="responsive"
          width={1920}
          height={1080}
        />
      </div>
      <p className="mb-10 mt-10 text-lg text-gray-500">
        La os si at de to siste verdiene også er verdi vi ikke har og deler opp
        den også. Klikk på + knappen på 53,9 ringen og X-verdien vil bli
        oppdatert til 53,9. Velg deretter en ring sor å se hva som blir igjen.
        Hvis man ikke resultatet ser greit ut å dele opp videre kan man bare
        velge en annen ring og klikke på RING knappen en gang til og man får ny
        utregning. I dette tilfellet bruker vi 53,1 ringen og resultatet blir
        slik:
      </p>
      <div>
        <p className="text-3xl text-secondary">X-verdi: 53.9</p>
        <p className="text-2xl">Ring: 53.1</p>
        <p className="text-2xl">shims: 0</p>
        <p className="text-2xl">Shims2: 0.8</p>
      </div>
      <p className="mb-10 mt-10 text-lg text-gray-500">
        Vi får igjen 0,8 og det er en verdi vi ikke har så vi må dele opp den en
        gang til. Vi har 0,3 skims og prøver den, klikk så på Skims Knappen.
      </p>
      <div>
        <p className="text-3xl text-secondary">X-verdi: 53.9</p>
        <p className="text-2xl">Ring: 53.1</p>
        <p className="text-2xl">shims: 0.3</p>
        <p className="text-2xl">Shims2: 0.5</p>
      </div>
      <div className="w-96 ">
        <Image
          src={ringdivide2}
          alt="Ring divide skjerm"
          layout="responsive"
          width={1920}
          height={1080}
        />
      </div>
      <p className="mb-10 mt-10 text-lg text-gray-500">
        Da vil sluttresultatet bli slik. Når man er ferdig klikker man på Lukk
        knappen øverst til venstre og man kommer tilbake til skjermen man bygger
        post med. Klikke man på pluss kanppen igjen så vil verdiene nullstille
        seg, noe man kan gjøre hvis man vil starte på nytt.
      </p>
    </section>
  );
};

export default DivideRingsSection;
