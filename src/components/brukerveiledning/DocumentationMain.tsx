import React, { useState } from "react";

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("introduction");

  return (
    <div className="mx-40 mt-20 flex min-h-screen bg-gray-100 3xl:mx-[50rem]">
      <aside className="w-64  p-5">
        <div>
          <h1 className="mb-2 font-bold text-black">Postoppsett</h1>
          <nav className="w-96 space-y-4 ">
            <button
              onClick={() => setActiveTab("introduction")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200 ${
                activeTab === "introduction" ? "font-bold" : ""
              }`}
            >
              Postning
            </button>
            <button
              onClick={() => setActiveTab("createPost")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "createPost" ? "font-bold" : ""
              }`}
            >
              Lag/rediger post
            </button>

            <button
              onClick={() => setActiveTab("rawMeasure")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "rawMeasure" ? " font-bold" : ""
              }`}
            >
              Del opp Ringer
            </button>

            <button
              onClick={() => setActiveTab("alt")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "alt" ? " font-bold" : ""
              }`}
            >
              Alternativ utfylling
            </button>
            <button
              onClick={() => setActiveTab("screen")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "screen" ? " font-bold" : ""
              }`}
            >
              Skjerm/nettleser
            </button>
          </nav>
        </div>
        <div>
          <h1 className="mb-2 mt-5 font-bold text-black">Skurlister og søk</h1>
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("list")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200 ${
                activeTab === "list" ? "font-bold" : ""
              }`}
            >
              Lag/rediger skurliste
            </button>

            <button
              onClick={() => setActiveTab("search")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "search" ? " font-bold" : ""
              }`}
            >
              Søk etter poster
            </button>
            <button
              onClick={() => setActiveTab("buffer")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "creat" ? " font-bold" : ""
              }`}
            >
              Buffer
            </button>
            <button
              onClick={() => setActiveTab("buffer")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "creat" ? " font-bold" : ""
              }`}
            >
              Status
            </button>
          </nav>
        </div>
        <div>
          <h1 className="mb-2 mt-5 font-bold text-black">Innstillinger</h1>
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("generelt")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200 ${
                activeTab === "generelt" ? "font-bold" : ""
              }`}
            >
              Generelt
            </button>
            <button
              onClick={() => setActiveTab("editList")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "editPost" ? "font-bold" : ""
              }`}
            >
              Definer ringer
            </button>
          </nav>
        </div>
      </aside>

      {/* Hovedinnhold */}
      <main className="flex-1 bg-white pl-10">
        {activeTab === "introduction" && (
          <section>
            <h1 className="mb-4 text-2xl font-bold text-black">Postoppsett</h1>
            <p className="mb-10 text-lg text-gray-500">
              Et eksempel på en ferdig post. Over ringen mellom sagbladene står
              råmålet i midten er verdien på ringene akkurat som i
              utfyllingsringene. Det er ikke alltid at man har tilgjengelige
              ringer i det målet som ringene har på plankesonen og vil oppdeling
              av ringen med tilgjengelige ringer og skims stå under ringene
              mellom bladene som i dette eksemplet er en 53,9 ring som er delt
              opp i en 51,7 ring, 0,5 og 0,3 shims.
            </p>
            <br />
            <p className="mb-10 text-lg text-gray-500">
              I dette eksemplet er det en knapp som heter ALT på utfylling foran
              og denne er der for at det er en alternativ utfylling
              tilgjengelig. Hvis noen av ringene er i bruk så kan man trykke på
              ALT kanppen og få en alternativ utfylling.
            </p>
            <div className="w-[40rem] 3xl:w-[50rem]">
              <img
                className="w-full"
                src="https://lh3.googleusercontent.com/pw/AP1GczOvyu67teWdocPj9ByqAwiu-Za_b82Bx3TjqDgP9E9VKGynuyEFUvNF1J-lm0d5_Yad-sQnHAsQBlFrNu-LGqxBDWm5yqiDnfHlrKELyRnafGce-FIaTirfD5MCqo4_o7Hd9NutPqfgnolLQIjEqRwh=w853-h430-s-no?authuser=0"
                alt=""
              />
            </div>
            <p className="mt-10 text-lg text-gray-500">
              Programmet har også utfylling bak når man bygger post og dette
              betyr at alle poster som bygges vil ha eksakt samme mål fra start
              til slutt. målet er laget sånn at da låsemutterne er satt på så
              vil den siste mutteren flykte med hylsa, dette gjør det enkelt å
              se om noe i posten er feil. Hvis mutteren stikker innenfor eller
              utenfor så må man gå gjennom posten for å finne feilen.
            </p>
          </section>
        )}
        {activeTab === "createPost" && (
          <section>
            <h1 className="mb-4 text-2xl font-bold text-black">Lag ny post</h1>
            <p className="mb-10 text-lg text-gray-500">
              For å lage en ny post så klikker man på Rediger i headeren og
              velger Lag ny post fra menyen. Da vil du komme til siden der man
              kan lage poster. (Det er også mulig å lage nye poster når man er
              inne å redigerer en post ved å lagre som ny, les mer på{" "}
              <span className="text-blue-500">Rediger post</span>)
            </p>
            <div className="w-[55rem] 3xl:w-[50rem]">
              <img
                className="w-full"
                src="https://lh3.googleusercontent.com/pw/AP1GczMpE1vHavQEQKO6PtWSxH_4m_DFLqO-l2cqigfmziTWtx5l4SJnuFy8GlPNHc8e5M6rWuetdMv3xT5ZpZQmG4cIDAt1J_96jThTTLA4fHoPV163v705aOkMDRON2hmlj4ioqdhr29ONVfp3A3TB5KVv=w4675-h2229-s-no?authuser=0"
                alt=""
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
                disse 4 feltene er de som brukes når man utfører søk ved klikk
                på skurliste, hvis ikke disse feltene stemmer overens med det
                som er i skurlista vil man ikke finne posten. Etter at man har
                lagt inn det kan man se Differanse i rødt på hver side over
                posten. Der må man fylle ut utfyllingsringer til man får 0 i
                differanse og da vil skriften bli grønn. Alle mål opererer i mm.
              </p>

              <div className="w-[30rem]">
                <img
                  className="w-full"
                  src="https://lh3.googleusercontent.com/pw/AP1GczNFafXLtv9_CGmBdyQhNf5PoTJdTAOH4lFNfflPRuLJXwWCD8zJYiP1gGSY9aKG26KJduC8i9PjA9hvYppMct9q1mI7aL_nMyaM1-vifKYX944bong6VngyR8GLs_gEh8S_1hqNn8OPiRgyLFu_cXWFbVoZYIaAbB3enfr8fj8dkxx2KDaupLonOTIleFhlBNr58cVIbtaE_G9mNg_C36Af9INC6_9EWyrIvTbLEJgc6I16cSYYego72d1j9c98nVJyn4AhOD1HwuZPJIxnRl3MreGIdK06s85kbHmh8RdmQofrFCKw1mxFwtRHaqxeqD_3-UUNfmBjcFyFy6s5LtvINDV3pXIife55a3b9VkGubBxLhTzux1rRRKEFr2-1RCaN7ALmNRcPZC7dJNtH4kilvk6ttxndgVqa7FOo-oGNltgpoUyYvC-LHwgXe-KX90ledh4tFCT4g3PfA-z27OSKua1lGLq8ywFK7OjladtVq_bGwk1wLxq45i_wPAZkfFMaGcqd0g2IXzpymrKg2xsew2nKOFEtumnMRaP-5gTme1Gb7haGfExxBr-aXW2q6m4k_I_GRYDkKVMJ7Guh4HsNX0O8ixacQjR5l7csrCmvUP0F2xJ9l1Yqt2MMhMbrx3gPqjw_I5Krug7uw0xC3Do1mIFiAk5UoWIgTfumeEdpmhGvWzT8XY_oAQPGpmdukbKjLEF08d8_HHDEsXEpZu9kkQMRsOCFYp_1_CiNPCfRvpnlOaUBYeR6Yy90-NYLEtjRP5g1-4O4egwJ3o5wTqIRAniTWTu4Ti7l1iFBgS7P7X1QP4IzLcUYttY5D0cQELowC-kQphrywlo2CIokD65rdXR2Pyqk4UcW0q3nYv4V-feZkrnZ19awmGynBKTDnfX1cdTXK46xFqv3PkCi_as=w812-h794-s-no?authuser=0"
                  alt=""
                />
              </div>
            </div>
            <h2 className="my-8 text-xl font-bold text-black">
              Utfyllingsringer
            </h2>
            <div className="flex">
              <div className="mr-10 w-[35rem]">
                <img
                  className="w-full"
                  src="https://lh3.googleusercontent.com/pw/AP1GczPR3W2uo9QV0FHc20AaXAa08TOeTfm0OHJd71zAUWR2nVMxTfOuU9cbyqkplgdb8zE2XWMNvD7niBQ-ih-gdP5pls1TTlXthampAAdX__NvmrESbNukoXQVCW19VkWcFpRZlakzKQgcb_a16NqCPnia-IqPol1STwSyg05kJ1aplY2CBJIMcvAv2BGnY-DAW_UAz6FF9ncdAArUW3C_cnXdRGLJNEdCNwgg0HvavJzD_Qk2udNqvO73MlFbASlYPPlcm5ldLcpIIiRQjWVs39tKZgkeks7V-u_AvRUKockXTO8eIGuNWfrsk9LkFvW5VrLOHZ0cV72UOw8FbcG9JsFi5gRamFugFXOWAk_B_9OZhDhcW6nT01AWskEwv2WsleXl_tF5befhATlMgQGgIbP92bLU6cMZRBGLxtRN9RvVdkZO5WVcJeKCn6el732FgpSz_zX0Iz-sqyvqzxuBbMrlcoFsusMFXtNTTNldkjJklsSA9R4Ei0I3Aq2ZXA3MmkQef1uShqGioCw9x0Dy0X0APMAslDyyBSJHZselrqM3NoOwc5meQc-LClWqNH-WN87PQbiGP8czHpKyThInOunygXA3WW8oLdZ9ADbVeoAaiK6CIXxY5Wy71Hpqy3dvQ7nwNqx3ZL-bx9IpRuIsI7Hcl2rtjBjtlVQpiFfHgr6HpBrqwDZAIMn9d-4G9LNtmnfSLPkCSWLb0JDoLLc9R_mI6Cj91xvkFcfyk1hbRNn10C97FMcFNuk9UPcZ75of72ZkRruNMRtpNhgZ7G9VCcOLRybZWV6v6UQoeWii0iPkAeVhruDcSQX5yfcdSMdMNM8zd6qF0aa7O0YcZ9SIr9SIF-KbDZauDdVVFa3TKrTdZnqQ3cz-cry7_VUVajYdfigkyUGnyMvw8k9m7VQ6mn_K=w678-h1978-s-no?authuser=0"
                  alt=""
                />
              </div>
              <div>
                <p className="text-lg text-gray-500">
                  Utfyllingsringene kan skrives inn manuelt i input på hver side
                  av posten. Disse representerer sin side (utfylling foran og
                  utfylling bak). Man kan også lage knapper med ringverdien som
                  man har tilgjengelig sånn at man lett ser hva man har og at
                  man bare kan klikke på disse for å legge til ringene (se
                  bildet til venstre). Se{" "}
                  <span className="text-blue-500">
                    Instillinger {">"} Definer ringer
                  </span>{" "}
                  for forklaing av hvordan man legger til ringer
                </p>
                <br />
                <p className="text-lg text-gray-500">
                  Når begge sider har 0 i differanse så kan posten lagres som ny
                  ved å klikke i headeren{" "}
                  <span className="text-blue-500">
                    Menu
                    {" >"} Lagre som ny post
                  </span>
                  . Valget om å Lagre som ny post kommer kun når utfylling er
                  riktig.
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
                <span className="text-green-500">Rediger Post</span>. Da er man
                inne på samme side som om man skal lage en ny post men her har
                man en post oppe. Dette gjør at du kan lagre data som er
                redigert men vær obs på at data som var opprinnelig på den
                posten du har opp vil bli overskrevet.
              </p>
              <br />
              <p className="text-lg text-gray-500">
                Hvis du vil beholde begge postenen skal du velge lagre som ny
                post, dette vil ikke påvirke den opprinnelige posten noen ting.
                Hvis du ikke skal gjøre noe likevel kan du klikke på{" "}
                <span className="text-green-500">Menu</span> og velg{" "}
                <span className="text-green-500">Avbryt</span> for å gå tilbake
                til postoppsett. Poster som har samme navn kan ikke lagres.
              </p>
            </div>
          </section>
        )}

        {activeTab === "screen" && (
          <section className="mb-10">
            <h1 className="mb-4 text-2xl font-bold text-black">
              Skjerm/nettleser
            </h1>

            <div className="mr-10 w-[35rem]">
              <img
                className="w-full"
                src="https://www.webfx.com/wp-content/uploads/2021/10/iStock-612224522.jpg"
                alt=""
              />
            </div>
            <p className="text-lg text-gray-500">
              Skjermer kommer i mange størrelser og oppløsninger. hvis skjermen
              har høy oppløsning så kan elementer på appen virke små og ved lav
              oppløsning kan ting flyte i hverandre. For å tilpasse dette kan
              man bruke zoom funksjonen som nettleseren har og tilpasse dette
              til ønsket størrelse.
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

            <h2 className="my-3 text-lg font-bold text-gray-700">
              Automatisk zoom
            </h2>
            <p className="mb-5 text-lg text-gray-600">
              Hvis man finner en perfekt zoom til en nettside så kan man i
              innstillinger låse zoom til den nettsiden sånn at det automatisk
              blir ønsket zoom når man åpner appen neste gang. sånn kan man
              gjøre det:
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
                    For individuelle nettsider, besøk siden, og juster zoomnivå
                    under <span className="font-bold">Zoom</span> i menyen
                    øverst til høyre.
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
                    Under <span className="font-bold">Generelt</span>, rull ned
                    til <span className="font-bold">Språk og utseende</span>.
                  </li>
                  <li>
                    Velg et standard zoomnivå, eller merk av for{" "}
                    <span className="font-bold">Zoom kun tekst</span>.
                  </li>
                  <li>
                    Firefox husker automatisk zoomnivået for hver nettside.
                  </li>
                </ol>
              </li>
              <li className="text-gray-600">
                <strong>Microsoft Edge:</strong>
                <ol className="list-decimal space-y-1 pl-4">
                  <li>
                    Åpne <span className="font-bold">Innstillinger</span> (
                    <code className="rounded bg-gray-200 px-1">
                      edge://settings/
                    </code>
                    ).
                  </li>
                  <li>
                    Gå til <span className="font-bold">Utseende</span>
                    -seksjonen.
                  </li>
                  <li>
                    Under <span className="font-bold">Zoom</span>, sett et
                    standard zoomnivå.
                  </li>
                  <li>
                    Edge husker også zoominnstillingene for individuelle
                    nettsider.
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
                    Safari husker zoomnivået for individuelle nettsider
                    automatisk.
                  </li>
                </ol>
              </li>
            </ul>
          </section>
        )}
        {activeTab === "alt" && (
          <section>
            <h1 className="mb-4 text-2xl font-bold text-black">
              Alternativ utfylling
            </h1>
            <p className="mb-10 text-lg text-gray-500">
              Hvis du vil lage en alternativ utfylling kan du klikke på{" "}
              <span className="text-blue-500">Vis alternativ</span> knappen som
              er på hver side under beregningen. Legge inn utfylling foregår da
              akkurat på samme måte som standard utfyllingen, det vil stå{" "}
              <span className="text-green-600">
                utfylling foran/bak Alternativ
              </span>{" "}
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
              Når man er på postoppsettsiden så vil man få opp en knapp som det
              står <span className="text-green-600">Alt</span> på dersom det er
              et alternativ. Dersom det ikke finnes alternativ vises heller
              ingen knapp.
            </p>
          </section>
        )}
        {activeTab === "rawMeasure" && (
          <section>
            <h1 className="mb-4 text-2xl font-bold text-black">
              Del opp ringene på råmål
            </h1>
            <p className="text-lg text-gray-500">
              Noen ganger kan et råmål gi en ringverdi som ikke eksisterer og må
              deles opp med ring og skims. Her skal vi gå gjennom et eksempel på
              hvordan dette skal gjøres.
            </p>
            <br />
            <p className="mb-10 text-lg text-gray-500">
              Når man er inne på siden der man lager poster så vil ringene som
              er for plankeuttak ha et + knapp. Trykk på denn og man får opp
              denne skjermen.
            </p>
            <div className="border shadow-xl">
              <img
                className="w-full"
                src="https://lh3.googleusercontent.com/pw/AP1GczPbLfuYBTG9QwZeCXNWiuSvO5VDmKnDSKmnRCns9GVzEw2_BAvsFMhHutzISSxEzYGZUb3PIaCkgBuE7KFmj5hDFHI2phSv95TQ5xB0whekEO2f1JeTr-pHynxSYXGrbCF-XiGF7ISISxSNFJqp18DEoC30kZpN_ussKWwosHOKLV9247Zgk0Jxyp_pv_r6GQZzObNmH8JXjw8Mw-vVpTgbdrIAR1e4VTSeK5XKupYGzxZM8IiMEkSpqG-C3PIyymqXzqCmorgAfTIvWr_ndVc9RcELrqmNSkJF3IKSbwq5TFK5tkpjMccDm476GhgSzaV13Fhv5vpnLc6mKIGLdU7SZDUDofXccxWX94dT3PnKY5uWviikUUeYSGSxp_psppCSyFfuiQUmdznIt2CgZdbKFdgNu9PzjG8OtKBEHEAFjKnEpcm9pKJ1dZs-9cVlnGo7v3gP2X104uyu9n0hfeEDopnYHKk7vBioEWUL6udP3pwaSQ25hNfVTZ9KFt4h53YcRN50-iUz4fzzbxXnMm7uvXj5ySq-94Jp2c6glrUjBzFabDGt_BMlB9YuXJuu9OFKPH8xNlyAFuR42mioDRj7QaNCjDMDpMM7PVSi6dLx07ZSzrRfWdaDuzXBQMJzEZbJI25ZYcGOJxJWFN6M_eEsjjBeZZOHMWXdZbRqx3xRdUxgVNX-FA4eAeV4T3lyY2QGF-4XMZVsOxU_n69c473cQJiPUWIST8a0AoBErt5HSN6mSDU6TZI25x4kdo_4ch5OVaeJ9GXhlw5IbY59oZziadrLzmI_83zCcY2jpaAx6IJvXZ6d_ifpCezZMp1N_4eFTVFB6NAlLU6OKqJP2JDduXyr0xBByKAPFfc5TXG28PAcd_SNRXxCgeBibADkGhKBm6efWnLgObHA7j8uXTV-C7wQ07sMOObaIRIOhU1C-wJZodwrPqO0x4LTLw=w1920-h1080-s-no?authuser=0"
                alt=""
              />
            </div>
            <p className="mb-10 mt-10 text-lg text-gray-500">
              På høyre side ser man det står X-verdi det er verdien som er på
              den ringen man klikker på. I dette tilfellet 53,6. Etter det så
              velger man en ring eller skriver inn verdien på ringen manuelt og
              da vil man se hva som blir igjen. Vi prøver 53,1 i dette
              tilfellet. Når man har valgt ring eller skrevet inn verdien så
              klikker man på kanappen som det står Ring på å da vil resultatet
              bli som dette
            </p>

            <div>
              <p className="text-3xl text-secondary">X-verdi: 53.6</p>
              <p className="text-2xl">Ring: 53.1</p>
              <p className="text-2xl">shims: 0</p>
              <p className="text-2xl">Shims2: 0.5</p>
            </div>
            <p className="mb-10 mt-10 text-lg text-gray-500">
              her ser man at ringen man valgte kommer på Ring og da regner
              programmet ut hva som blir igjen. i dette tilfellet er det igjen
              0.5 og det er en skims som er tilgjengelig. da kan man velge 0.5
              og klikke på SKIMS kanppen og resultatet blir slik:
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
              <img
                className="w-full"
                src="https://lh3.googleusercontent.com/pw/AP1GczNdppSB-9x9AzwqHeg_SK_zNxF6jObIZT8yfbvpzfFjhKmVj9MoZi8dU5bCXYSdW5aBPMe23ynoOWQ6vykpv2iA8NZ-3wB_Dor4V04ssdCDJxroMFJKUaTWZfSXp0vt4I3SVP4N11NL2xzJ8aXRE6zN76rVlgSWMpVlu7USRS1EHAoKpuIJ-wao_b9ng7PdFD7ojQqYWdIzb1eSSUyZ1F3lj0QaLxTUE74tMQGfe4iU-CD648pt8kp6C26kd2BRsSsVAqwbKkhm2Haj6LDrVKSjB90faY3O2VywABFc9_UhS4y7thoo81fyyvQJxn0FvEqQoj73SBvooELRfYCOM6eLkvoczoZpoEeseFUgo9LNeX0BB5GOVnk3rvXSfCV3x9-3YzE_jY3_RRJ7mVoIoBwu7hymeEaSIn82zjfjCtMxIxleZPBX7oo3qvFCteTEfedb1Okz6y2vDu4eKggqqPV0fDJzOruz1iQjlghr3qXqQC5CoJRfaaxY3DX16C32QNBp4mTw-HQBCq0dmAPALhPOlsMV2EFDwOKQgG6M09hbu3x9L6Yvz_igQhg7Ain7Bmc1IvjUskXY59_vzSoI7iUAQfFcKSgNNCEeNj6MeRjpYyaCFf6SR_GF44MGF2B5H4J-vhykPo6GN77nFhiwzFv_GTurQb_7yqGTxJ3HVY5VV-q6w1Jy6ixxC2JhznWRy2zBNyBl7j-sEBaDsZMpASVuAZsI6LPJdfHugiLGfVCOBKRFU5MfZwYvU8I6VvFVp4AOGMkgQtsfY5EL2QtvZxH6vVL8TGMvXwKUFX4JFDsAMQh43gZ0wmKli5dfTJhETVdaswCEI3tOJTDw35WB48jANwRVlFq3gyQZ1ERAwaoStZ-LjuR1T30SsVdd_xtfR3NZoHlmfYgCaGX0SX3k5z5l=w740-h856-s-no?authuser=0"
                alt=""
              />
            </div>
            <p className="mb-10 mt-10 text-lg text-gray-500">
              La os si at de to siste verdiene også er verdi vi ikke har og
              deler opp den også. Klikk på + knappen på 53,9 ringen og X-verdien
              vil bli oppdatert til 53,9. Velg deretter en ring sor å se hva som
              blir igjen. Hvis man ikke resultatet ser greit ut å dele opp
              videre kan man bare velge en annen ring og klikke på RING knappen
              en gang til og man får ny utregning. I dette tilfellet bruker vi
              53,1 ringen og resultatet blir slik:
            </p>
            <div>
              <p className="text-3xl text-secondary">X-verdi: 53.9</p>
              <p className="text-2xl">Ring: 53.1</p>
              <p className="text-2xl">shims: 0</p>
              <p className="text-2xl">Shims2: 0.8</p>
            </div>
            <p className="mb-10 mt-10 text-lg text-gray-500">
              Vi får igjen 0,8 og det er en verdi vi ikke har så vi må dele opp
              den en gang til. Vi har 0,3 skims og prøver den, klikk så på Skims
              Knappen.
            </p>
            <div>
              <p className="text-3xl text-secondary">X-verdi: 53.9</p>
              <p className="text-2xl">Ring: 53.1</p>
              <p className="text-2xl">shims: 0.3</p>
              <p className="text-2xl">Shims2: 0.5</p>
            </div>
            <div className="w-96 ">
              <img
                className="mt-20 w-full"
                src="https://lh3.googleusercontent.com/pw/AP1GczM0pI7KSrb2KjU3DihPReRpGEHmmFWFG7gUoKASxMnSRaPLLWu1n7-iZvFD4DKmcOIEgswSis1Vmr3PzbxReEnjOXZ6flBCyXsR9dEGCyqEc5WxrQ5YnuZPdjpuF5RxrlDdAvjVslV1VbUFAhCb3KVWaQKBqeAG_f45HNoC8i3d9dc35BsTooWITOcKjQ2gtSHZudx515SIU7kG9if6EXWCCTXCnr1sdAKE660AlmCq5FtIjNFY6cIzVeCdG6a6enWbVEns-jYiZhixX0_36KYfEas0h3gBIJpljNiGR_3CBb37BOzkkNbR9pFVuMMMMk23NNR256ZwjPh8PAgPPHQhQKr2542-tdcaNm1kolK5p-r9MPw3TA97OsxjiQlpa7oTIE90GMLL47QyeqZNh9Za08UGi5EDSCM3Yz1DtI4bYomLfzJ5PefAYVgJ4C2xXLT3R5kGISCllwaRY--Y40ATLax03-GIuf_iEXDgYY9dWBifK_ZCsJ0b43xphS5CVYYBRAQj5ytzq0ZDhvJ2byfEdGIO2QRwVSmlJ670cbHtJA8vEtKwdoN1h3ay7OK5dw0zbKp5F58vAYemuApb5FhnwoF2y-JtXzUDWRzENKdqImhwIUGwDRMtGS7PuhrtxyYiHSpgZ4Rk5Ebbcni1n8SDkO74c_lNvoHVDZdhjaPI8I4bSblheI0DlSzjkedZocTBsr2ebAujLsgNR53eZxthl7UqNpSWopDmh-4yHo1eHIQ8XHFzjNpBmfjs0P_duSGpX6cbhO8fNLL51tKvwf_Zy1hFIa38ULMICZSRlqHFL2oGU3Q0b_Cry7KDGv4XJQ8TLnilchaohEUIivI6S3CTIYKLqpEBSs_uCXGennoxNQ_AVtm8o7r0NyDoc8YyKlH4Jv1rIMv_XRIizpJ0BD5TmDynWv_dt8EouNmA55wsuWkJCRO1tHvXtma4=w740-h856-s-no?authuser=0"
                alt=""
              />
            </div>
            <p className="mb-10 mt-10 text-lg text-gray-500">
              Da vil sluttresultatet bli slik. Når man er ferdig klikker man på
              Lukk knappen øverst til venstre og man kommer tilbake til skjermen
              man bygger post med. Klikke man på pluss kanppen igjen så vil
              verdiene nullstille seg, noe man kan gjøre hvis man vil starte på
              nytt.
            </p>
          </section>
        )}
        {activeTab === "list" && (
          <section>
            <h1 className="mb-4 text-2xl font-bold text-black">
              Lag/rediger skurliste
            </h1>
            <p className="mb-10 text-lg text-gray-500">
              For å lage skurliste går du til headerene og velger{" "}
              <span className="text-blue-500">
                Rediger{" > "} Rediger skurliste
              </span>{" "}
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
              Her legger man inn de forskjellige detaljer som er på skurlisten.
              For at klikksøk skal fungere må man legge inn feltet{" "}
              <span className="text-blue-500">Post, Bredde og prosent</span>, da
              vil det fungere å klikke på listen og få opp postene som har den
              dataen dersom de eksisterer. Bortsett fra det er det ikke
              nødvendig å legge inn noe mer. Men hvis ønskelig kan man legge inn
              resten av detaljene som er på skurlisten. på{" "}
              <span className="text-blue-500">Post</span> feltet må det legges
              in f. eks: 2x50 og bruk liten x. Feltene sier seg selv hva de skal
              inneholde men det er et felt som heter{" "}
              <span className="text-blue-500">status</span>, der kan man velge{" "}
              <span className="text-blue-500">
                Planlagt, Aktiv eller fullført
              </span>
              . Dette vil vise hvilke poster som er kjørt eller ikke.
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
              Da vil du få opp en{" "}
              <span className="text-blue-500"> Oppdater</span> knapp og en{" "}
              <span className="text-blue-500"> Avbryt</span> Etter at du har
              gjort endringer i input feltene så kan du klikke på{" "}
              <span className="text-blue-500"> Oppdater</span>, da vil de nye
              dataene du har lagt inn bli oppdatert. Hvis du ikke vil lagre
              endringene kan du klikke på{" "}
              <span className="text-blue-500"> Avbryt</span> og da vil ingen
              endringer skje. Trykk på{" "}
              <span className="text-blue-500"> Slett</span> knappen for å slette
              posten og pilene opp og ned kan man flytte postene dit man ønsker
              dem.
            </p>
          </section>
        )}
        {activeTab === "search" && (
          <section>
            <h1 className="mb-4 text-2xl font-bold text-black">
              Skurliste og søk
            </h1>
            <p className="text-lg text-gray-500">
              For å søke etter poster går du til{" "}
              <span className="text-blue-500">Skurliste</span> og klikker på
              posten du vil søke på. Da vil du få opp en liste over poster som
              har samme data som du har klikket på. Hvis du vil søke på flere
              data så kan du legge inn flere data i input feltene og klikke på{" "}
              <span className="text-blue-500">Søk</span> knappen.
            </p>
          </section>
        )}
      </main>
    </div>
  );
};

export default Documentation;
