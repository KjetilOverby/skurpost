import React, { useState } from "react";

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("introduction");

  return (
    <div className="mx-40 mt-20 flex min-h-screen bg-slate-200 3xl:mx-[60rem]">
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
              Lag post
            </button>
            <button
              onClick={() => setActiveTab("editPost")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "editPost" ? " font-bold" : ""
              }`}
            >
              Rediger post
            </button>
            <button
              onClick={() => setActiveTab("rawMeasure")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "rawMeasure" ? " font-bold" : ""
              }`}
            >
              Råmål
            </button>
            <button
              onClick={() => setActiveTab("rawMeasure")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "e" ? " font-bold" : ""
              }`}
            >
              Dele opp verdi råmål
            </button>
            <button
              onClick={() => setActiveTab("e")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "e" ? " font-bold" : ""
              }`}
            >
              Alternativ utfylling
            </button>
          </nav>
        </div>
        <div>
          <h1 className="mb-2 mt-5 font-bold text-black">Skurlister og søk</h1>
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("listCreate")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200 ${
                activeTab === "introduction" ? "font-bold" : ""
              }`}
            >
              Lag skurliste
            </button>
            <button
              onClick={() => setActiveTab("editList")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "e" ? "bg-gray-300 font-bold" : ""
              }`}
            >
              Rediger skurliste
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "crea" ? " font-bold" : ""
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
              I dette eksemplet er det to knapper som heter ALT og disse er der
              for at det er en alternativ utfylling tilgjengelig. Hvis noen av
              ringene er i bruk så kan man trykke på ALT kanppen og få en
              alternativ utfylling.
            </p>
            <div className="w-[40rem] 3xl:w-[50rem]">
              <img
                className="w-full"
                src="https://lh3.googleusercontent.com/pw/AP1GczPIZyCWsfZ8OShKXHjIPosZpGUADeZT7z5LDYuDtVCaIjAewAvtADV__WEoIW0RyfUrE9i7J4Z_4te-sqZjQsVcuQ9-JQ4Y6hhFLQuIW4U0w_d0j3_eQ6gCxEMZboNw0_2HP5ZG5lY5yQIjQlOjqnAe=w853-h430-s-no?authuser=0"
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
            <h2 className="my-8 text-xl text-black">Utfyllingsringer</h2>
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
          </section>
        )}
        {activeTab === "editPost" && (
          <section>
            <h1 className="mb-4 text-2xl font-bold text-black">
              Redigere post
            </h1>
            <p className="text-lg text-gray-500">
              Når en post oppe i postoppsett, gå til{" "}
              <span className="text-green-500">Menu</span> og velg{" "}
              <span className="text-green-500">Rediger Post</span>. Da er man
              inne på samme side som om man skal lage en ny post men her har man
              en post oppe. Dette gjør at du kan lagre data som er redigert men
              vær obs på at data som var opprinnelig på den posten du har opp
              vil bli overskrevtet.
            </p>
            <br />
            <p className="text-lg text-gray-500">
              Hvis du vil beholde begge postenen skal du velge lagre som ny
              post, dette vil ikke påvirke den opprinnelige posten noen ting.
              Hvis du ikke skal gjøre noe likevel kan du klikke på{" "}
              <span className="text-green-500">Menu</span> og velg{" "}
              <span className="text-green-500">Avbryt</span> for å gå tilbake
              til postoppsett.
            </p>
          </section>
        )}
        {activeTab === "rawMeasure" && (
          <section>
            <h1 className="mb-4 text-2xl font-bold text-black">Råmål</h1>
            <p className="text-lg text-gray-500">
              Råmål legges inn i input feltet under posten
            </p>
          </section>
        )}
      </main>
    </div>
  );
};

export default Documentation;
