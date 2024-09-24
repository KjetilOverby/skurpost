import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const AccountComponent = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="rounded-xl bg-accent p-5">
      <h1 className="mb-5  text-primary">Konto</h1>
      <div className="flex gap-5">
        <div>
          <img src={sessionData?.user.image} alt="" />
        </div>
        <div>
          <p className="text-primary">Email: {sessionData?.user.email}</p>
          <p className="text-primary">Navn: {sessionData?.user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountComponent;
