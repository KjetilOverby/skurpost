import React from "react";
import Image from "next/image";
const postoppsettEdit = "/assets/postoppsettEdit.png";
const input = "/assets/input.png";
const utfyllingForan = "/assets/utfyllingForan.png";

const CreatePostSection = () => {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold text-black">Lag ny post</h1>
      <p className="mb-10 text-lg text-gray-500">
        For å lage en ny post så klikker man på Rediger i headeren og velger Lag
        ny post fra menyen. Da vil du komme til siden der man kan lage poster.
        (Det er også mulig å lage nye poster når man er inne å redigerer en post
        ved å lagre som ny, les mer på{" "}
        <span className="text-blue-500">Rediger post</span>)
      </p>
      <div className="w-[55rem] 3xl:w-[50rem]">
        <Image
          src={postoppsettEdit}
          alt="Postoppsett"
          layout="responsive"
          width={1920}
          height={1080}
        />
      </div>
      <div className="">
        <p className="mb-5 mt-10 text-lg text-gray-500">
          I input feltet i midten må man legge inn:
        </p>
        <ul className="list-inside list-disc text-lg text-gray-500">
          <li>Råmål</li>
          <li>Planketykkelse</li>
          <li>Prosent</li>
          <li>Sagbladtykkelse</li>
        </ul>
        <p className="mb-5 mt-10 text-lg text-gray-500">
          disse 4 feltene er de som brukes når man utfører søk ved klikk på
          skurliste, hvis ikke disse feltene stemmer overens med det som er i
          skurlista vil man ikke finne posten. Etter at man har lagt inn det kan
          man se Differanse i rødt på hver side over posten. Der må man fylle ut
          utfyllingsringer til man får 0 i differanse og da vil skriften bli
          grønn. Alle mål opererer i mm.
        </p>

        <div className="w-[30rem]">
          <Image
            src={input}
            alt="Postoppsett"
            layout="responsive"
            width={1920}
            height={1080}
          />
        </div>
      </div>
      <h2 className="my-8 text-xl font-bold text-black">Utfyllingsringer</h2>
      <div className="flex">
        <div className="mr-10 w-[35rem]">
          <Image
            src={utfyllingForan}
            alt="Postoppsett"
            layout="responsive"
            width={1920}
            height={1080}
          />
        </div>
        <div>
          <p className="text-lg text-gray-500">
            Utfyllingsringene kan skrives inn manuelt i input på hver side av
            posten. Disse representerer sin side (utfylling foran og utfylling
            bak). Man kan også lage knapper med ringverdien som man har
            tilgjengelig sånn at man lett ser hva man har og at man bare kan
            klikke på disse for å legge til ringene (se bildet til venstre). Se{" "}
            <span className="text-blue-500">
              Instillinger {">"} Definer ringer
            </span>{" "}
            for forklaing av hvordan man legger til ringer
          </p>
          <br />
          <p className="text-lg text-gray-500">
            Når begge sider har 0 i differanse så kan posten lagres som ny ved å
            klikke i headeren{" "}
            <span className="text-blue-500">
              Menu
              {" >"} Lagre som ny post
            </span>
            . Valget om å Lagre som ny post kommer kun når utfylling er riktig.
          </p>
        </div>
      </div>
      <div className="mb-10">
        <h1 className="mb-4 mt-10 text-lg font-bold text-black">
          Redigere post
        </h1>
        <p className="text-lg text-gray-500">
          Når en post oppe i postoppsett, gå til{" "}
          <span className="text-green-500">Menu</span> og velg{" "}
          <span className="text-green-500">Rediger Post</span>. Da er man inne
          på samme side som om man skal lage en ny post men her har man en post
          oppe. Dette gjør at du kan lagre data som er redigert men vær obs på
          at data som var opprinnelig på den posten du har opp vil bli
          overskrevet.
        </p>
        <br />
        <p className="text-lg text-gray-500">
          Hvis du vil beholde begge postenen skal du velge lagre som ny post,
          dette vil ikke påvirke den opprinnelige posten noen ting. Hvis du ikke
          skal gjøre noe likevel kan du klikke på{" "}
          <span className="text-green-500">Menu</span> og velg{" "}
          <span className="text-green-500">Avbryt</span> for å gå tilbake til
          postoppsett. Poster som har samme navn kan ikke lagres.
        </p>
      </div>
    </section>
  );
};

export default CreatePostSection;
