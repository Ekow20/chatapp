import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  Mic,
  MoreVert,
  InsertEmoticon,
  Send,
} from "@material-ui/icons";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import Message from "./Message";
import Timeago from "timeago-react";

const ChatScreen = ({ receipientEmail }) => {
  const [input, setInput] = useState("");
  const { user } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [recUserInfo, setRecUserInfo] = useState([]);

  useEffect(() => {
    if (receipientEmail) {
      const recQuery = query(
        collection(db, "users"),
        where("email", "==", receipientEmail)
      );

      const unsub = onSnapshot(recQuery, (snapshot) => {
        setRecUserInfo(snapshot.docs.map((doc) => doc.data()));
      });
      return unsub;
    }
  }, [receipientEmail]);

  // .......................................................................
  useEffect(() => {
    const messagesQuery = query(
      collection(db, "chats", router.query.id, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsub = onSnapshot(messagesQuery, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return unsub;
  }, [router.query.id]);
  // .........................................................................
  const sendMessage = (e) => {
    e.preventDefault();
    setDoc(
      doc(db, "users", user.uid),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );

    addDoc(collection(db, "chats", router.query.id, "messages"), {
      timestamp: serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    })
      .then(() => {
        setInput("");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div
      className="text-black flex-1 relative  h-screen "
      style={{ backgroundColor: "#e5ded8" }}
    >
      <div
        className="flex items-center justify-between p-7 
      border-b-2 border-b-slate-100 sticky z-10 top-0 h-4 bg-white"
      >
        <div className="flex items-center">
          <Avatar
            className="cursor-pointer hover:opacity-80"
            src={recUserInfo.length > 0 ? recUserInfo[0].photoUrl : null}
          />
          <div className="ml-3">
            <p className="font-semibold text-lg">{receipientEmail}</p>
            <p className="text-sm text-gray-500">
              Last Seen:{" "}
              {recUserInfo?.length > 0 ? (
                <Timeago datetime={recUserInfo[0].lastSeen.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          </div>
        </div>

        <div className="flex ">
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      {/* .......................................................... */}
      <div className="h-5/6 p-8 ">
        {messages.map((item) => (
          <Message key={item.id} item={item} />
        ))}
      </div>

      {/* ......................................................... */}
      <form
        className="flex  bg-white p-2 absolute z-50 bottom-0 right-0
      w-full  items-center"
      >
        <InsertEmoticon />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="flex-1 bg-gray-200   mx-1 p-2 rounded-sm outline-none"
        />

        <IconButton disabled={!input} onClick={sendMessage}>
          <Send />
        </IconButton>
        <Mic />
      </form>
    </div>
  );
};

export default ChatScreen;
