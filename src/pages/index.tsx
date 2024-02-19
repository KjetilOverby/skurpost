import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import PostoppsettComponent from "~/components/postoppsett/PostoppsettComponent";

import { api } from "~/utils/api";

export default function Home() {
  const { data: postoppsett } = api.postoppsett.getAll.useQuery({});

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <PostoppsettComponent data={postoppsett} />
      </main>
    </>
  );
}
