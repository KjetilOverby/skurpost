import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";

import { FaClipboardList } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { PostInfoContext } from "../../context";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { GiCloudRing } from "react-icons/gi";

interface HeaderComponentProps {
  colorMode: string;
}

const HeaderComponent = ({ colorMode }: HeaderComponentProps) => {
  const context = useContext(PostInfoContext);

  const text = "text-primary";
  const logo = "text-primary";

  const { editMode, setEditMode, setPostId, postId } = context ?? {};

  const [actualPage, setActualPage] = useState({
    search: "",
    statistikk: "",
    oversikt: "",
    opprett: "",
    listcreator: "",
    list: "",
  });

  const [submenuVisibility, setSubmenuVisibility] = useState({
    skurliste: false,
    innstillinger: false,
  });

  const { data: sessionData } = useSession();

  const toggleSubmenu = (menu: "skurliste" | "innstillinger") => {
    setSubmenuVisibility((prevVisibility) => {
      const newVisibility = { skurliste: false, innstillinger: false };
      newVisibility[menu] = !prevVisibility[menu];
      return newVisibility;
    });
  };

  const newPostHandler = () => {
    if (setEditMode) {
      setEditMode(true);
      if (setPostId) {
        setPostId("");
      }
    }
  };

  const existPostopen = () => {
    if (setEditMode) {
      setEditMode(false);
    }
  };

  return (
    <header data-theme={colorMode}>
      <nav className="border border-x-0 border-t-0 border-gray-200 border-b-secondary bg-accent px-4  py-2.5 ">
        <div
          className={` z-10 mx-auto flex max-w-screen-xl flex-wrap items-center justify-between`}
        >
          <div className="text-xl font-bold italic text-green-600">
            LUMBER <span className="text-blue-500">LOGIC</span>
          </div>
          <div className="flex">
            <ul className="mt-4 flex flex-row  space-x-8 font-medium lg:mt-0">
              <Link href="/">
                <div className="grid place-items-center ">
                  <IoIosHome className={`text-2xl ${logo} mb-2`} />
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
                  <FaClipboardList className={`text-2xl ${logo} mb-2`} />
                  <li>
                    <p className={`text-xs ${text} ${actualPage.listcreator}`}>
                      Rediger
                    </p>
                  </li>
                </div>
                {submenuVisibility.skurliste && (
                  <ul className="absolute left-0 mt-2 w-48 bg-accent shadow-lg">
                    <li className="px-4 py-2 text-primary hover:bg-neutral ">
                      <Link href="/list">
                        <div className="align-center flex  py-2 ">
                          <FaClipboardList className="mr-3 text-xl" />
                          <p>Skurliste</p>
                        </div>
                      </Link>
                    </li>
                    <li className="py-2 text-primary hover:bg-neutral ">
                      <Link href="/create/listcreator">
                        <div className="align-center flex px-4 py-2 ">
                          <FaRegEdit className="mr-3 text-xl" />
                          <p>Rediger skurliste</p>
                        </div>
                      </Link>
                    </li>
                    <li
                      onClick={newPostHandler}
                      className="px-4 py-2 text-primary hover:bg-neutral "
                    >
                      <Link href="/postoppsett">
                        <div className="align-center flex  py-2 ">
                          <MdOutlineCreateNewFolder className="mr-3 text-xl" />
                          <p>Lag ny post</p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              <div className="relative">
                <Link href="/innstillinger">
                  <div
                    className="grid cursor-pointer place-items-center"
                    onClick={() => toggleSubmenu("innstillinger")}
                  >
                    <IoSettingsOutline className={`text-2xl ${logo} mb-2`} />
                    <li>
                      <p className={`text-xs ${text} ${actualPage.list}`}>
                        Instillinger
                      </p>
                    </li>
                  </div>
                </Link>
              </div>
              {postId && (
                <div className="relative">
                  <Link href="/postoppsett">
                    <div
                      className="grid cursor-pointer place-items-center"
                      onClick={existPostopen}
                    >
                      <GiCloudRing className={`text-2xl ${logo} mb-2`} />
                      <li>
                        <p className={`text-xs ${text} ${actualPage.list}`}>
                          Postoppsett
                        </p>
                      </li>
                    </div>
                  </Link>
                </div>
              )}
            </ul>
          </div>
          <div className="flex items-center  lg:order-2">
            <Link href={sessionData ? "/api/auth/signout" : "/api/auth/signin"}>
              <div className="h-10 w-10">
                <img
                  className="w-full  rounded-full"
                  src={sessionData?.user.image ?? ""}
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
