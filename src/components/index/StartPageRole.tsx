import React from "react";
import HeaderComponent from "../postoppsett/reusable/HeaderComponent";

const StartPageRole = ({ sessionData, colorMode }) => {
  return (
    <div>
      <main className="min-h-screen bg-white">
        <HeaderComponent colorMode={colorMode} />
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4"></div>
          <div className="w-96">
            <img
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/pw/AP1GczMDGnSBlBXzaAdACTFF1Mt4jYCtDvlT_MLTEbe1CDg7ORTG-rN7dt390hur_gH1niiuAQTA02ZbVokGDO3UeF5tSynnlM-icFnWVKWy7vyTs40t0soYX7xc30Y2DwJNr-RRsbMnvi2GFZm6vPJ5ws8QfC9NhVEqt3Vwc1lhjZVXwftAU6lMZCIxTs0GH0cIw4l0nOSkAymv85aCJw-LAGnjxEfYt3Ktyw-EwepBzwuvUrDpufacPRtWyVZX9BPCiuzGGhj9JLrMSKdsvTgLATqoLP5_oyb04Wn4I5to9vpSpm452Lu9E1R86PYRsuLvSJiv1ifNEpHF2RgDBbXZwPfbID41XcXBePKwOz3e9GZsjHxZM-PF7P5knCFwxuFPLPZn7l5O9XE5wPtW6aiflrssJy-GnZji8gE8vJ-MTF35HgjqbCj-xzPjgo32X1CMW8x-0c3by1_2MYFxe0uNVAPZjTffI77yqF6_6PB4Dg8eUoadQF19N4-wcNhe6cNfLEz-x2F0YaZDixxhsuZxpZXHl5DtHHWVlp3tlzuqxWOR797Y1npmU7xPEaJBANzwb24ygRdVpcH-ymRY5KlnaES3gTA8AzwwHZ77hDf-5pWpoa-YzWQy2GAgTm_U9Oq74f1pGhlykVo6-BBom-H1lgUF09mhElCJzu4n_Y3O7H4c9xUX-l_qYq8Greef28SPDjYgVihZPtiyl17arTtAkuPg_B0K-vG1Ybo0jy4v37UprVtIIZ0O2WEJDyt8IcTgp1yUlpJF9Byv6Dx0Z6AgX_rri4aNWRcZR_dNBcDQjmW6EmaAK3t59JmUlg6KXpTGVjR811HzfU2ALDxvSVS6qLpp_VZ69L0gg01YJIPoOuemqFJaIfsFmzLiLnEqCUNQYEK9ocSdvshbJSnfVb8fNVFV=w1920-h354-s-no?authuser=0"
              alt=""
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartPageRole;
