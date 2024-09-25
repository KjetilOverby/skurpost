import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaUserAlt } from "react-icons/fa";
import dateFormat from "dateformat";

const AccountComponent = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="rounded-xl bg-accent p-5">
      <div>
        <FaUserAlt className="text-3xl text-primary" />
        <h1 className="mb-5  text-primary">Konto</h1>
      </div>
      <div className="flex gap-5">
        <div>
          <img className="rounded-xl" src={sessionData?.user.image} alt="" />
        </div>
        <div>
          <p className="text-primary">Email: {sessionData?.user.email}</p>
          <p className="text-primary">Navn: {sessionData?.user.name}</p>
          <p className="text-primary">
            Innlogget: {dateFormat(sessionData?.expires, "dd.mm.yyyy HH:MM")}
          </p>
          <p className="text-primary">Rolle: {sessionData?.user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountComponent;
