import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import { useRouter } from "next/router";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../Firebase";

const ChatItem = ({ users, userEmail, id }) => {
  const receipientEmail = users?.find((item) => item !== userEmail);
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

  const router = useRouter();

  const eneterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <div
      className="flex items-center p-4 cursor-pointer hover:bg-gray-100"
      onClick={eneterChat}
    >
      <Avatar src={recUserInfo.length > 0 ? recUserInfo[0].photoUrl : null}>
        {receipientEmail?.charAt(0).toUpperCase()}
      </Avatar>
      <p className="ml-2">{receipientEmail}</p>
    </div>
  );
};

export default ChatItem;
