import React from "react";
import HeaderComponent from "../postoppsett/reusable/HeaderComponent";
import Link from "next/link";

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
          <div className="w-96">
            <img
              className="w-full"
              src="https://lh3.googleusercontent.com/pw/AP1GczPSQFvx0W9aDywuE4KqYKLR17Mad9zujzd15PkFvnZiqoQjsZBiddRGoDznWW7qVw_j50KOXY4HTb-UBY6wxse2JfVeKTY_6F5Ijd4kGvhChmxjvQx2q9IWaAVcg4eSNgKjPJUPWkrKq-FIvSwenAF7=w800-h666-s-no?authuser=0"
              alt=""
            />
          </div>
          <div className="mt-20">
            <Link href="/list">
              <button className="btn mr-5 w-40 bg-primary text-accent hover:bg-neutral hover:text-base-100">
                Skurliste
              </button>
            </Link>
            <Link href="/create/listcreator">
              <button className="btn mr-5 w-40 bg-primary text-accent hover:bg-neutral hover:text-base-100">
                Rediger skurliste
              </button>
            </Link>
            <Link href="/brukerveiledning/documentation">
              <button className="btn mr-5 w-40 bg-primary text-accent hover:bg-neutral hover:text-base-100">
                Dokumentasjon
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartPageRole;
