import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import useAuth from "../../hooks/useAuth";

const ChatPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [chatUsers, setChatUsers] = useState(null);
  useEffect(async () => {
    const data = await getDoc(doc(db, "chats", router.query.id));

    setChatUsers(data.data().users);
  }, [router.query.id]);

  const receipientEmail = chatUsers?.find((item) => item !== user.email);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatScreen receipientEmail={receipientEmail} />
    </div>
  );
};

export default ChatPage;
