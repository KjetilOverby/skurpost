import React from "react";

const CreateEditList = () => {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold text-black">
        Lag/rediger skurliste
      </h1>
      <p className="mb-10 text-lg text-gray-500">
        For å lage skurliste går du til headerene og velger{" "}
        <span className="text-blue-500">Rediger{" > "} Rediger skurliste</span>{" "}
        og du vil komme til denne skjermen:
      </p>
      <div className="w-full">
        <img
          className="w-full"
          src="https://lh3.googleusercontent.com/pw/AP1GczNtwN3eN508W_dcbGMIZ1xAGdVQt3meSPgvW-spToxzD7scx9sRr7KV6IVC3OJPcE6Z7AQg6VZGt2hAcwOZlosa7SUFRJHmtJ9DAQ1byBf-fCpv4ePMbgYC3NArSQuTgHEYi2eQZ09PKTBkAThNq-9D=w1777-h765-s-no?authuser=0"
          alt=""
        />
      </div>

      <p className="mb-10 mt-10 text-lg text-gray-500">
        Her legger man inn de forskjellige detaljer som er på skurlisten. For at
        klikksøk skal fungere må man legge inn feltet{" "}
        <span className="text-blue-500">Post, Bredde og prosent</span>, da vil
        det fungere å klikke på listen og få opp postene som har den dataen
        dersom de eksisterer. Bortsett fra det er det ikke nødvendig å legge inn
        noe mer. Men hvis ønskelig kan man legge inn resten av detaljene som er
        på skurlisten. på <span className="text-blue-500">Post</span> feltet må
        det legges in f. eks: 2x50 og bruk liten x. Feltene sier seg selv hva de
        skal inneholde men det er et felt som heter{" "}
        <span className="text-blue-500">status</span>, der kan man velge{" "}
        <span className="text-blue-500">Planlagt, Aktiv eller fullført</span>.
        Dette vil vise hvilke poster som er kjørt eller ikke.
      </p>
      <div className="w-[25rem] 3xl:w-[35rem]">
        <img
          className="w-full"
          src="https://lh3.googleusercontent.com/pw/AP1GczOWrmyuhK0_L5TEnOywK-Nz1v_bZ38BuzCU5n6c4ZaZM77bzqeBSkAx_9-p15PGgVvz8uMcbxDQNAWhiUZyavP_xeAEVdg1XTKxDuP7B_Vpc0YSDZFmPSAUL_6Wm74qcuDKweT-rjMQQq1i4mUrDcgC=w403-h321-s-no?authuser=0"
          alt=""
        />
      </div>
      <p className="mb-10 mt-10 text-lg text-gray-500">
        På bildet ovenfor ser man knapper som er i enden av hver post i
        skurlisten. klikk på
        <span className="text-blue-500"> Rediger</span> og da vil knappene
        forandre seg til dette:
      </p>
      <div className="w-[25rem] 3xl:w-[35rem]">
        <img
          className="w-full"
          src="https://lh3.googleusercontent.com/pw/AP1GczP6kDQnPM5IxGXqHcfy84z9uDGNHY463TD7_vm4acC7i2zfkOJ8EePtfS5PmxiVTKdNwgSud7czZPGj-PogeiV6F3HUK6-_JrJAxs-OHx-69Cyzxqb1IJeiQezuyjVYGxJPrOYr1VrUJ-VHpH7Y61wN=w393-h70-s-no?authuser=0"
          alt=""
        />
      </div>
      <p className="mb-10 mt-10 text-lg text-gray-500">
        Da vil du få opp en <span className="text-blue-500"> Oppdater</span>{" "}
        knapp og en <span className="text-blue-500"> Avbryt</span> Etter at du
        har gjort endringer i input feltene så kan du klikke på{" "}
        <span className="text-blue-500"> Oppdater</span>, da vil de nye dataene
        du har lagt inn bli oppdatert. Hvis du ikke vil lagre endringene kan du
        klikke på <span className="text-blue-500"> Avbryt</span> og da vil ingen
        endringer skje. Trykk på <span className="text-blue-500"> Slett</span>{" "}
        knappen for å slette posten og pilene opp og ned kan man flytte postene
        dit man ønsker dem.
      </p>
    </section>
  );
};

export default CreateEditList;
