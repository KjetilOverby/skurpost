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
import { PostInfoContext } from "../../context";

interface headerProps {
  setTheme: Dispatch<SetStateAction<string>>;
}

const HeaderComponent = ({ colorMode }) => {
  const router = useRouter();
  const context = useContext(PostInfoContext);

  const text = "text-slate-500";
  const logo = "text-slate-400";

  const { editMode, setEditMode } = context;

  const [actualPage, setActualPage] = useState({
    search: "",
    statistikk: "",
  });

  const [submenuVisibility, setSubmenuVisibility] = useState({
    skurliste: false,
    post: false,
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

  const toggleSubmenu = (menu) => {
    setSubmenuVisibility((prevVisibility) => ({
      ...prevVisibility,
      [menu]: !prevVisibility[menu],
    }));
  };

  return (
    <header data-theme={colorMode}>
      <nav className="border border-x-0 border-t-0 border-gray-200 border-b-secondary bg-primary px-4  py-2.5 ">
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
              <div className="relative">
                <div
                  className="grid cursor-pointer place-items-center"
                  onClick={() => toggleSubmenu("skurliste")}
                >
                  <FaClipboardList className={`text-2xl ${logo}`} />
                  <li>
                    <p className={`text-xs ${text} ${actualPage.list}`}>
                      Rediger
                    </p>
                  </li>
                </div>
                {submenuVisibility.skurliste && (
                  <ul className="absolute left-0 mt-2 w-48 bg-primary shadow-lg">
                    <li className="px-4 py-2 hover:bg-secondary">
                      <Link href="/list">Skurliste</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-secondary">
                      <Link href="/create/listcreator">Rediger skurliste</Link>
                    </li>
                    <li
                      onClick={setEditMode(true)}
                      className="px-4 py-2 hover:bg-secondary"
                    >
                      <Link href="/postoppsett">Lag ny post</Link>
                    </li>
                  </ul>
                )}
              </div>

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
