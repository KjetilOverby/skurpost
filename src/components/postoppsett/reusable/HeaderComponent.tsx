/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
// import { getServerAuthSession } from "~/server/auth";
// import RoleChange from "./users/RoleChange";
import { FaClipboardList } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { BiSolidCalendarEdit } from "react-icons/bi";
import { FaUserLarge } from "react-icons/fa6";
interface headerProps {
  setTheme: Dispatch<SetStateAction<string>>;
}

const HeaderComponent = () => {
  const router = useRouter();
  //   const { setTheme, theme, setDarkMode } = useContext(AppDataContext);

  const text = "text-slate-500";
  const logo = "text-slate-400";

  const [actualPage, setActualPage] = useState({
    search: "",
    statistikk: "",
  });

  const classText = "font-bold underline";

  useEffect(() => {
    if (router.pathname === "/search") {
      setActualPage({
        search: classText,
        statistikk: "",
        oversikt: "",
        opprett: "",
      });
    } else if (router.pathname === "/statistikk") {
      setActualPage({
        search: "",
        statistikk: classText,
        oversikt: "",
        opprett: "",
      });
    } else if (router.pathname === "/oversikt") {
      setActualPage({
        search: "",
        statistikk: "",
        oversikt: classText,
        opprett: "",
      });
    } else if (router.pathname === "/newtools") {
      setActualPage({
        search: "",
        statistikk: "",
        oversikt: "",
        opprett: classText,
      });
    }
  }, [router]);

  const { data: sessionData } = useSession();
  return (
    <header>
      <nav className="border border-x-0 border-t-0 border-gray-200 border-b-gray-200 bg-white px-4  py-2.5 ">
        <div
          className={` z-10 mx-auto flex max-w-screen-xl flex-wrap items-center justify-between`}
        >
          <div className="flex"></div>
          <div className="flex">
            <ul className="mt-4 flex flex-row  space-x-8 font-medium lg:mt-0">
              <Link href="/">
                <div className="grid place-items-center ">
                  <IoIosHome className={`text-2xl ${logo}`} />
                  <li>
                    <p className={`text-xs ${text} ${actualPage.listcreator}`}>
                      Hjem
                    </p>
                  </li>
                </div>
              </Link>
              <Link href="/list">
                <div className="grid place-items-center ">
                  <FaClipboardList className={`text-2xl ${logo}`} />
                  <li>
                    <p className={`text-xs ${text} ${actualPage.list}`}>
                      Skurliste
                    </p>
                  </li>
                </div>
              </Link>
              <Link href="/create/listcreator">
                <div className="grid place-items-center ">
                  <BiSolidCalendarEdit className={`text-2xl ${logo}`} />
                  <li>
                    <p className={`text-xs ${text} ${actualPage.listcreator}`}>
                      Rediger
                    </p>
                  </li>
                </div>
              </Link>
              <Link href="/create/listcreator">
                <div className="grid place-items-center ">
                  <FaUserLarge className={`text-2xl ${logo}`} />
                  <li>
                    <p className={`text-xs ${text} ${actualPage.listcreator}`}>
                      Account
                    </p>
                  </li>
                </div>
              </Link>
            </ul>
          </div>
          <div className="flex items-center  lg:order-2">
            <Link href={sessionData ? "/api/auth/signout" : "/api/auth/signin"}>
              <div className="h-10 w-10">
                <img
                  className="w-full  rounded-full"
                  src={sessionData?.user.image}
                  alt=""
                />
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
