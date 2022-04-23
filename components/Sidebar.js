import { Avatar, Button, IconButton } from "@material-ui/core";
import { Chat, MoreVert, Search, ExitToApp } from "@material-ui/icons";
import { auth, db } from "../Firebase";
import styles from "../styles/Home.module.css";
import * as EmailValidator from "email-validator";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import { useRouter } from "next/router";
import Switch from "react-switch";

const Sidebar = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [chats, setChats] = useState(null);
  const [dark, setDark] = useState(false);
  const chatsRef = query(
    collection(db, "chats"),
    where("users", "array-contains", user.email)
  );
  useEffect(() => {
    onSnapshot(chatsRef, (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  const chatAlreadyExist = (input) => {
    const exists = chats.find((item) =>
      item.users.find((user) => user === input)
    );
    return !!exists;
  };

  const createChat = () => {
    const input = prompt("Please enter email of user you want to chat with");
    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExist(input) &&
      input !== user.email
    ) {
      addDoc(collection(db, "chats"), {
        users: [user.email, input],
      }).catch((err) => {
        alert(err.message);
      });
    } else {
      alert("Email is invalid");
    }
  };

  return (
    <div className="h-screen overflow-y-scroll bg-white text-black min-w-[250px]">
      <div
        className="flex items-center justify-between px-4 py-7 
      border-b-2 border-b-slate-100 sticky z-10 bg-white h-4 top-0"
      >
        <Avatar
          className="cursor-pointer hover:opacity-80"
          src={user.photoURL}
        />
        <div className="flex ">
          <IconButton
            onClick={() => {
              auth.signOut();
              router.push("/");
            }}
          >
            <ExitToApp />
          </IconButton>
          {/* <Switch
            size={15}
            checked={theme === "light" ? false : true}
            onChange={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
          /> */}
        </div>
      </div>
      {/* ................................................ */}
      <div className="flex p-5 items-center">
        <Search />
        <input
          type="text"
          className="flex-1 items-center p-1 bg-gray-50 rounded border-none outline-none"
          placeholder="Search In Chat"
        />
      </div>
      {/* ........................................................ */}
      <Button onClick={createChat} className={styles.Button}>
        Start a new chart
      </Button>
      {/* ............................................................... */}
      {chats?.map((item) => (
        <ChatItem
          key={item.id}
          users={item.users}
          userEmail={user.email}
          id={item.id}
        />
      ))}
      {/* <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem /> */}
    </div>
  );
};

export default Sidebar;
