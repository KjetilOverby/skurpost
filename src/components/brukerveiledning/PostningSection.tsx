import React from "react";

const PostningSection = () => {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold text-black">Postoppsett</h1>
      <p className="mb-10 text-lg text-gray-500">
        Et eksempel på en ferdig post. Over ringen mellom sagbladene står
        råmålet i midten er verdien på ringene akkurat som i utfyllingsringene.
        Det er ikke alltid at man har tilgjengelige ringer i det målet som
        ringene har på plankesonen og vil oppdeling av ringen med tilgjengelige
        ringer og skims stå under ringene mellom bladene som i dette eksemplet
        er en 53,9 ring som er delt opp i en 51,7 ring, 0,5 og 0,3 shims.
      </p>
      <br />
      <p className="mb-10 text-lg text-gray-500">
        I dette eksemplet er det en knapp som heter ALT på utfylling foran og
        denne er der for at det er en alternativ utfylling tilgjengelig. Hvis
        noen av ringene er i bruk så kan man trykke på ALT kanppen og få en
        alternativ utfylling.
      </p>
      <div className="w-[40rem] 3xl:w-[50rem]">
        <img
          className="w-full"
          src="https://lh3.googleusercontent.com/pw/AP1GczOvyu67teWdocPj9ByqAwiu-Za_b82Bx3TjqDgP9E9VKGynuyEFUvNF1J-lm0d5_Yad-sQnHAsQBlFrNu-LGqxBDWm5yqiDnfHlrKELyRnafGce-FIaTirfD5MCqo4_o7Hd9NutPqfgnolLQIjEqRwh=w853-h430-s-no?authuser=0"
          alt=""
        />
      </div>
      <p className="mt-10 text-lg text-gray-500">
        Programmet har også utfylling bak når man bygger post og dette betyr at
        alle poster som bygges vil ha eksakt samme mål fra start til slutt.
        målet er laget sånn at da låsemutterne er satt på så vil den siste
        mutteren flykte med hylsa, dette gjør det enkelt å se om noe i posten er
        feil. Hvis mutteren stikker innenfor eller utenfor så må man gå gjennom
        posten for å finne feilen.
      </p>
    </section>
  );
};

export default PostningSection;
