import React from "react";
import Image from "next/image";

const DivideRingsSection = () => {
  const ringdivideskjerm = "/assets/ringdivideskjerm.png";
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
        {/*   <img
      className="w-full"
      src="https://lh3.googleusercontent.com/pw/AP1GczPbLfuYBTG9QwZeCXNWiuSvO5VDmKnDSKmnRCns9GVzEw2_BAvsFMhHutzISSxEzYGZUb3PIaCkgBuE7KFmj5hDFHI2phSv95TQ5xB0whekEO2f1JeTr-pHynxSYXGrbCF-XiGF7ISISxSNFJqp18DEoC30kZpN_ussKWwosHOKLV9247Zgk0Jxyp_pv_r6GQZzObNmH8JXjw8Mw-vVpTgbdrIAR1e4VTSeK5XKupYGzxZM8IiMEkSpqG-C3PIyymqXzqCmorgAfTIvWr_ndVc9RcELrqmNSkJF3IKSbwq5TFK5tkpjMccDm476GhgSzaV13Fhv5vpnLc6mKIGLdU7SZDUDofXccxWX94dT3PnKY5uWviikUUeYSGSxp_psppCSyFfuiQUmdznIt2CgZdbKFdgNu9PzjG8OtKBEHEAFjKnEpcm9pKJ1dZs-9cVlnGo7v3gP2X104uyu9n0hfeEDopnYHKk7vBioEWUL6udP3pwaSQ25hNfVTZ9KFt4h53YcRN50-iUz4fzzbxXnMm7uvXj5ySq-94Jp2c6glrUjBzFabDGt_BMlB9YuXJuu9OFKPH8xNlyAFuR42mioDRj7QaNCjDMDpMM7PVSi6dLx07ZSzrRfWdaDuzXBQMJzEZbJI25ZYcGOJxJWFN6M_eEsjjBeZZOHMWXdZbRqx3xRdUxgVNX-FA4eAeV4T3lyY2QGF-4XMZVsOxU_n69c473cQJiPUWIST8a0AoBErt5HSN6mSDU6TZI25x4kdo_4ch5OVaeJ9GXhlw5IbY59oZziadrLzmI_83zCcY2jpaAx6IJvXZ6d_ifpCezZMp1N_4eFTVFB6NAlLU6OKqJP2JDduXyr0xBByKAPFfc5TXG28PAcd_SNRXxCgeBibADkGhKBm6efWnLgObHA7j8uXTV-C7wQ07sMOObaIRIOhU1C-wJZodwrPqO0x4LTLw=w1920-h1080-s-no?authuser=0"
      alt=""
    /> */}
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
        <img
          className="w-full"
          src="https://lh3.googleusercontent.com/pw/AP1GczNdppSB-9x9AzwqHeg_SK_zNxF6jObIZT8yfbvpzfFjhKmVj9MoZi8dU5bCXYSdW5aBPMe23ynoOWQ6vykpv2iA8NZ-3wB_Dor4V04ssdCDJxroMFJKUaTWZfSXp0vt4I3SVP4N11NL2xzJ8aXRE6zN76rVlgSWMpVlu7USRS1EHAoKpuIJ-wao_b9ng7PdFD7ojQqYWdIzb1eSSUyZ1F3lj0QaLxTUE74tMQGfe4iU-CD648pt8kp6C26kd2BRsSsVAqwbKkhm2Haj6LDrVKSjB90faY3O2VywABFc9_UhS4y7thoo81fyyvQJxn0FvEqQoj73SBvooELRfYCOM6eLkvoczoZpoEeseFUgo9LNeX0BB5GOVnk3rvXSfCV3x9-3YzE_jY3_RRJ7mVoIoBwu7hymeEaSIn82zjfjCtMxIxleZPBX7oo3qvFCteTEfedb1Okz6y2vDu4eKggqqPV0fDJzOruz1iQjlghr3qXqQC5CoJRfaaxY3DX16C32QNBp4mTw-HQBCq0dmAPALhPOlsMV2EFDwOKQgG6M09hbu3x9L6Yvz_igQhg7Ain7Bmc1IvjUskXY59_vzSoI7iUAQfFcKSgNNCEeNj6MeRjpYyaCFf6SR_GF44MGF2B5H4J-vhykPo6GN77nFhiwzFv_GTurQb_7yqGTxJ3HVY5VV-q6w1Jy6ixxC2JhznWRy2zBNyBl7j-sEBaDsZMpASVuAZsI6LPJdfHugiLGfVCOBKRFU5MfZwYvU8I6VvFVp4AOGMkgQtsfY5EL2QtvZxH6vVL8TGMvXwKUFX4JFDsAMQh43gZ0wmKli5dfTJhETVdaswCEI3tOJTDw35WB48jANwRVlFq3gyQZ1ERAwaoStZ-LjuR1T30SsVdd_xtfR3NZoHlmfYgCaGX0SX3k5z5l=w740-h856-s-no?authuser=0"
          alt=""
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
        <img
          className="mt-20 w-full"
          src="https://lh3.googleusercontent.com/pw/AP1GczM0pI7KSrb2KjU3DihPReRpGEHmmFWFG7gUoKASxMnSRaPLLWu1n7-iZvFD4DKmcOIEgswSis1Vmr3PzbxReEnjOXZ6flBCyXsR9dEGCyqEc5WxrQ5YnuZPdjpuF5RxrlDdAvjVslV1VbUFAhCb3KVWaQKBqeAG_f45HNoC8i3d9dc35BsTooWITOcKjQ2gtSHZudx515SIU7kG9if6EXWCCTXCnr1sdAKE660AlmCq5FtIjNFY6cIzVeCdG6a6enWbVEns-jYiZhixX0_36KYfEas0h3gBIJpljNiGR_3CBb37BOzkkNbR9pFVuMMMMk23NNR256ZwjPh8PAgPPHQhQKr2542-tdcaNm1kolK5p-r9MPw3TA97OsxjiQlpa7oTIE90GMLL47QyeqZNh9Za08UGi5EDSCM3Yz1DtI4bYomLfzJ5PefAYVgJ4C2xXLT3R5kGISCllwaRY--Y40ATLax03-GIuf_iEXDgYY9dWBifK_ZCsJ0b43xphS5CVYYBRAQj5ytzq0ZDhvJ2byfEdGIO2QRwVSmlJ670cbHtJA8vEtKwdoN1h3ay7OK5dw0zbKp5F58vAYemuApb5FhnwoF2y-JtXzUDWRzENKdqImhwIUGwDRMtGS7PuhrtxyYiHSpgZ4Rk5Ebbcni1n8SDkO74c_lNvoHVDZdhjaPI8I4bSblheI0DlSzjkedZocTBsr2ebAujLsgNR53eZxthl7UqNpSWopDmh-4yHo1eHIQ8XHFzjNpBmfjs0P_duSGpX6cbhO8fNLL51tKvwf_Zy1hFIa38ULMICZSRlqHFL2oGU3Q0b_Cry7KDGv4XJQ8TLnilchaohEUIivI6S3CTIYKLqpEBSs_uCXGennoxNQ_AVtm8o7r0NyDoc8YyKlH4Jv1rIMv_XRIizpJ0BD5TmDynWv_dt8EouNmA55wsuWkJCRO1tHvXtma4=w740-h856-s-no?authuser=0"
          alt=""
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
