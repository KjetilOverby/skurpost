import React from "react";

const ScreenSection = () => {
  return (
    <section className="mb-10">
      <h1 className="mb-4 text-2xl font-bold text-black">Skjerm/nettleser</h1>

      <div className="mr-10 w-[35rem]">
        <img
          className="w-full"
          src="https://www.webfx.com/wp-content/uploads/2021/10/iStock-612224522.jpg"
          alt=""
        />
      </div>
      <p className="text-lg text-gray-500">
        Skjermer kommer i mange størrelser og oppløsninger. hvis skjermen har
        høy oppløsning så kan elementer på appen virke små og ved lav oppløsning
        kan ting flyte i hverandre. For å tilpasse dette kan man bruke zoom
        funksjonen som nettleseren har og tilpasse dette til ønsket størrelse.
      </p>
      <br />
      <p className="text-lg text-gray-500">
        Dette kan gjøres på følgende måte:
      </p>
      <h2 className="mt-10 text-lg font-bold text-gray-600">Windows</h2>
      <ul className="list-inside list-disc text-lg text-gray-500">
        <li>
          Zoom inn:{" "}
          <span className="mb-3 ml-2 inline-block h-7 rounded bg-gray-200 px-1 text-center leading-7">
            Ctrl
          </span>{" "}
          +{" "}
          <span className="mb-3 ml-2 inline-block h-7 w-7 rounded bg-gray-200 text-center leading-7">
            +
          </span>
        </li>
        <li>
          Zoom ut:{" "}
          <span className="mb-3 ml-2 inline-block h-7 rounded bg-gray-200 px-1 text-center leading-7">
            Ctrl
          </span>{" "}
          +{" "}
          <span className="mb-3 ml-2 inline-block h-7 w-7 rounded bg-gray-200 text-center leading-7">
            -
          </span>
        </li>
        <li>
          Tilbakestille zoom til 100%:{" "}
          <span className="mb-3 ml-2 inline-block h-7 rounded bg-gray-200 px-1 text-center leading-7">
            Ctrl
          </span>{" "}
          +{" "}
          <span className="mb-3 ml-2 inline-block h-7 w-7 rounded bg-gray-200 text-center leading-7">
            0
          </span>
        </li>
      </ul>
      <h2 className="mt-10 text-lg font-bold text-gray-600">Mac</h2>
      <ul className="list-inside list-disc text-lg text-gray-500">
        <li>
          Zoom inn:{" "}
          <span className="mb-3 ml-2 inline-block h-7 rounded bg-gray-200 px-1 text-center leading-7">
            Command (⌘)
          </span>{" "}
          +
          <span className="mb-3 ml-2 inline-block h-7 w-7 rounded bg-gray-200 text-center leading-7">
            +
          </span>
        </li>
        <li>
          Zoom ut:{" "}
          <span className="mb-3 ml-2 inline-block h-7 rounded bg-gray-200 px-1 text-center leading-7">
            Command (⌘)
          </span>{" "}
          +{" "}
          <span className="mb-3 ml-2 inline-block h-7 w-7 rounded bg-gray-200 text-center leading-7">
            -
          </span>{" "}
        </li>
        <li>
          Tilbakestille zoom til 100%:{" "}
          <span className="mb-3 ml-2 inline-block h-7 rounded bg-gray-200 px-1 text-center leading-7">
            Command (⌘)
          </span>{" "}
          +
          <span className="mb-3 ml-2 inline-block h-7 w-7 rounded bg-gray-200 text-center leading-7">
            +
          </span>{" "}
          +
          <span className="mb-3 ml-2 inline-block h-7 w-7 rounded bg-gray-200 text-center leading-7">
            0
          </span>
        </li>
      </ul>

      <h2 className="my-3 text-lg font-bold text-gray-700">Automatisk zoom</h2>
      <p className="mb-5 text-lg text-gray-600">
        Hvis man finner en perfekt zoom til en nettside så kan man i
        innstillinger låse zoom til den nettsiden sånn at det automatisk blir
        ønsket zoom når man åpner appen neste gang. sånn kan man gjøre det:
      </p>

      <ul className="list-disc space-y-12 pl-6 text-lg">
        <li className="text-gray-600">
          <strong className="mb-3">Google Chrome:</strong>
          <ol className="list-decimal space-y-1 pl-4">
            <li>
              Åpne <span className="font-bold">Innstillinger</span> (
              <code className="rounded bg-gray-200 px-1">
                chrome://settings/
              </code>
              ).
            </li>
            <li>
              Rull ned til <span className="font-bold">Utseende</span>
              -seksjonen.
            </li>
            <li>
              Velg zoomnivået ved siden av{" "}
              <span className="font-bold">Sidezoom</span>.
            </li>
            <li>
              For individuelle nettsider, besøk siden, og juster zoomnivå under{" "}
              <span className="font-bold">Zoom</span> i menyen øverst til høyre.
            </li>
          </ol>
        </li>
        <li className="text-gray-600">
          <strong>Firefox:</strong>
          <ol className="list-decimal space-y-1 pl-4">
            <li>
              Gå til <span className="font-bold">Innstillinger</span> (
              <code className="rounded bg-gray-200 px-1">
                about:preferences
              </code>
              ).
            </li>
            <li>
              Under <span className="font-bold">Generelt</span>, rull ned til{" "}
              <span className="font-bold">Språk og utseende</span>.
            </li>
            <li>
              Velg et standard zoomnivå, eller merk av for{" "}
              <span className="font-bold">Zoom kun tekst</span>.
            </li>
            <li>Firefox husker automatisk zoomnivået for hver nettside.</li>
          </ol>
        </li>
        <li className="text-gray-600">
          <strong>Microsoft Edge:</strong>
          <ol className="list-decimal space-y-1 pl-4">
            <li>
              Åpne <span className="font-bold">Innstillinger</span> (
              <code className="rounded bg-gray-200 px-1">edge://settings/</code>
              ).
            </li>
            <li>
              Gå til <span className="font-bold">Utseende</span>
              -seksjonen.
            </li>
            <li>
              Under <span className="font-bold">Zoom</span>, sett et standard
              zoomnivå.
            </li>
            <li>
              Edge husker også zoominnstillingene for individuelle nettsider.
            </li>
          </ol>
        </li>
        <li className=" text-gray-600">
          <strong>Safari (Mac):</strong>
          <ol className="list-decimal space-y-1 pl-4">
            <li>
              Åpne <span className="font-bold">Safari</span>, og gå til{" "}
              <span className="font-bold">Innstillinger</span> (
              <code className="rounded bg-gray-200 px-1">Cmd + ,</code>).
            </li>
            <li>
              Gå til <span className="font-bold">Avansert</span>-fanen.
            </li>
            <li>
              Merk av for{" "}
              <span className="font-bold">Nettstedsspesifikk zoom</span>.
            </li>
            <li>
              Safari husker zoomnivået for individuelle nettsider automatisk.
            </li>
          </ol>
        </li>
      </ul>
    </section>
  );
};

export default ScreenSection;
