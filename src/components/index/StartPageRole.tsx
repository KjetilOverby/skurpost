import React from "react";
import HeaderComponent from "../postoppsett/reusable/HeaderComponent";
import Link from "next/link";
import KategotiVeiledning from "../brukerveiledning/KategotiVeiledning";

interface StartPageRoleProps {
  colorMode: string;
}

const StartPageRole: React.FC<StartPageRoleProps> = ({ colorMode }) => {
  return (
    <div>
      <main className="min-h-screen bg-white">
        <HeaderComponent colorMode={colorMode} />
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4"></div>
          <h1 className="mt-40 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-[5rem] font-bold text-transparent">
            LUMBER LOGIC
          </h1>
          {/*      <div className="w-96">
            <img
              className="w-full"
              src="https://lh3.googleusercontent.com/pw/AP1GczPSQFvx0W9aDywuE4KqYKLR17Mad9zujzd15PkFvnZiqoQjsZBiddRGoDznWW7qVw_j50KOXY4HTb-UBY6wxse2JfVeKTY_6F5Ijd4kGvhChmxjvQx2q9IWaAVcg4eSNgKjPJUPWkrKq-FIvSwenAF7=w800-h666-s-no?authuser=0"
              alt=""
            />
          </div> */}
          <div className="mt-20">
            <Link href="/list">
              <button className="btn mr-5 w-40 bg-neutral text-accent hover:bg-accent hover:text-base-100">
                Skurliste
              </button>
            </Link>
            <Link href="/create/listcreator">
              <button className="btn mr-5 w-40 bg-neutral text-accent hover:bg-accent hover:text-base-100">
                Rediger skurliste
              </button>
            </Link>
          </div>
          <div className="mx-96 mt-20">
            <h1 className="mb-48 text-center text-5xl text-black">
              Brukerveiledning
            </h1>
            <KategotiVeiledning
              title="Postningsoppsett"
              img="https://lh3.googleusercontent.com/pw/AP1GczPSQFvx0W9aDywuE4KqYKLR17Mad9zujzd15PkFvnZiqoQjsZBiddRGoDznWW7qVw_j50KOXY4HTb-UBY6wxse2JfVeKTY_6F5Ijd4kGvhChmxjvQx2q9IWaAVcg4eSNgKjPJUPWkrKq-FIvSwenAF7=w800-h666-s-no?authuser=0"
              orderImg="order-2"
              orderText="order-1"
              description="Beskrivelse av hvordan man lager et postningsoppsett og hvardan man redigerer poster i Lumber Logic"
            />
            <KategotiVeiledning
              title="Skurlister og søk"
              img="https://img.freepik.com/premium-photo/blue-purple-calculator-with-blue-yellow-keypad_980716-417517.jpg"
              orderImg="order-1"
              orderText="order-2"
              description="Lag egne lister på skurplan, dette gjør det veldig enkelt å finne riktig post som skal bygges. Når skurliste er laget kan man klikke på listen og få kun opp de aktuelle postene som skal bygges."
            />
            <KategotiVeiledning
              title="Instillinger"
              img="https://png.pngtree.com/png-vector/20240604/ourmid/pngtree-mobile-or-computer-gear-setting-folder-png-image_12619324.png"
              orderImg="order-2"
              orderText="order-1"
              description="I innstillinger kan man tilpasse Lumber Logic med fargetemaer, endre språk og velge hvilke kolonner som skal vises i skurplan. Her kan man også lage en liste over ringen man har tilgjengelig sånn at det blir enklere å finne ringene man skal bruke når man lager og redigerer poster."
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartPageRole;
