import Head from "next/head";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { db } from "../Firebase";
import useAuth from "../hooks/useAuth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Home() {
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoUrl: user.photoURL,
        },
        { merge: true }
      );
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
    </div>
  );
}
