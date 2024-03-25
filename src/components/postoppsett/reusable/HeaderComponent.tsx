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
interface headerProps {
  setTheme: Dispatch<SetStateAction<string>>;
}

const HeaderComponent = () => {
  const router = useRouter();
  //   const { setTheme, theme, setDarkMode } = useContext(AppDataContext);

  const [toggleMenu, setToggleMenu] = useState(true);

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
      <nav className="border border-x-0 border-t-0 border-gray-200 border-b-gray-200 bg-white px-4  py-2.5 lg:px-6">
        <button
          data-collapse-toggle="mobile-menu-2"
          type="button"
          className="absolute right-10 top-10 z-50 ml-1 inline-flex items-center rounded-lg bg-primary p-2 text-sm text-gray-500 lg:hidden"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            className="hidden h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`z-10 mx-auto flex max-w-screen-xl flex-wrap items-center justify-between max-lg:absolute max-lg:h-96 max-lg:w-60 max-lg:bg-accent max-lg:p-5  ${toggleMenu ? "left-0 duration-200" : "-left-60 duration-200"}`}
        >
          <div className="flex">
            <Link href="/">
              <div className="">
                <p className="flex">
                  {/* <img
                    src="https://static.wixstatic.com/media/ea9f2f_dff85b2ff00146c9ae8fe2884c5bcc49~mv2.png/v1/fill/w_560,h_424,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/imageedit_1_4852502502.png"
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                  /> */}
                  <span className="w-40">
                    <img
                      className="w-full"
                      src="https://lh3.googleusercontent.com/pw/AP1GczMzspiRJfChnxbjpzSd9aKlq_85UBAV75GOiSZ4XFfw4CH3pJ8q1YtSxYKY_i23U-bCvb2e2dNGj_mJKONbyPajv6g0Z4cX9gtfCEW0qhWgwx9yQgRK27ea1SI0smhDcgx03Eq5yya9kQ0hf0w87wJW7zqRWRJvOqkcb0bUyEDpi8TftljC1jq_6mijK9R2RTmYBbR_HRdFwPah4uXKjTqafOzhRvAI2ZtGv7y4sHsqrBRm4JB0NtDRhzQKlCmYbIvyQ_7ofnHFrD8SvpKbFIMvLhu4XjQsX0clZj5ow9S-iaZmpm6z_QqSodFC_vad6DtKel6VNpne2sE6ly_72PoXDA5dUsw5TAFkDxL2hoz21f4hfqX7Ms_rE4ruSDZh4DCaDH37CFMnNAFgAtLUPeLennRAmSyvGVTC8f0onAbLL1GWPvZ1dGD4IQrZqn4FG4IhsPty9SlSr44QaQdHv8uZFedHAfOY7jvb0Z3xuh9Z6uoVbEuxWUwjoutW2ofpBKG4bf_BkMjFtOSarcWa8S4do6hVObOQzg3upkVviJGcbSbCdARE6q26oeGj6ID-4xg7pvoLUoI0cW-AXyCe-ljHCk6_LCvfGSpVo2KqZkt5Ln8nOWArNwdeTIMg60VI-BWcL0t-1woryhjfa4JSEILLFsAKa8HD8-TO5D7WESwD2TbUTHvNROMLRjNAW7CLF0fI-ZItlOlIZYt1CqmLyER-ZUofkxSP-5J7f5Q0XAkO1OzR8Z-ApalNq2B2NSeUZia4NgQq4jkWS3JnFbDZDHdBhw3vJTnnTjd1u89Iofnd3VgALZSOznA4jQynM6dZR9SZscXj-0IsJ_Q5Co-SQvuAF6AQ4rk2YMzTB6Z-U2er3chGzyVM-5jHmjIIgsgj_0LD0hD34Yn2Au6YeaW5WZlLMg=w1920-h354-s-no?authuser=0"
                      alt=""
                    />
                  </span>
                </p>
              </div>
            </Link>
          </div>
          <div className="flex">
            <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
              <Link href="/list">
                <li>
                  <p
                    className={`lg:hover:text-primary-700  block border-b border-gray-100 py-2 pl-3 pr-4 text-sm text-neutral  hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:dark:hover:bg-transparent lg:dark:hover:text-white ${actualPage.list}`}
                  >
                    Skurliste
                  </p>
                </li>
              </Link>
              <Link href="/create/listcreator">
                <li>
                  <p
                    className={`lg:hover:text-primary-700  block border-b border-gray-100 py-2 pl-3 pr-4 text-sm text-neutral hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:dark:hover:bg-transparent lg:dark:hover:text-white ${actualPage.listcreator}`}
                  >
                    Rediger liste
                  </p>
                </li>
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
